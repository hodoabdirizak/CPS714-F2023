// pages/BookingPage.js

import React, { useState } from 'react';
import { Dropdown } from '../components/Dropdown';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCouch } from '@fortawesome/free-solid-svg-icons'
import './BookingPage.css';

export const BookingPage = () => {
    //Get this from previous page or something somehow
    const location = useLocation()
    const userID = location.state?.userID || 1;
    const eventID = location.state?.eventID || 1;
    const eventName = location.state?.eventName || "Generic Event";
    const eventVenue = location.state?.eventVenue || "Generic Venue";
    const eventDate = location.state?.eventDate || "Generic Date";

    //Determine remaining tickets for the event

    const getCapacity = async () => {
        console.log("Getting Capacity for eventID " + eventID);
        await fetch('/api/event/getCapacity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: eventID
            })
        })
    }

    const getTicketsSold = async () => {
        console.log("Getting Tickets Sold for eventID " + eventID);
        await fetch('/api/event/getCapacity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: eventID
            })
        })
    }

    const getTicketsOwned = async () => {
        console.log("Getting Tickets owned for eventID " + eventID + " and userID "+ userID);
        await fetch('/api/eventattendee/getAttendeeQuantity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                eventID: eventID,
                userID: userID
            })
        })
    }


    const capacity = getCapacity();
    const ticketsSold = getTicketsSold();
    const remainingTicket = capacity - ticketsSold;
    const userTickets = getTicketsOwned().value;
    const [userOwnedTicket, setUserOwnedTicket] = useState(0);




    const [numOfTickets, setNumOfTickets] = useState(1);
    const history = useHistory();

    const handleQuantityChange = (event) => {
        setNumOfTickets(event.target.value);
    };

    const handleSubmit = (e) => {
        setUserOwnedTicket(userTickets);
        //check if tickets are allowed
        if (numOfTickets > remainingTicket)
            console.log("There are not enough tickets for your selection");
        else if (userOwnedTicket + numOfTickets > 6)
            console.log("Adding " + numOfTickets + " would exceed your limit of 6 tickets")
        else {
            history.push(`/purchase-tickets`,
                 
                {
                    userID: userID,
                    eventID: eventID,
                    userOwnedTicket: userOwnedTicket,
                    numOfTickets: numOfTickets,
                    eventDate: eventDate,
                    eventName: eventName,
                    eventVenue: eventVenue
                }
        );
            history.go(0);
        }
    };

    return (
        <div className='booking-bg'>
            <div className='booking-container'>
                <h2>How many tickets?</h2>
                <Dropdown
                    options={[
                        { label: '1 ticket', value: 1, key: 1},
                        { label: '2 tickets', value: 2, key: 2},
                        { label: '3 tickets', value: 3, key: 3},
                        { label: '4 tickets', value: 4, key: 4},
                        { label: '5 tickets', value: 5, key: 5},
                        { label: '6 tickets', value: 6, key: 6},
                    ]}
                    value={numOfTickets}
                    onChange={handleQuantityChange}
                />
                { numOfTickets > 1 ? <h3>You'll be seated together <FontAwesomeIcon icon={faCouch} className='fa' size="sm"/> 
                <FontAwesomeIcon icon={faCouch} className='fa' size="sm"/></h3> : <div style={{padding: '15px'}}></div>}
                <button className='submit-quantity' onClick={handleSubmit}>Continue</button>
            </div>
        </div>
    );
}

