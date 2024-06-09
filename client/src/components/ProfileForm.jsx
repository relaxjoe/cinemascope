// function ProfileForm () {
//   return (
//     <div>
//       <h1>Profile Form</h1>
//     </div>
//   );
// }

// export default ProfileForm;

import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import ReviewCard from '../components/ReviewCard';

const Profile = () => {
  const { loading, error, data } = useQuery(QUERY_ME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data?.me || {};

  return (
    <div>
      <h1>My Profile</h1>
      <h2>Reviews</h2>
      <div>
        {user.reviews && user.reviews.length > 0 ? (
          user.reviews.map((review) => (
            <ReviewCard key={review._id} review={review} username={user.username} />
          ))
        ) : (
          <p>No reviews yet</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
