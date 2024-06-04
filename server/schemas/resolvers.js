const { User, Review } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('reviews')
            }
            throw AuthenticationError;
        },
        // get all users
        users: async () => {
            return User.find({}).populate('reviews');
        },
        // get a user by id
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('reviews');
        },
        // get all reviews for movie by id
        reviews: async (parent, { username }) => {
        const params = username ? { username } : {};
            return Review.find(params);
        },
    },
    Mutation: {
        // register new user
        registerUser: async (parent, args) => {
            const { email, password } = args;
            // check if user already exists
            const user = await User.findOne({ email });

            if (user) {
                throw new Error('User already exists');
            }

            // hash the user's password
            const hashedPassword = await bcrypt.hash(password, 10);
            // create a new user with the hashed password
            const newUser = await User.create({ ...args, password: hashedPassword });

            // generate a JWT for the user
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { token, user: newUser };
        },
        // log in existing user
        loginUser: async (parent, { email, password }) => {
            // find the user by email
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Invalid credentials');
            }

            // check if the password matches the stored hashed password
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                throw new AuthenticationError('Invalid credentials');
            }

            // generate a JWT for the user
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { token, user };
        },
        // create a new review
        createReview: async (parent, args, context) => {
            if (context.user) {
                const review = await Review.create(args);

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { reviews: review._id } }
                );

                return review;
            }
            throw AuthenticationError;
            ('You need to be logged in!');
        },
        // delete review
        deleteReview: async (parent, { reviewId }, context) => {
            if (context.user) {
                const review = await Review.findOneAndDelete({
                    _id: reviewId,
                    thoughtAuthor: context.user.username,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { reviews: review._id } }
                );

                return review;
            }
            throw AuthenticationError;
        },
    },
};

module.exports = resolvers;
