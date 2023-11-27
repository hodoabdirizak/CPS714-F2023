// pages/HomePage.js

import React from 'react'
import { useLocation } from "react-router-dom";
import Navbar from '../components/Navbar'; 
import CoverPhoto from '../assets/images/CoverPhoto.jpeg';
import EventCard from '../components/EventCard';
import './HomePage.css';

/*const generateRandomImageUrl = () => {
  const imagePaths = [
    '../assets/images/pic1.jpeg',
    '../assets/images/pic2.jpeg',
    '../assets/images/pic3.jpeg',
    '../assets/images/pic4.jpeg',
    // Add more image paths as needed
  ];
  const randomIndex = Math.floor(Math.random() * imagePaths.length);
  return imagePaths[randomIndex];
};*/


export const HomePage = () => {
<<<<<<< Updated upstream

/* dummy data 
need to retrieve this data from backend */
const events = [
    {
      id: 1,
      title: 'Event 1',
      date: 'October 31, 2023',
      venue: 'Venue 1',
      imageUrl: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbmNlcnR8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: 2,
      title: 'Event 2',
      date: 'November 15, 2023',
      venue: 'Venue 2',
      imageUrl: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29uZmVyZW5jZXxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      id: 3,
      title: 'Event 3',
      date: 'December 5, 2023',
      venue: 'Venue 3',
      imageUrl: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGV2ZW50fGVufDB8fDB8fHww',
    },
    {
      id: 4,
      title: 'Event 4',
      date: 'January 20, 2024',
      venue: 'Venue 4',
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGV2ZW50fGVufDB8fDB8fHww',
    },
  ];

  const location = useLocation();
  const isLoggedIn = location?.state?.params;
=======
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

  // Fetch events from the backend API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/event/getEventsWithVenues'); // Adjust the URL based on your backend endpoint
        const data = await response.json();
        setEvents(data); // Set the 'events' state with the fetched data
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
              to={{
                pathname: `/event/${event.id}`,
                state: { event }, // Pass the event object as state
              }}
              onClick={() => dispatch({ type: 'SET_EVENT', payload: { event, userID, username, isLoggedIn, accountType } })}
            >
              <EventCard event={event} />
            </Link>
          ))}
        </div>
      </div>
>>>>>>> Stashed changes

    return (
        <div className='home-page-container'>
            <Navbar isLoggedIn={isLoggedIn} />
            <div className='background-image'>
                <img src={CoverPhoto} alt=''/>
            </div>
            <div className='content'>
                <h1>Socials, conferences, corporate events, workshops and <span style={{ color: '#8C6ACB' }}>more</span>.</h1>
                <h2>Trending events in <span style={{color: '#696969' }}>Toronto</span></h2>
                <div className="event-cards">
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </div>
    );
}