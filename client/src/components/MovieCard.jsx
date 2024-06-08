import React, { useState }from 'react';
import StarRating from './StarRating';
import ReviewForm from './ReviewForm';


function MovieCard({ movie }) {
   // Check if movie.reviews is an array, otherwise default to an empty array
   const reviews = Array.isArray(movie.reviews) ? movie.reviews : [];
   const [showReviewForm, setShowReviewForm] = useState(false);
   const [isReviewButtonVisible, setIsReviewButtonVisible] = useState(true);

   const handleSubmitReview = async (review) => {
    try {
      // Make a POST request to the backend API endpoint to submit the review
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          movieId: movie.id,
          review: review
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      // Retrieve the newly added review from the response body
      const newReview = await response.json();

      // Update the reviews state with the newly added review
      setReviews([...reviews, newReview]);
      setShowReviewForm(false); // Hide the review form
      setIsReviewButtonVisible(false); // Hide the "Add Review" button after submission
    } catch (error) {
      console.error('Error submitting review:', error);
    }
   };
  return (
    <div className="movie_card">
      <h1 className='movieTitle'>{movie.title}</h1>
      <p>Year: {movie.year}</p>
      <div className="rating_container">Rating: <StarRating rating={movie.rating} /></div>
      <p>Reviews: <p>{movie.reviews}</p></p>
      <ul>
        {reviews.map((review, index) => (
          <p key={index}>{review}</p>
        ))}
      </ul>
      {showReviewForm && <ReviewForm onSubmit={handleSubmitReview} />}
      {/* Add button to toggle review form visibility */}
      <div className="button_container">
      {isReviewButtonVisible && (
          <button onClick={() => {
            setShowReviewForm(true); // Show the review form
            setIsReviewButtonVisible(false); // Hide the button
          }}>Add Review</button>
        )}
      </div>
    </div>

  //   <div className="movie">
  //   <div className="movie-image"> <span className="play"><span className="name">{movie.title}</span></span> <a href="#"><img src={movie.image} alt="" /></a> </div>
  //   <div className="rating">
  //     <p>RATING</p>
  //     <div className="stars">
  //       <div className="stars-in"> </div>
  //     </div>
  //     <span className="comments">12</span> </div>
  // </div>

  );
}

export default MovieCard;