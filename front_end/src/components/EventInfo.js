// EventDetail.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import './EventInfo.css';

const EventDetail = () => {
    const { id } = useParams();
    const history = useHistory();

    const handleBuy = () => {
        history.push(`/booking`);
        history.go(0);
    };

    return (
        <div>
            <Navbar></Navbar>
            <div className='event-details'>
                <h1>Event Title</h1>
                <h2>Event Organizers</h2>
                <h3>Event Organizers</h3>
                <div className='side-by-side'>
                    <div className='left-email'>
                        <h2>Organizer Email</h2>
                        <h3>Organizer Email</h3>
                    </div>
                    <div className='right-capacity'>
                        <h2>Capacity</h2>
                        <h3>Capacity</h3>
                    </div>
                </div>
                <h2>Event Type</h2>
                <h3>Event Type</h3>
                <h2>Catering Service Provided</h2>
                <h3>Catering Service Provided</h3>
                <h2>Event Description</h2>
                <p>Lorem Ipsum</p>
            <button className='buy-ticket' onClick={handleBuy}>Buy Ticket</button>
            </div>
        </div>
    );
};

export default EventDetail;

