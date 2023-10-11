// Navbar.js
import React from 'react';
import './Navbar.css';

function Navbar() {
    return (
      <div className="navbar">
        <div className="top-section">
          <div className="logo">
            <img src="../assets/images/logo.png" alt="Logo" />
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search for an event" />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        <ul className="nav-items">
            <li>Find Events</li>
            <li>FAQ</li>
            <li>My Events</li>
            <li>Sign In</li>
        </ul>
      </div>
    );
  }
  

export default Navbar;
