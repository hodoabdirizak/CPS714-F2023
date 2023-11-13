// pages/PurchaseTicketPage.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import './PurchaseSuccessPage.css';

export const PurchaseSuccessPage = () => {
    const location = useLocation();
    const isLoggedIn = location?.state?.params;
    var orderNumber = '123GRZRMQ';
    return (
        <div className="ticket-success-container">
            <Navbar isLoggedIn={isLoggedIn} />
            <div className="thank-you-container">
                <div className="thank-you-text">THANK YOU FOR YOUR PURCHASE!</div>
                <div className="checkmark-container">
                <FontAwesomeIcon icon={faCheck} size="2xl" style={{color: "#ffffff",}} />
                </div>
                <h2>Order #{orderNumber} Confirmed</h2>
                <button className='view-tickets-btn'>View Tickets</button>
            </div>
        </div>
    );
}