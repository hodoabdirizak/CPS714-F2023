import React, { Component } from 'react';
import './PaymentForm.css';

class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creditCard: '',
      expirationDate: '',
      cvv: '',
      errors: {
        creditCard: '',
        expirationDate: '',
        cvv: '',
      },
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: this.validateInput(name, value),
      },
    });
  }

  validateInput = (name, value) => {
    switch (name) {
      case 'creditCard':
        // Basic credit card number validation (16 digits)
        return value.length === 16 ? '' : 'Credit card number must be 16 digits';
      case 'expirationDate':
        // Basic expiration date validation (MM/YY format)
        return /^\d{2}\/\d{2}$/.test(value) ? '' : 'Expiration date must be in MM/YY format';
      case 'cvv':
        // Basic CVV validation (3 digits)
        return /^\d{3}$/.test(value) ? '' : 'CVV must be 3 digits';
      default:
        return '';
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // You can perform further validation or submit the payment information here
    // For simplicity, we'll just log the data for now
    console.log('Credit Card:', this.state.creditCard);
    console.log('Expiration Date:', this.state.expirationDate);
    console.log('CVV:', this.state.cvv);
  }

  render() {
    const { errors } = this.state;

    return (
      <div id="payment-method">
        <h2>Select Payment Method</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="creditCard" className="label">
            Credit Card Number:
          </label>
          <input
            type="text"
            id="creditCard"
            name="creditCard"
            placeholder="Enter your credit card number"
            value={this.state.creditCard}
            onChange={this.handleInputChange}
            required
            className="input"
          />
          <span className="error">{errors.creditCard}</span>

          <label htmlFor="expirationDate" className="label">
            Expiration Date:
          </label>
          <input
            type="text"
            id="expirationDate"
            name="expirationDate"
            placeholder="MM/YY"
            value={this.state.expirationDate}
            onChange={this.handleInputChange}
            required
            className="input"
          />
          <span className="error">{errors.expirationDate}</span>

          <label htmlFor="cvv" className="label">
            CVV:
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            placeholder="Enter CVV"
            value={this.state.cvv}
            onChange={this.handleInputChange}
            required
            className="input"
          />
          <span className="error">{errors.cvv}</span>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default PaymentForm;