import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import { GET_MOVIE } from '../utils/queries';

const MoviePage = () => {
    // get movie id from url params
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_MOVIE, {
        variables: { id }
    });
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        if (data) {
            setMovie(data.movie);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error 404: {error.message}</p>;

    return (
        <div>
      {movie ? (
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toDateString()}</p>
        </div>
      ) : (
        <p>Moive ID not found.</p>
      )}
    </div>
  );
};

export default MoviePage;