import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';

function NavBar () {
  const { isLoggedIn, logout } = useContext(AuthContext);
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
            <li><NavLink to="/" activeclassname="active">HOME</NavLink></li>
            {!isLoggedIn && (
              <>
                <li><NavLink to="/signup" activeclassname="active">SIGNUP</NavLink></li>
                <li><NavLink to="/login" activeclassname="active">LOGIN</NavLink></li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li><NavLink to="/profile" activeclassname="active">PROFILE</NavLink></li>
                <li><button onClick={logout} className="nav-button">LOGOUT</button></li>
              </>
            )}
          </ul>
    </div>
    <div id="sub-navigation">
     
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