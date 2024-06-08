import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import MovieCard from '../components/MovieCard';
// import { GET_MOVIES } from '../utils/queries';
// src/components/MovieList.js


const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('./moviecard.json')
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div>
      <h1>Movie List</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard movie={movie} />
            {/* <h2>{movie.title}</h2>
            <p>Director: {movie.director}</p>
            <p>Year: {movie.year}</p>
            <p>Rating: {movie.rating} stars</p>
            <p>Reviews: {movie.comments}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default HomePage;


// const HomePage = () => {
//     // const { loading, error, data } = useQuery(GET_MOVIES);
//     // const [moives, setMovies] = useState([]);

//     // useEffect(() => {
//     //     if (data) {
//     //         setMovies(data.movies);
//     //     }
//     // }), [data];

//     // if (loading) return <p>Loading...</p>;
//     // if (error) return <p>Error: {error.message}</p>;

//     return (
//         <div>Hello</div>
//         // <div>
//         //     <h1>Movies</h1>
//         //     <ul>
//         //         {movies.map((movie) => (
//         //             <li key={movie.id}>
//         //                 <h2>{movie.title}</h2>
//         //                 <p>{movie.description}</p>
//         //                 <p><strong>Director:</strong> {movie.director}</p>
//         //                 <p><strong>Genre:</strong> {movie.genre}</p>
//         //                 <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toDateString()}</p>
//         //             </li>
//         //         ))}
//         //     </ul>
//         // </div>
//     );
// };

// export default HomePage;
