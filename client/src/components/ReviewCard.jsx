function ReviewCard({review}) {
  return (
    <div class="card" style={{width: "18rem;"}}>
      <div class="card-body">
        <h5 class="card-title">{review.title}</h5>
        <p class="card-text">{review.comment}</p>
        <p class="card-text">{review.rating}</p>
        <p class="card-text">{review.director}</p>
        <p class="card-text">{review.actors}</p>
      </div>
    </div>
  );
}

export default ReviewCard;