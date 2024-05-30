const { gql } = require('apollo-server-express');

// graphql schema using gqp template
const typeDefs = gql`
  scalar DateTime

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Movie {
    id: ID!
    title: String!
    description: String!
    director: String!
    genre: String!
    releaseDate: DateTime!
    reviews: [Review]
  }

  type Review {
    id: ID!
    user: User!
    rating: Int!
    comment: String!
  }

  type Query {
    movies: [Movie]
    movie(id: ID!): Movie
    users: [User]
    user(id: ID!): User
    reviews(id: ID!): Review
  }

  input MovieInput {
    title: String!
    description: String!
    director: String!
    genre: String!
    releaseDate: DateTime!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type Mutation {
    addMovie(input: MovieInput!): Movie
    deleteMovie(id: ID!): Movie
    registerUser(input: UserInput!): User
    loginUser(email: String!, password: String!): AuthPayload
    createReview(id: ID!, user: UserInput!, rating: Int!, comment: String!): Review
    deleteReview(id: ID!): Review
  }

  type AuthPayload {
    token: String!
  }
`;

module.exports = typeDefs;

