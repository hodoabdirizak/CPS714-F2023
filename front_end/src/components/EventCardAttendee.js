import React from 'react';
import { Link } from 'react-router-dom'; 
import './EventCard.css';

function EventCardAttendee({ event }) {

    /* need to get from database */

    const { title, date, venue, imageUrl, id } = event;

    return (
    <Link to={`/eventattendee/${id}`} className="event-card">
        <img src={imageUrl} alt={title} className="event-image"/>
        <div className='card-content'>
            <h3 className='event-title'>{title}</h3>
            <div className='event-info'>
                <p>{date}</p>
                <p>{venue}</p>
            </div>
        </div>
    </Link>
  );
}

export default EventCardAttendee;