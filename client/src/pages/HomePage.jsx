// import React, { useEffect, useState } from 'react';
// import { useQuery } from '@apollo/client';
// import { QUERY_USERS } from '../utils/queries';
// import ReviewCard from '../components/ReviewCard';
// import MovieCard from '../components/MovieCard';


// import { GET_MOVIE } from '../utils/queries';

// const HomePage = () => {
//     // const { loading, data } = useQuery(QUERY_USERS);
//     // const users = data?.users || [];
   
//     const [movies, setMovies] = useState([]);
//     useEffect(() => {
//       fetch('/moviecard.json')
//         .then((response) => response.json())
//         .then((data) => setMovies(data))
//         .catch((error) => console.error('Error fetching movies:', error));
//     }, []);
  
//     return (
//       <div>
//         <h1>Movie List</h1>
//         <ul>
//           {movies.map((movie) => (
//             <li key={movie.id}>
//               <MovieCard movie={movie} />
//               {/* <h2>{movie.title}</h2>
//               <p>Director: {movie.director}</p>
//               <p>Year: {movie.year}</p>
//               <p>Rating: {movie.rating} stars</p>
//               <p>Reviews: {movie.comments}</p> */}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };
// export default HomePage;

import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS_WITH_REVIEWS } from '../utils/queries';
import ReviewCard from '../components/ReviewCard';

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_USERS_WITH_REVIEWS);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data) {
      setUsers(data.users || []);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Reviews</h1>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user._id}>
              
              <ul>
                {user.reviews && user.reviews.length > 0 ? (
                  user.reviews.map((review, index) => (
                    <li key={index}>
                      <ReviewCard review={review} username={user.username} />
                    </li>
                  ))
                ) : (
                  <p>No reviews available</p>
                )}
              </ul>
            </li>
          ))
        ) : (
          <p>No users available</p>
        )}
      </ul>
    </div>
  );
};

export default HomePage;
