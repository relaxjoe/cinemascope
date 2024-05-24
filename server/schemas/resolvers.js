const { User, Review, Movie } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        // get all users
        users: async () => {
            return User.find({});
        },
        // get a user by id
        user: async (parent, { _id }) => {
            return User.findById(_id);
        },
        // get all movies
        movies: async () => {
            return Movie.find({});
        },
        // get a movie by id
        movie: async (parent, { _id }) => {
            return Movie.findById(_id);
        },
        // get all reviews for movie by id
        reviews: async (parent, { movieId }) => {
            return Review.find({ movie: movieId }).populate('user');
        },
    },
    Mutation: {
        // register new user
        register: async (parent, args) => {
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
        login: async (parent, { email, password }) => {
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
            // check if the user is logged in
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in');
            }

            // create a new review with the logged-in user
            const review = await Review.create({ ...args, user: context.user._id });
            return review.populate('user');
        },
        // delete review
        deleteReview: async (parent, { _id }, context) => {
            // check if the user is logged in
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in');
            }

            // find and delete the review
            const review = await Review.findOneAndDelete({ _id, user: context.user._id });
            if (!review) {
                throw new Error('Review not found');
            }

            return review;
        },
    },
};

module.exports = resolvers;
