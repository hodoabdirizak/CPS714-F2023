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

    const userID = location.state?.userID | 1;
    const eventID = location.state?.eventID | 0;
    const userOwnedTickets = location.state?.userOwnedTickets | 0;
    const numOfTickets = location.state?.numOfTickets | 1;
    const eventDate = location.state?.eventDate || "December 10th, 2023";
    const eventName = location.state?.eventName || "Graduation Ceremony";
    const eventVenue = location.state?.eventVenue || "Madison Square Garden";
    const isLoggedIn = location?.state?.isLoggedIn;
    const accountType = location?.state?.accountType;
    const username = location?.state?.username || "";
    console.log("Username " + username);
    //const {
    //    userID = 0,
    //    eventID = 0,
    //    userOwnedTickets = 0,
    //    numOfTickets = 1,
    //    eventDate = "December 10th, 2023",
    //    eventName = "Graduation Ceremony",
    //    eventVenue = "Madison Square Garden"
    //} = JSON.stringify(state);
    console.log(userID + ", " + eventID + ", " + userOwnedTickets);

    const updateTickets = async () => {
        try {
            console.log("Updating Tickets Sold for eventID " + state.eventID + " and userID " + state.userID
                + " for " + state.numOfTickets);
            await fetch('/api/eventAttendee/updateEventAttendee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Event_id: state.eventID,
                    User_id: state.userID,
                    Number_of_tickets: state.numOfTickets
                })
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    const handleConfirm = (e) => {
        e.preventDefault();
        console.log("Handling Submission");
        updateTickets();
        history.push(`/purchase-success`,
            {
                isLoggedIn: isLoggedIn,
                accountType: accountType,
                username: username
            }
            );
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