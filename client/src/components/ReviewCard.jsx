function ReviewCard({review, username}) {
    
  return (
    <div class="card" style={{width: "18rem;"}}>
      <div class="card-body">
        <h5 class="card-title">Title: {review.title}</h5>
        <p class="card-text">My Thoughts: {review.comment}</p>
        <p class="card-text">Rating: {review.rating}</p>
        <p class="card-text">Director: {review.director}</p>
        <p class="card-text">Actor: {review.actors}</p>
        <p class="card-text">User: {username}</p>
      </div>
    </div>
  );
}

export default ReviewCard;