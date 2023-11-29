// pages/UsersEventsPage.js

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import EventCardAttendee from '../components/EventCardAttendee';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './UsersEventPage.css';

export const UsersEventPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const isLoggedIn = location?.state?.isLoggedIn;
    const accountType = location?.state?.accountType;
    const username = location?.state?.username || "";
    const userID = location?.state?.userID || 0;
    const [events, setEvents] = useState([]);

    const getMyEventsAttendee = async () => {
      console.log("------Getting all events-----");
      const result = await fetch('/api/event/getmyevents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          userID: userID
        })
      });
      const data = await result.text();
      const eventsList = JSON.parse(data);   
      setEvents([...eventsList]);
      return;
    };

    const getMyEventsOrganizer = async () => {
      console.log("------Getting all events-----");
      const result = await fetch('/api/event/getmyeventsorganizer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          userID: userID
        })
      });
      const data = await result.text();
      const eventsList = JSON.parse(data);   
      setEvents([...eventsList]);
      return;
    };
  
    useEffect(() => {
      if (accountType === 'Attendee'){
        getMyEventsAttendee();
      } else if (accountType === 'Organizer'){
        getMyEventsOrganizer();
      }
    }, []);
  

    return (
      <div className='users-event-page-container'>
        <Navbar isLoggedIn={isLoggedIn} username={username} accountType={accountType} userID={userID} />
        <h1>My Upcoming Events</h1>
        <div className='content'>
          <div className="event-cards">
            {events.map((event) => (
              <Link
                key={event.id}
                to={`/eventattendee/${event.id}`}
                onClick={() => dispatch({ type: 'SET_EVENT', payload: { event, userID, username, isLoggedIn, accountType } })}
              >
                <EventCardAttendee event={event} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }