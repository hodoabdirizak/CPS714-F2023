// pages/PurchaseTicketPage.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import logo from '../assets/logo.png';
import { PaymentMethod } from '../components/PaymentMethod'
import './PurchaseTicketPage.css';

export const PurchaseTicketPage = () => {
    const location = useLocation();
    const history = useHistory();
    const queryParams = new URLSearchParams(location.search);
    const numOfTickets = queryParams.get('quantity');

    const handleConfirm = () => {
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
                        <h3>Event Name</h3>
                        <p>Event Venue</p>
                        <p>Event Date</p>
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