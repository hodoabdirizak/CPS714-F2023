// Navbar.js

import React  from 'react';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css';

function Navbar() {
    return (
      <div className="navbar">
        <div className="left-section">
          <div className="logo">
          <a href="/">
            <img src={logo} alt="Logo" />
            </a>
          </div>
          <div className="search-bar">
            <FontAwesomeIcon icon={ faSearch } />
            <input type="text" 
            placeholder='Search for an event'
            className="rounded-input" 
            />
          </div>
        </div>
        <ul className="nav-items">
            <li><a href="/">Find Events</a></li>
            <li><a href="/">FAQ</a></li>
            <li><a href="/">My Events</a></li>
            <li> <a href="/login">Sign In</a></li>
        </ul>
      </div>
    );
  }
  

export default Navbar;
