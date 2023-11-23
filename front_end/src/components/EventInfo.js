// EventInfo.js
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import './EventInfo.css';

const EventInfo = () => {
    const event = useSelector((state) => state.event);
    const history = useHistory();
    const { id } = useParams();
    console.log('Event ID:', id);

    const handleBuy = () => {
        history.push({
            pathname: '/booking',
            state: { event: event }
        });
        history.go(0);
    };

    return (
        <div>
            <Navbar></Navbar>
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
                    <button className='buy-ticket' onClick={handleBuy}>Buy Ticket</button>
                </div>
            </div>
        </div>
    );
};

export default EventInfo;

