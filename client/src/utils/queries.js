import { gql } from "@apollo/client";

export const QUERY_ME = gql`
query Me {
  me {
    _id
    email
    reviews {
      _id
      actors
      comment
      director
      rating
      title
    }
  }
}
`;

export const QUERY_USERS = gql`
query User {
  users {
    email
    reviews {
      _id
      actors
      comment
      director
      rating
      title
    }
    username
  }
}
`;

export const GET_MOVIE = gql`
    query reviews($username: String) {
        reviews(username: $username) {
            title
            rating
            comment
            director
            actors
            user {
                username
            }
        }
    }
`;

export const GET_USERS_WITH_REVIEWS = gql`
  query getUsersWithReviews {
    users {
      _id
      username
      reviews {
        _id
        rating
        comment
        title
        director
        actors
      }
    }
  }
`;

