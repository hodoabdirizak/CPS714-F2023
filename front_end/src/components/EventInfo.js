// EventInfo.js
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { areIntervalsOverlapping } from "date-fns";
import Map from '../components/Map'
import './EventInfo.css';

export const EventInfo = () => {

  const event = useSelector((state) => state.event.event);
  const userID = useSelector((state) => state.event.userID);

  const history = useHistory();
  const { id } = useParams();
  var conflicts = [];
  console.log('Event ID:', id);

    const isLoggedIn = useSelector((state) => state.event.isLoggedIn);
    const accountType = useSelector((state) => state.event.accountType);
    const username = useSelector((state) => state.event.username) || "";
    const [eventStartDate, seteventStartDate] = useState(0);
    const [eventStartTime, seteventStartTime] = useState(0);
    const [eventEndDate, seteventEndDate] = useState(0);
    const [eventEndTime, seteventEndTime] = useState(0);

  console.log(username + " : " + userID)

  const getUserEvents = async () => {
    console.log("Getting events for user " + userID);
    const result = await fetch('/api/eventAttendee/getUserEvents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        id: userID
      })
    })
    const eventIDs = await result.json();
    console.log("Calendar " + eventIDs);
    for (var i in eventIDs) {
      getEventInfo(eventIDs[i]);
    }
  }

  const getEventInfo = async (eventID) => {
    console.log("Getting event " + eventID);
    const result = await fetch('/api/event/getEventInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        id: eventID
      })
    })
    const SQLevent = JSON.parse(JSON.stringify(await result.json()));
    var temp = {
      event_id: eventID,
      title: SQLevent[0]["Event_name"],
      start: new Date(SQLevent[0]["Event_start_date"] + " " + SQLevent[0]["Event_start_time"]),
      end: new Date(SQLevent[0]["Event_end_date"] + " " + SQLevent[0]["Event_end_time"]),
      color: "teal",
      editable: false,
      deletable: false,
      draggable: false
    };
    isConflict(temp)
  }


    const isConflict = (temp) => {
        const startTime = event.time.split(" - ")[0];
        const endTime = event.time.split(" - ")[1];
        const eventStart = (new Date(event.date + " " + startTime));
        const eventEnd = new Date(event.date + " " + endTime);
        console.log(eventStart + " " + eventEnd);
        console.log(temp.start + " " + temp.end);
        //temp.start = new Date(event.date + " 19:00");
        //temp.end = new Date(event.date + " 21:00");

    if (!(eventStart > temp.end || eventEnd < temp.start)) {
      if (!(eventEnd < temp.start && eventStart < temp.start)) {
        conflicts.push(temp.title);
      }
    }

    console.log("Conflicts " + conflicts);
  }

    const getDates = async (eventID) => {
        console.log("Getting dates for event " + eventID);
        const result = await fetch('/api/event/getEventInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: eventID
            })
        })
        const SQLevent = JSON.parse(JSON.stringify(await result.json()));
        seteventStartDate(SQLevent[0]["Event_start_date"]);
        seteventStartTime(SQLevent[0]["Event_start_time"]);
        seteventEndDate(SQLevent[0]["Event_end_date"]);
        seteventEndTime(SQLevent[0]["Event_end_time"]);
        console.log(eventStartDate + " " + eventStartTime);
    }

    getDates(event.id);
    getUserEvents();
    useEffect(() => {

    }, []); 

    const handleBuy = () => {
        if (conflicts.length > 0) {
            if (!window.confirm("This event has time conflicts with the following events: \n" + conflicts + "\nDo you want to continue?")) {
                return;
            }
        }

        history.push({
            pathname: '/booking',
            state: {
                event: event,
                userID: userID,
                isLoggedIn: isLoggedIn,
                accountType: accountType,
                username: username,
                startDate: eventStartDate,
                startTime: eventStartTime,
                endDate: eventEndDate,
                endTime: eventEndTime,
            }
        });
        history.go(0);
    }

  const [showFeedbackButton, setShowFeedbackButton] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const eventEndTime = new Date(event.date + ' ' + event.time.split(' - ')[1]);

    if (currentDate > eventEndTime) {
      setShowFeedbackButton(true);
    }
  }, [event]);



  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);

  const handleGiveFeedback = () => {
    setShowFeedbackPopup(true);
  };

  const handleCloseFeedbackPopup = () => {
    setShowFeedbackPopup(false);
  };

  const [rating, setRating] = useState(null);
  const [additionalComments, setAdditionalComments] = useState('');
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

  const handleSubmitFeedback = () => {
    // Add logic to submit feedback to the backend
    // You can use rating, additionalComments, and improvements states for the feedback data
    // ...
    // After submitting, close the pop-up
    handleCloseFeedbackPopup();
  };
  
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} username={username} accountType={accountType}></Navbar>
      <div className="event-container">
        <div className='event-date'>
          <img src={event.imageUrl} alt={event.title} className="event-photo" />
          <h2>{event.date}</h2>
          <h3>{event.time}</h3>
          <h2 style={{ color: '#A74F4F' }}>{event.venue}</h2>
          <h3>{event.address}</h3>
        </div>
        <div className='event-details'>
          <h1>{event.title}</h1>
          <h2>Event Organizers</h2>
          <h3>{event.organizers}</h3>
          <div className='side-by-side'>
            <div className='left-email'>
              <h2>Organizer Email</h2>
              <h3>{event.org_email}</h3>
            </div>
            <div className='right-capacity'>
              <h2>Capacity</h2>
              <h3>{event.capacity}</h3>
            </div>
          </div>
          <h2>Event Type</h2>
          <h3>{event.event_type}</h3>
          <h2>Catering Service Provided</h2>
          <h3>{event.catering}</h3>
          <h2>Event Description</h2>
          <p>{event.event_desc}</p>
          <Map address={event.address} />
          <button className='buy-ticket' style={{ width: '25%' }} onClick={handleBuy}>Buy Ticket</button>
          {showFeedbackButton && (
            <button className='buy-ticket' style={{ width: '25%', marginLeft: '5%' }} onClick={handleGiveFeedback}>
              Give Feedback
            </button>
          )}

        {showFeedbackPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-content">
              <h1 style={{marginTop: "7%"}}>Hi There!</h1>
              <h2 className="subtitle">You have recently attended the {event.title} event. We would love to know about your experience at this event.</h2>
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
                <button onClick={handleSubmitFeedback}>Submit</button>
                <button onClick={handleCloseFeedbackPopup}>Remind Me Later</button>
              </div>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default EventInfo;