const { gql } = require('apollo-server-express');

// graphql schema using gqp template
const typeDefs = gql`
  scalar DateTime

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    reviews: [Review]
  }

  type Review {
    _id: ID
    user: User!
    rating: String!
    comment: String!
    title: String!
    director: String
    actors: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user(username: String!): User
    users: [User]
    reviews(username: String): [Review]
  }

  input ReviewInput {
    rating: String!
    comment: String!
    title: String!
    director: String
    actors: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Mutation {
    registerUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    createReview(rating: String!, comment: String, title: String!, director: String, actors: String): Review
    deleteReview(reviewId: ID!): Review
  }
`;

module.exports = typeDefs;
