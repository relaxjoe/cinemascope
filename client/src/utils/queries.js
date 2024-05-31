import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
query movies {
    movies {
        id
        title
        description
        director
        genre
        releaseDate
    }
}
`;

export const GET_MOVIE = gql`
    query movie($id: ID!) {
        MOVIE(ID: $id) {
            id
            title
            description
            director
            genre
            releaseDate
        }
    }
`;