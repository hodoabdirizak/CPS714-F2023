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

  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/event/getEventsWithVenues', {
          method: 'GET',
        }); // Adjust the URL based on your backend endpoint
        const data = await response.json();
        const updatedEvents = data.map(event => ({
          id: event.Event_id,
          title: event.Event_name,
          date: event.Event_start_date,
          time: event.Event_start_time,
          organizers: event.Organizer_website,
          capacity: event.Capacity,
          event_type: event.event_type,
          catering: event.Capacity,
          event_desc: event.Event_description,
          venue: event.Venue_name,
          address: event.Venue_address,
          //imageUrl: generateRandomImageUrl(),
        }));
        setEvents(updatedEvents); // Set the 'events' state with the fetched data
      } catch (error) {
        console.error('Error fetching events:', error);
        // Handle errors if necessary
      }
    };

    fetchEvents();
  }, []);


  const [showPopUp, setShowPopUp] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    const currentDate = new Date();

    const recentlyFinishedEvents = events.filter((event) => {
      const eventDateTime = new Date(event.date + ' ' + event.time.split(' - ')[0]);
      return currentDate > eventDateTime && !event.feedbackFormDisplayed;
    });

    if (recentlyFinishedEvents.length > 0) {
      recentlyFinishedEvents.forEach((recentEvent) => {
        setEvents((prevEvents) =>
          prevEvents.map((prevEvent) =>
            prevEvent.id === recentEvent.id
              ? { ...prevEvent, feedbackFormDisplayed: true }
              : prevEvent
          )
        );
      });

      setShowPopUp(true);
      setCurrentEvent(recentlyFinishedEvents[0]);
    }
  }, [events]);

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  // State for radio button selection
  const [rating, setRating] = useState(null);

  // State for text input
  const [additionalComments, setAdditionalComments] = useState('');

  // State for improvement suggestions
  const [improvements, setImprovements] = useState('');

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleCommentsChange = (event) => {
    setAdditionalComments(event.target.value);
  };

  const handleImprovementsChange = (event) => {
    setImprovements(event.target.value);
  };

  const handleSubmit = () => {
    // Add logic to submit feedback to the backend
    // You can use rating, additionalComments, and improvements states for the feedback data
    // ...
    // After submitting, close the pop-up
    handleClosePopUp();
  };

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

      {showPopUp && (
        <div className='popup-overlay'>
          <div className='popup'>
            <div className='popup-content'>
              <h1>Hi There!</h1>
              <h2 className="subtitle">You have recently attended the {currentEvent.title} event. We would love to know about your experience at this event.</h2>
              <p>How would you rate your overall experience?</p>
              <div className="radio-buttons">
                {[1, 2, 3, 4, 5].map((value) => (
                  <React.Fragment key={value}>
                    <input type="radio" id={`rating${value}`} name="rating" value={value} checked={rating === `${value}`} onChange={handleRatingChange} />
                    <label htmlFor={`rating${value}`}>{value}</label>
                  </React.Fragment>
                ))}
              </div>
              <input type="text" placeholder="Additional comments" value={additionalComments} onChange={handleCommentsChange} />
              <p>Is there anything we could do to make your next experience with EventEasy better?</p>
              <input type="text" placeholder="Improvements suggestions" value={improvements} onChange={handleImprovementsChange} />
              <div className="buttons-container">
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={handleClosePopUp}>Remind Me Later</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

