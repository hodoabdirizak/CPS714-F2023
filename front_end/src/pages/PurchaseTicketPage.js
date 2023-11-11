// pages/ConfirmTicketPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import PaymentForm from '../components/PaymentForm';
import './PurchaseTicketPage.css';

class PaymentFormextended extends PaymentForm {
    constructor(props) {
        super(props);
        this.state = {
            creditCard: '',
            expirationDate: '',
            cvv: '',
            eventID: '0',
            userID: '0',
            numOfTickets: '0',
            errors: {
                creditCard: '',
                expirationDate: '',
                cvv: '',
            },
        };
    }



    updateTickets = async () => {
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

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("Handling submission");
        this.updateTickets();
    }



}

export const PurchaseTicketPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const numOfTickets = queryParams.get('quantity');
    const userOwnedTickets = 0;
    PaymentFormextended.numOfTickets = numOfTickets + userOwnedTickets;
    PaymentFormextended.userID = 0;//cookies?
    PaymentFormextended.eventID = 0;//cookies?

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
                <PaymentFormextended/>
            </div>
        </div>
    );
}