

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
    <div className='reviews_container'>
      <h1 className='reviews_title'>Reviews</h1>
      <ul className='reviews_list_container'>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user._id}>
              
              <ul className='reviews_list'>
                {user.reviews && user.reviews.length > 0 ? (
                  user.reviews.map((review, index) => (
                    <li key={index} className='review_card_item'>
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
