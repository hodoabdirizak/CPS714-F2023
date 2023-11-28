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
			startTime,
			endTime,
        	eventDescription,
        	eventType,
        	selectedOption,
        	admissionPrice,
			ageRestriction,

        	catering,
        	additionalNotes,
			eventFormat,
			userID
	} = location.state;

	const history = useHistory();
	const handleSubmit = (e) => {
		e.preventDefault();
		addEvent();
		alert("Event Created Succesfully.");
		history.push('/');
		history.go(0);

	}
	
	const addEvent = async () => {
		await fetch('/api/event/createEvent', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				Event_name: eventName,
				Event_type: eventType,
				Event_start_date: eventDate,
				Event_end_date: eventDate,
				Event_start_time: startTime,
				Event_end_time: endTime,
				Event_description: eventDescription,
				Capacity: numberOfGuests,
				Minimum_age: 0,
				Approved: 'True',
				Ticket_cost: admissionPrice,
				Event_location: ' ',
				VenueId: eventLocation,
				OrganizerId: userID,
				cateringid: catering,
				eventFormat
				
			})
		})
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
									<p>Event Start and End times: {startTime} to {endTime}</p>
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
													type="text"
													value={expiryDate}
													placeholder="MMYY"
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
										<button type="submit" onClick={(e) => handleSubmit}>Create Event</button>
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