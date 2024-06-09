import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';
import ReviewCard from '../components/ReviewCard';

// import { GET_MOVIES } from '../utils/queries';

const HomePage = () => {
    const { loading, data } = useQuery(QUERY_USERS);
    const users = data?.users || [];
    // const { loading, error, data } = useQuery(GET_MOVIES);
    // const [moives, setMovies] = useState([]);

    // useEffect(() => {
    //     if (data) {
    //         setMovies(data.movies);
    //     }
    // }), [data];

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
{/* <ReviewForm /> */}
{!loading?users.map(user=>{
  return user.reviews.map(review=><ReviewCard review={review}/>)  
}):""}
        </div>

        // <div>
        //     <h1>Movies</h1>
        //     <ul>
        //         {movies.map((movie) => (
        //             <li key={movie.id}>
        //                 <h2>{movie.title}</h2>
        //                 <p>{movie.description}</p>
        //                 <p><strong>Director:</strong> {movie.director}</p>
        //                 <p><strong>Genre:</strong> {movie.genre}</p>
        //                 <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toDateString()}</p>
        //             </li>
        //         ))}
        //     </ul>
        // </div>
    );
};

export default HomePage;
