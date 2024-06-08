import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import { GET_MOVIE } from '../utils/queries';
import MovieCard from '../components/MovieCard';
import MovieData from '../../public/moviecard.json';

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

    // if (loading) return <p>Loading...</p>
    // if (error) return <p>Error 404: {error.message}</p>;

    return (
      <div id="main">
      <div id="content">
        <div class="box">
          <div class="head">
            <h2>LATEST TRAILERS</h2>
            <p class="text-right"><a href="#">See all</a></p>
          </div>
            <h1>{movie?.title}</h1>
            {MovieData.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;