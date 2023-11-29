import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import CoverPhoto from '../assets/images/CoverPhoto.jpeg';
import EventCard from '../components/EventCard';
import './HomePage.css';

export const HomePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoggedIn = location?.state?.isLoggedIn;
  const accountType = location?.state?.accountType;
  const username = location?.state?.username || "";
  const hasID = location?.state?.userID || 0;
  const [userID, setUserID] = useState(0);
  const [events, setEvents] = useState([]);

  if (hasID !== 0 && userID === 0) {
    setUserID(hasID);
    console.log("hasID " +userID);
  }  

  const getUserID = async () => {
    console.log("Getting ID for user " + username);
    const result = await fetch('/api/account/getuseridbyemail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: username
      })
    });
      var data = await result.json();
      setUserID(data);
    console.log(data);
    return data;
  }

  if (username !== "" && userID === 0 && hasID === 0) {
    getUserID().then((res) => {
        setUserID(res);
        console.log("got id "+res);
    });
  }

  function getRandomImage(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const getEvents = async () => {
    console.log("------Getting all events-----");
    const result = await fetch('/api/event/getevents', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    const data = await result.text();
    const eventsList = JSON.parse(data);   
    setEvents([...eventsList]);
    return;
  };

  useEffect(() => {
    getEvents();
    console.log('hardcoded:',events[0]);
  }, []);


  return (
    <div className='home-page-container'>
          <Navbar isLoggedIn={isLoggedIn} username={username} accountType={accountType} userID={userID} />
      <div className='background-image'>
        <img src={CoverPhoto} alt='' />
      </div>
      <div className='content'>
        <h1>Socials, conferences, corporate events, workshops and <span style={{ color: '#8C6ACB' }}>more</span>.</h1>
        <h2>Trending events in <span style={{ color: '#696969' }}>Toronto</span></h2>
        <div className="event-cards">
          {events.map((event) => (
            <Link
              key={event.id}
              to={`/event/${event.id}`}
              onClick={() => dispatch({ type: 'SET_EVENT', payload: { event, userID, username, isLoggedIn, accountType } })}
            >
              <EventCard event={event} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

