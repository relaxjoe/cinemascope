import React, { useEffect, useState } from 'react';
import { gql, useQuery } from 'apollo/client';

const GET_MOVIES = gql`
query GetMovies {
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

const HomePage = () => {
    const { loading, error, data } = useQuery(GET_MOVIES);
    const [moives, setMovies] = useState([]);

    useEffect(() => {
        if (data) {
            setMovies(data.movies);
        }
    }), [data];

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Movies</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h2>{movie.title}</h2>
                        <p>{movie.description}</p>
                        <p><strong>Director:</strong> {movie.director}</p>
                        <p><strong>Genre:</strong> {movie.genre}</p>
                        <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
