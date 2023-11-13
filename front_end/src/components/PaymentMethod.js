// PaymentMethod.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import './PaymentMethod.css';

export const PaymentMethod = () => {
  return (
    <div className="payment-method">
      <div className="payment-options">
        <label>
          <input type="radio" name="payment" value="creditDebitCard" />
          <FontAwesomeIcon icon={faCreditCard} className="icon" /><div style={{padding: '5px'}}></div>
          Credit/Debit Card
        </label>
        <label>
          <input type="radio" name="payment" value="paypal" />
          <FontAwesomeIcon icon={faPaypal} /><div style={{padding: '10px'}}></div>
          Paypal
        </label>
      </div>
      <div className="card-details">
        <input type="text" placeholder="Card Number" className="card-number" />
        <input type="text" placeholder="Expiration Date" className="expiration-date" />
        <input type="text" placeholder="CVV" className="cvv" />
      </div>
    </div>
  );
};