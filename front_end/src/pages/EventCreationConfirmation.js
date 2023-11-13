//EventCreationConfirmation.js
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import logo from '../assets/logo.png';
import bg from '../assets/logo200.png';

import './EventCreationConfirmation.css';

export const EventCreationConfirmation = () => {
	//Functions for multi-select  
	const handleOptionChange = (event) => {
		setSelectedPayment(event.target.value);
	};

	const [selectedPayment, setSelectedPayment] = useState('');
	const [cardNumber, setCardNumber] = useState('');
	const [expiryDate, setExpiryDate] = useState('');
	const [cvv, setcvv] = useState('');

	const location = useLocation();
	const { eventName,
		eventDate,
		eventLocation,
		numberOfGuests,
		eventDescription,
		eventType,
		selectedOption,
		admissionPrice,
		selectedOption1,
		catering,
		additionalNotes
	} = location.state;

	const history = useHistory();
	const handleSubmit = (e) => {
		e.preventDefault();
		alert("Event Created Succesfully.");
		//Insert statement to database
		history.push('/');
		history.go(0);
	}

	return (
		<div className='event-confirmation-bg'>
			<div style={{ backgroundImage: `url(${bg})` }}>
				<div className="event-confirmation-container" style={{ backgroundColor: `white` }}>
					<img src={logo} alt="Logo" />
					<h2>Confirm Event Creation</h2>
					<table>
						<tr>
							<th>Event Details</th>
							<th>Cost Summary and Payment</th>
						</tr>
						<tr>
							<td>
								<div>
									<p>USER NAME HERE</p>
									<p>Event Name: {eventName}</p>
									<p>Event Date: {eventDate}</p>
									<p>Event Location: {eventLocation}</p>
									<p>Number of Guests: {numberOfGuests}</p>
									<p>Event Description: {eventDescription}</p>
									<p>Event Type: {eventType}</p>
									<p>Cost per person: ${admissionPrice}</p>
									<p>Catering Services: {catering}</p>
									<p>Additional Notes: {additionalNotes}</p>
									<p>{selectedOption}</p>
								</div>
							</td>
							<td>
								<form onSubmit={handleSubmit}>
									<div>
										<p>
											A 1-time payment fee of $1000 is needed
											in order toconfirm/create your event listing
										</p>
										<h3>SELECT A PAYMENT METHOD</h3>
										<div className='form-group' style={{ display: 'flex', justifyContent: 'center' }}>
											<label className="radio-label">
												<input
													type="radio"
													name="payPal"
													value="PayPal"
													checked={selectedPayment === 'PayPal'}
													onChange={handleOptionChange}
												/>
												PayPal
											</label>
											<label className="radio-label">
												<input
													type="radio"
													name="creditDebit"
													value="CreditDebit"
													checked={selectedPayment === 'CreditDebit'}
													onChange={handleOptionChange}
												/>
												Credit/Debit Card
											</label>
										</div>
										<input
											type="text"
											value={cardNumber}
											placeholder="Card Number"
											onChange={(e) => setCardNumber(e.target.value)}
											required
										/>
										<div className='form-group' style={{ display: 'flex', justifyContent: 'center' }}>
											<div className='form-group-item'>
												<input
													type="date"
													value={expiryDate}
													placeholder="Event Date (yyyy-mm-dd)"
													onChange={(e) => setExpiryDate(e.target.value)}
													required
												/>
											</div>
											<div className='form-group-item'>
												<input
													type="text"
													value={cvv}
													placeholder="CVV"
													onChange={(e) => setcvv(e.target.value)}
													required
												/>
											</div>
										</div>
										<button type="submit">Create Event</button>
									</div>
								</form>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	)
}