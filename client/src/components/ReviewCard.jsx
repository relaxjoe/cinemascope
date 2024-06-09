import StarRating from "./StarRating";

function ReviewCard({review, username}) {
    
  return (
    <div className="review_card" style={{width: "18rem"}}>
      <div className="card-body">
        <h1 className="review_card_title">{review.title}</h1>
        <p className="card-text">My Thoughts: {review.comment}</p>
        <div className="card-text">Rating:  <StarRating rating={review.rating} /></div>
        <p className="card-text">Director: {review.director}</p>
        <p className="card-text">Actor: {review.actors}</p>
        <p className="card-text">User: {username}</p>
      </div>
    </div>
  );
}

export default ReviewCard;