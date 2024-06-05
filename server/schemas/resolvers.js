const { User, Review } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw AuthenticationError;
        },
        // get all users
        users: async () => {
            return User.find({});
        },
        // get a user by id
        user: async (parent, { username }) => {
            return User.findOne({ username });
        },
        // get all reviews for movie by id
        reviews: async (parent, { username }) => {
        const params = username ? { username } : {};
            return Review.find(params);
        },
    },
    Mutation: {
        // register new user
        registerUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        // log in existing user
        loginUser: async (parent, { email, password }) => {
            // find the user by email
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Invalid credentials');
            }

            // check if the password matches the stored hashed password
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Invalid credentials');
            }

            // generate a JWT for the user
            const token = signToken(user);
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
