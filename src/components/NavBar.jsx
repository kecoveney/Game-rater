import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ user }) => (
  <div className="header">
    <Link to="/">
      <img src="/assets/game rater.png" alt="Game Rater Logo" className="logo" />
    </Link>
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/reviews">Reviews</Link></li>
          <li><Link to="/top-recommended">Top Recommended</Link></li>
          {user ? (
            <>
              {user.isAdmin && <li><Link to="/admin">Admin Panel</Link></li>}
              <li><Link to="/submit">Submit Review</Link></li>
              <li><Link to="/account">Account</Link></li>
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    localStorage.removeItem('user');
                    window.location.reload();
                  }}
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}
        </ul>
      </nav>
  </div>
);

export default NavBar;
