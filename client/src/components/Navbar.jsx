function NavBar () {
  return (
  <>
    <div id="header">
    <h1 id="logo"><a href="#">MovieHunter</a></h1>
    
    <div className="social"> <span>FOLLOW US ON:</span>
      <ul>
        <li><a className="twitter" href="#">twitter</a></li>
        <li><a className="facebook" href="#">facebook</a></li>
        <li><a className="vimeo" href="#">vimeo</a></li>
        <li><a className="rss" href="#">rss</a></li>
      </ul>
    </div>
    <div id="navigation">
      <ul>
        <li><a className="active" href="#">HOME</a></li>
        <li><a href="#">NEWS</a></li>
        <li><a href="#">IN THEATERS</a></li>
        <li><a href="#">COMING SOON</a></li>
        <li><a href="#">CONTACT</a></li>
        <li><a href="#">ADVERTISE</a></li>
      </ul>
    </div>
    <div id="sub-navigation">
      <ul>
        <li><a href="#">SHOW ALL</a></li>
        <li><a href="#">LATEST TRAILERS</a></li>
        <li><a href="#">TOP RATED</a></li>
        <li><a href="#">MOST COMMENTED</a></li>
      </ul>
      <div id="search">
        <form action="#" method="get" acceptCharset="utf-8">
          <label htmlFor="search-field">SEARCH</label>
          <input type="text" name="search field" defaultValue="Enter search here" id="search-field" className="blink search-field"  />
          <input type="submit" value="GO!" className="search-button" />
        </form>
      </div>
    </div>
  </div>
  </>
  )
}

export default NavBar;