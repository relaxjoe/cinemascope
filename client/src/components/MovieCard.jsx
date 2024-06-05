function MovieCard({ movie }) {
  return (
    <div className="movie">
    <div className="movie-image"> <span className="play"><span className="name">{movie.title}</span></span> <a href="#"><img src={movie.image} alt="" /></a> </div>
    <div className="rating">
      <p>RATING</p>
      <div className="stars">
        <div className="stars-in"> </div>
      </div>
      <span className="comments">12</span> </div>
  </div>
  );
}

export default MovieCard;