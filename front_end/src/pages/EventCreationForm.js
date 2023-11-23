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
  const handleOptionChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  //Variables Obtained from the form
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState(getLocation);
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventType, setEventType] = useState(getEventType);
  const [selectedOption2, setSelectedOption2] = useState(''); //Age Restriction Y or N
  const [ageRestriction, setAgeRestriction] = useState('');
  const [selectedOption, setSelectedOption] = useState(''); //Paid or not paid event Y or N
  const [admissionPrice, setAdmissionPrice] = useState('');
  const [selectedOption1, setSelectedOption1] = useState('');
  const [catering, setCatering] = useState(getCatering);
  const [additionalNotes, setAdditionalNotes] = useState('');

  const history = useHistory();

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
	startTime,
	endTime,
        eventDescription,
        eventType,
        selectedOption,
        admissionPrice,
	selectedOption2,
	ageRestriction,
        selectedOption1,
        catering,
        additionalNotes
      });
    history.go(0);
  };

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
	    <div className="form-group">
	      <div>
	        <input
                  type="text"
                  value={startTime}
                  placeholder="Start Time (i.e 13:00)"
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
	      </div>
	      <div>
	        <p>to</p>
	      </div>
	      <div>
	        <input
                  type="text"
                  value={endTime}
                  placeholder="End Time (i.e 13:00)"
                  onChange={(e) => setEndTime(e.target.value)}
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
              <label>Is there an age restriction?</label>
              <div className="form-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="eventAgeRestriction"
                    value="yes"
                    checked={selectedOption2 === 'yes'}
                    onChange={handleOptionChange2}
                  />
                  Yes
                </label>
                <br />
                <label className="radio-label">
                  <input
                    type="radio"
                    name="eventAgeRestriction"
                    value="no"
                    checked={selectedOption2 === 'no'}
                    onChange={handleOptionChange2}
                  />
                  No
                </label>
                <div className="form-group-item">
                  <input
                    type="text"
                    value={ageRestriction}
                    placeholder="Minimum Age"
                    onChange={(e) => setAgeRestriction(e.target.value)}
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





