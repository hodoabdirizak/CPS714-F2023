// pages/EventCreationForm.js
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import logo from '../assets/logo.png';
import bg from '../assets/logo200.png';

import './EventCreationForm.css';

export const EventCreationForm = () => {
  //Functions for dropdown options
  const getLocation = () => {
    const value = "Orange";
    return value;
  };
  const handleChange = (e) => {
    setEventLocation(e.target.value);
  };

  const getEventType = () => {
    const value = "Orange";
    return value;
  };
  const handleChange1 = (e) => {
    setEventType(e.target.value);
  };

  const getCatering = () => {
    const value = "Orange";
    return value;
  };
  const handleChange2 = (e) => {
    setCatering(e.target.value);
  };

  //Functions for multi-select  
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleOptionChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };

  //Variables Obtained from the form
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState(getLocation);
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventType, setEventType] = useState(getEventType);
  const [selectedOption, setSelectedOption] = useState(''); //Paid or not paid event Y or N
  const [admissionPrice, setAdmissionPrice] = useState('');
  const [selectedOption1, setSelectedOption1] = useState('');
  const [catering, setCatering] = useState(getCatering);
  const [additionalNotes, setAdditionalNotes] = useState('');

  const history = useHistory();

  const [newEvent, setEvent] = useState({ name: '', type: '',
                                                        startDate: 0, endDate: '', startTime: '', desc:'',
                                                        capacity: 1, MinimumAge: 0, approved: 'True', cost: 0, location: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission and data storage here.
    // For this example, we'll just navigate to the confirmation page.
    

    history.push('/eventCreationConfirmation',
      {
        eventName,
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
      });
    history.go(0);
  };

  const addEvent = async () => {
    await fetch('/api/event/createevent', {
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
            Event_start_time: '',
            Event_end_time: '',
            Event_description: eventDescription,
            Capacity: numberOfGuests,
            Minimum_age: 0,
            Approved: 'True',
            Ticket_cost: admissionPrice,
            Event_location: ' '
            
        })
    })
}
  return (
    <div className='event-creation-bg'>
      <div style={{ backgroundImage: `url(${bg})` }}>
        <div className="event-creation-container" style={{ backgroundColor: `white` }}>
          <img src={logo} alt="Logo" />
          <h2>Create an Event</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <input
                  type="text"
                  value={eventName}
                  placeholder="Event Name"
                  onChange={(e) => setEventName(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="date"
                  value={eventDate}
                  placeholder="Event Date (yyyy-mm-dd)"
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div>
                <select value={eventLocation} onChange={handleChange}>
                  <option value="" hidden>Event Location</option>
                  <option value="Location 1">Location 1</option>
                  <option value="Location 2">Location 2</option>
                  <option value="Location 3">Location 3</option>
                  <option value="Location 4">Location 4</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  value={numberOfGuests}
                  placeholder="Number of Guests"
                  onChange={(e) => setNumberOfGuests(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <input
                type="text"
                value={eventDescription}
                placeholder="Event Description"
                onChange={(e) => setEventDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <select value={eventType} onChange={handleChange1}>
                <option value="" hidden>Type of Event</option>
                <option value="EvenType 1">EvenType 1</option>
                <option value="EvenType 2">EvenType 2</option>
                <option value="EvenType 3">EvenType 3</option>
                <option value="EvenType 4">EvenType 4</option>
              </select>
              <br></br>
            </div>
            <div>
              <label>Is this a paid event?</label>
              <div className="form-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="eventPrice"
                    value="yes"
                    checked={selectedOption === 'yes'}
                    onChange={handleOptionChange}
                  />
                  Yes
                </label>
                <br />
                <label className="radio-label">
                  <input
                    type="radio"
                    name="eventPrice"
                    value="no"
                    checked={selectedOption === 'no'}
                    onChange={handleOptionChange}
                  />
                  No
                </label>
                <div className="form-group-item">
                  <input
                    type="text"
                    value={admissionPrice}
                    placeholder="Admission Price"
                    onChange={(e) => setAdmissionPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div>
              <label>Do you require catering services?</label>
              <div className="form-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="eventCatering"
                    value="yes"
                    checked={selectedOption1 === 'yes'}
                    onChange={handleOptionChange1}
                  />
                  Yes
                </label>
                <br />
                <label className="radio-label">
                  <input
                    type="radio"
                    name="eventCatering"
                    value="no"
                    checked={selectedOption1 === 'no'}
                    onChange={handleOptionChange1}
                  />
                  No
                </label>
              </div>
            </div>
            <div>
              <label>If yes, what catering services do you require?</label>
              <select value={catering} onChange={handleChange2}>
                <option value="" hidden>Type of Catering Services</option>
                <option value="Catering 1">Catering 1</option>
                <option value="Catering 2">Catering 2</option>
                <option value="Catering 3">Catering 3</option>
                <option value="Catering 4">Catering 4</option>
              </select>
              <br></br>
            </div>
            <div>
              <input
                type="text"
                value={additionalNotes}
                placeholder="Additonal Notes"
                onChange={(e) => setAdditionalNotes(e.target.value)}
              />
            </div>
            <button type="submit">Create Event</button>
          </form>
        </div>
      </div>
    </div>
  );
};





