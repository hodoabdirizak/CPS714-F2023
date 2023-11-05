// pages/BookingPage.js

import React, { useState } from 'react';
import { Dropdown } from '../components/Dropdown';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCouch } from '@fortawesome/free-solid-svg-icons'
import './BookingPage.css';

export const BookingPage = () => {
    const [numOfTickets, setNumOfTickets] = useState(0);
    const history = useHistory();

    const handleQuantityChange = (event) => {
        setNumOfTickets(event.target.value);
    };

    const handleSubmit = () => {
        history.push(`/purchase-tickets?quantity=${numOfTickets}`);
        history.go(0);
    };

    return (
        <div className='booking-bg'>
            <div className='booking-container'>
                <h2>How many tickets?</h2>
                <Dropdown
                    options={[
                        { label: '1 ticket', value: 1 },
                        { label: '2 tickets', value: 2 },
                        { label: '3 tickets', value: 3},
                        { label: '4 tickets', value: 4 },
                        { label: '5 tickets', value: 5 },
                        { label: '6 tickets', value: 6},
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

