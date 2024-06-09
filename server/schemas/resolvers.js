// const { User, Review } = require('../models');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { signToken } = require('../utils/auth');
// const { AuthenticationError } = require('apollo-server-express');

// const resolvers = {
//     Query: {
//         me: async (parent, args, context) => {
//             if (context.user) {
//                 console.log(context.user);
//                 const user=await User.findOne({ _id: context.user._id }).populate('reviews');
//             console.log(user);
//             return user;
//             }
//             throw AuthenticationError;
//         },
//         // get all users
//         users: async () => {
//             return User.find({}).populate('reviews');
//         },
//         // get a user by id
//         user: async (parent, { username }) => {
//             return User.findOne({ username });
//         },
//         // get all reviews for movie by id
//         reviews: async (parent, { username }) => {
//         const params = username ? { username } : {};
//             return Review.find(params);
//         },
//     },
//     Mutation: {
//         // register new user
//         registerUser: async (parent, { username, email, password }) => {
//             const user = await User.create({ username, email, password });
//             const token = signToken(user);
//             return { token, user };
//         },
//         // log in existing user
//         loginUser: async (parent, { email, password }) => {
//             // find the user by email
//             const user = await User.findOne({ email });

//             if (!user) {
//                 throw new AuthenticationError('Invalid credentials');
//             }

//             // check if the password matches the stored hashed password
//             const correctPw = await user.isCorrectPassword(password);

//             if (!correctPw) {
//                 throw new AuthenticationError('Invalid credentials');
//             }

//             // generate a JWT for the user
//             const token = signToken(user);
//             return { token, user };
//         },
//         // create a new review
//         createReview: async (parent, args, context) => {
//             if (context.user) {
//                 const review = await Review.create({...args.input,user: context.user._id});

//                 await User.findOneAndUpdate(
//                     { _id: context.user._id },
//                     { $addToSet: { reviews: review._id } }
//                 );

//                 return review;
//             }
//             throw AuthenticationError;
//             ('You need to be logged in!');
//         },
//         // delete review
//         deleteReview: async (parent, { reviewId }, context) => {
//             if (context.user) {
//                 const review = await Review.findOneAndDelete({
//                     _id: reviewId,
//                     thoughtAuthor: context.user.username,
//                 });

//                 await User.findOneAndUpdate(
//                     { _id: context.user._id },
//                     { $pull: { reviews: review._id } }
//                 );

//                 return review;
//             }
//             throw AuthenticationError;
//         },
//     },
// };

// module.exports = resolvers;

const { AuthenticationError } = require('apollo-server-express');
const { User, Review } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      return await User.findById(user._id).populate('reviews');
    },
    user: async (_, { username }) => {
      return await User.findOne({ username }).populate('reviews');
    },
    users: async () => {
      return await User.find().populate('reviews');
    },
    reviews: async (_, { username }) => {
      const params = username ? { username } : {};
      return Review.find(params);
    },
  },
  Mutation: {
    registerUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    createReview: async (_, { rating, comment, title, director, actors }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      const review = await Review.create({
        rating,
        comment,
        title,
        director,
        actors,
        user: user._id,
      });

      await User.findByIdAndUpdate(user._id, { $push: { reviews: review._id } });

      return review;
    },
    deleteReview: async (_, { reviewId }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      const review = await Review.findByIdAndDelete(reviewId);

      if (!review) {
        throw new AuthenticationError('No review found with this ID');
      }

      await User.findByIdAndUpdate(user._id, { $pull: { reviews: review._id } });

      return review;
    },
  },
};

module.exports = resolvers;
