// pages/PurchaseTicketPage.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import logo from '../assets/logo.png';
import { PaymentMethod } from '../components/PaymentMethod'
import './PurchaseTicketPage.css';

export const PurchaseTicketPage = props => {
    const location = useLocation();
    const history = useHistory();
    const { state } = location;
    console.log(state)
    //const queryParams = new URLSearchParams(location.search);
    //const numOfTickets = queryParams.get('quantity');
    const {
        userID = 0,
        eventID = 0,
        userOwnedTickets = 0,
        numOfTickets = 0,
        eventDate = "Event Date",
        eventName = "Event Name",
        eventVenue = "Event Venue"
    } = state;
    console.log(userID + ", " + eventID + ", " + userOwnedTickets);

    const updateTickets = async () => {
        console.log("Updating Tickets Sold for eventID " + this.state.eventID + " and userID " + this.state.userID
            + " for " + this.state.numOfTickets);
        await fetch('/api/eventAttendee/updateEventAttendee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                eventID: this.state.eventID,
                userID: this.state.userID,
                numOfTickets: this.state.numOfTickets
            })
        })
    }

    const handleConfirm = (e) => {
        e.preventDefault();
        console.log("Handling Submission");
        updateTickets();
        history.push(`/purchase-success`);
        history.go(0);
    };

    return (
        <div>
            <div className='page-header'>
                <a href="/">
                    <img src={logo} className='page-header-img' alt="Logo" />
                </a>
                <h1 className='page-header-text'>Your Tickets</h1>
            </div>
        <div className='purchase-container'>
            <div className='content-container'>
                <div className='event-section'>
                    <div className='info-section'>
                        <h2>Your Event</h2>
                        <div className="payment-line"></div>
                            {/* Must be populated by backend */}
                            <h3>{eventName}</h3>
                            <p>{eventVenue}</p>
                            <p>{eventDate}</p>
                    </div>
                    <div className='info-section'>
                        <h2>Your Seats</h2>
                        <div className="payment-line"></div>
                        <p>Number of Tickets: {numOfTickets}</p>
                        <p>Delivery: Mobile</p>
                    </div>
                </div>
                <div className='payment'>
                        <h2>SELECT PAYMENT METHOD</h2>
                        <PaymentMethod></PaymentMethod>
                    <button className='confirm-purchase' onClick={handleConfirm}>Confirm Purchase</button>
                </div>
            </div>
        </div>
        </div>
    );
}