import React from 'react';
import { Link} from 'react-router-dom'; 
import './EventCard.css';

function EventCardAttendee({ event, accountType, isLoggedIn }) {

    /* need to get from database */

    const { title, date, venue, imageUrl, id } = event;

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
                    <li>
                        <button onClick={editEvent} className="button">Edit Event</button>
                    </li>
                )}
            </div>
        </div>
    </Link>
  );
}

export default EventCardAttendee;