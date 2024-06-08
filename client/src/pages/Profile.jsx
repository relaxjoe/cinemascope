// import ProfileForm from "../components/ProfileForm";

// function Profile() {
//   return (
//     <div>
//       <ProfileForm />
//     </div>
//   );
// }       

// export default Profile;

import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries'; // Import the query to fetch user reviews

function Profile() {
  // State to store user reviews
  const [userReviews, setUserReviews] = useState([]);

  // Fetch user reviews from the database
  const { loading, error, data } = useQuery(QUERY_USER);

  // Update userReviews state when data changes
  useEffect(() => {
    if (data) {
      setUserReviews(data.userReviews);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Profile</h1>
      <h2>Your Reviews</h2>
      <ul>
        {userReviews.map((review) => (
          <li key={review.id}>
            <p>Title: {review.movie.title}</p>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
            {/* Add other review details */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
