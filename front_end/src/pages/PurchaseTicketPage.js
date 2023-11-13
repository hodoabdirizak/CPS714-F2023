// pages/ConfirmTicketPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import PaymentForm from '../components/PaymentForm';
import './PurchaseTicketPage.css';

export const PurchaseTicketPage = props => {
    const location = useLocation();
    const { state } = location;
    console.log(state)
    //const queryParams = new URLSearchParams(location.search);
    //const numOfTickets = queryParams.get('quantity');
    const {
        userID = 0,
        eventID = 0,
        userOwnedTickets = 0,
        numOfTickets = 0
    } = state;
    console.log(userID + ", " + eventID + ", " + userOwnedTickets);

    class PaymentFormextended extends PaymentForm {
        constructor(props) {
            super(props);
            this.state = {
                creditCard: '',
                expirationDate: '',
                cvv: '',
                eventID: eventID,
                userID: userID,
                numOfTickets: numOfTickets,
                errors: {
                    creditCard: '',
                    expirationDate: '',
                    cvv: '',
                },
            };
        }

        set setUserID(userID) {
            this.setState({ userID: userID });
        }

        set setEventID(eventID) {
            this.setState({ eventID: eventID });
        }

        set setNumOfTickets(numOfTickets) {
            this.setState({ numOfTickets: numOfTickets });
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
                <PaymentFormextended />
            </div>
        </div>
    );
}