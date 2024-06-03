function MovieCard({ movie }) {
  return (
    <div class="movie">
    <div class="movie-image"> <span class="play"><span class="name">{movie.title}</span></span> <a href="#"><img src={movie.image} alt="" /></a> </div>
    <div class="rating">
      <p>RATING</p>
      <div class="stars">
        <div class="stars-in"> </div>
      </div>
      <span class="comments">12</span> </div>
  </div>
  );
}

export default MovieCard;