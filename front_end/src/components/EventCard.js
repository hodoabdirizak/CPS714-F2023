import React from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css';
import imageUrl from '../assets/images/pic1.jpeg';


const EventCard = ({ event }) => {
  const {
    Event_id,
    Event_name,
    Event_start_date,
    Venue_name,
    //imageUrl // Extract imageUrl from the event data
  } = event;

  return (
    <Link to={`/event/${Event_id}`} className="event-card">
      <img src={imageUrl} alt={Event_name} className="event-image" />
      <div className='card-content'>
        <h3 className='event-title'>{Event_name}</h3>
        <div className='event-info'>
          <p>{Event_start_date}</p>
          <p>{Venue_name}</p>
          {/* Display other necessary event information */}
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
