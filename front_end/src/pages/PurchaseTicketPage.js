// pages/ConfirmTicketPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import PaymentForm from '../components/PaymentForm';
import './PurchaseTicketPage.css';

export const PurchaseTicketPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const numOfTickets = queryParams.get('quantity');

    return (
        <div className='purchase-container'>
            <a href="/">
            <img src={logo} alt="Logo" />
            </a>
            <h1>Your Tickets</h1>
            <h2>Your Event</h2>
            <h2>Your Seats</h2>
            <p>Number of tickets: {numOfTickets}</p>
            <p>Delivery: Mobile</p>
            <div>
      <PaymentForm />
    </div>
        </div>
    );
}