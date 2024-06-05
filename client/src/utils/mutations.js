import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation registerUser($username: String!, $email: String!, $password: String!) {
    registerUser(input: { username: $username, email: $email, password: $password }) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview($rating: Int!, $comment: String, $title: String!, $director: String, $actors: String) {
    createReview(input: { rating: $rating, commment: $comment, title: $title, director: $director, actors: $actors }) {
      _id
      rating
      comment
      title
      director
      actors
    }
  }
`;
