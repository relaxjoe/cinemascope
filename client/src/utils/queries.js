import { gql } from "@apollo/client";

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
            reviews {
                _id
                title
                rating
            }
        }
    }
`;

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            reviews {
                title
                rating
                comment
                director
                actors
            }
        }
    }
`;

export const QUERY_REVIEWS = gql`
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