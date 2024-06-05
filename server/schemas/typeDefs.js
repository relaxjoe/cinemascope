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
    rating: Int!
    comment: String
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
    rating: Int!
    comment: String
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
    createReview(input: ReviewInput!): Review
    deleteReview(reviewId: ID!): Review
  }
`;

module.exports = typeDefs;
