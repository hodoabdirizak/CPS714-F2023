// pages/EventCreationForm.js
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import logo from '../assets/logo.png';
import bg from '../assets/logo200.png';

import './EventCreationForm.css';

export const EventCreationForm = () => {
  const location = useLocation()
  const userID = location.state?.userID || 1;

  //Functions for dropdown options
  const getLocation = () => {
    const value = "Orange";
    return value;
  };
  const handleChange = (e) => {
    if(e.target.value == 0){
      seteventFormat("Virtual");
    }else{
      seteventFormat("In-person");
      setEventLocation(e.target.value);
    }
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
    if(event.target.value === 'no'){
      setAdmissionPrice(0);
    }
  };
  const handleOptionChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };

  const getdropdown1 = () =>{
      getVenues().then(res => {
          console.log("Displaying Venues");
          for (var j = 0; j < venueList.length; j++) {
              console.log("Venue: " + JSON.parse(JSON.stringify(venueList[j]))["Venue_name"]);
          }
          
          var select = document.getElementById("selectVenue");
          for(var i = 0; i < venueList.length; i++) {
              var opt = JSON.parse(JSON.stringify(venueList[i]))["Venue_name"];
              var el = document.createElement("option");
              el.textContent = opt;
              el.value = parseInt(JSON.parse(JSON.stringify(venueList[i]))["Venue_id"]);
              select.appendChild(el);
          }
          
      });
  };

  const getdropdown2 = () =>{
    
    getCaterers().then(res => {
      console.log("Displaying Caterers");
      for (var j = 0; j < catererList.length; j++) {
          console.log("Caterer: " + JSON.parse(JSON.stringify(catererList[j]))["Cuisine"]);
      }
      var select = document.getElementById("selectCaterer");
      for(var i = 0; i < catererList.length; i++) {
          var opt = JSON.parse(JSON.stringify(catererList[i]))["Cuisine"];
          var el = document.createElement("option");
          el.textContent = opt;
          el.value = parseInt(JSON.parse(JSON.stringify(catererList[i]))["Caterer_id"]);
          select.appendChild(el);
      }
  });
  }

  //Variables Obtained from the form
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState(getLocation);
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventType, setEventType] = useState(getEventType);
  const [selectedOption, setSelectedOption] = useState(''); //Paid or not paid event Y or N
  const [admissionPrice, setAdmissionPrice] = useState('');
  const [selectedOption1, setSelectedOption1] = useState('');//Catering Y or N
  const [catering, setCatering] = useState(getCatering);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [eventFormat, seteventFormat] = useState('');

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
        selectedOption1,
        catering,
        additionalNotes,
        userID,
        eventFormat
      });
    history.go(0);
  };

  var venueList = [];
  var catererList = [];

  const getVenues = async () => {
    console.log("Getting all venues")
    const result = await fetch('/api/venue/getVenues', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

    });
      
      console.log("in get venues1");
      const data = await result.json();  
      console.log("in get venues2");
      for (var i = 0; i < data.length; i++) {
        var length = venueList.push(data[i]);
        console.log("Appending " + JSON.stringify(data[i]));
        console.log("Length: " + length);
      }
};
const getCaterers = async () => {
  console.log("Getting all caterers")
  const result = await fetch('/api/caterer/getcaterers', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }

  });
  console.log("in get caterers1");
  const data = await result.json();  
  console.log("in get caterers2");
  for (var i = 0; i < data.length; i++) {
      var length = catererList.push(data[i]);
      console.log("Appending " + JSON.stringify(data[i]));
      console.log("Length: " + length);
  }
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
                <select id="selectVenue" value={eventLocation} onChange={handleChange} onClick={getdropdown1}>
                <option value= "" hidden>Select the location</option>
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
                  type="time"
                  value={startTime}
                  placeholder="Start Time (i.e 13:00)"
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
	      </div>
	      <div>
	        <p> to </p>
	      </div>
	      <div>
	        <input
                  type="time"
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
                <option value="Conference">Conference</option>
                <option value="Corporate">Corporate</option>
                <option value="Cultural">Cultural</option>
                <option value="Networking">Networking</option>
                <option value="Sports">Sports</option>
                <option value="Educational">Educational</option>
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
              <select id="selectCaterer" value={catering} onChange={handleChange2} onClick={getdropdown2}>
                <option value="" hidden>Type of Catering Services</option>
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





