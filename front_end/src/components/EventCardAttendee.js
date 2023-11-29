import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom'; 
import './EventCard.css';

function EventCardAttendee({ event }) {

    /* need to get from database */
    const location = useLocation();
    const history = useHistory();
    const { title, date, venue, imageUrl, id } = event;
    const isLoggedIn = location.state?.isLoggedIn;
    const accountType = location.state?.accountType;
    const editEvent = (e) => {
        e.preventDefault();
        // Redirect to the event creatio
        history.push('/eventCreation'); 
      };

    return (
    <Link to={`/eventattendee/${id}`} className="event-card">
        <img src={imageUrl} alt={title} className="event-image"/>
        <div className='card-content'>
            <h3 className='event-title'>{title}</h3>
            <div className='event-info'>
                <p>{date}</p>
                <p>{venue}</p>
                {isLoggedIn && accountType === 'Organizer' && (
                    <button onClick={editEvent} className="button">Edit Event</button>
                )}
            </div>
        </div>
    </Link>
  );
}

export default EventCardAttendee;