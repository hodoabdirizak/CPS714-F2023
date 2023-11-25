import React, { useState } from 'react';

export const BackEndTesting = () => {
  // const [returnedData, setReturnedData] = useState(['Some data']);
  // const [newUserAccount, setUserAccount] = useState({User_id: 0, Email: '', Full_name: '', 
  //                                                 Phone_number: 0, Pronouns: '', Account_type: ''});

  const [newEvent, setEvent] = useState({ name: '', type: '',
                                                      startDate: 0, endDate: '', startTime: '',endTime: '', desc:'',
                                                      capacity: 1, MinimumAge: 0, approved: 'True', cost: 0 ,location: '' });

  const setInput = (e) => {
    const {name, value} = e.target;
    console.log(name, value);
    if (name === 'Capacity' || name === 'MinimumAge'){
        console.log('Convert to number type')
        setEvent(prevState => ({
        ...prevState,
        [name]: parseInt(value)
      }));
      return;
    }
    // Return value as-is
    setEvent(prevState => ({
      ...prevState,
      [name]: value
    }));
    return;
  }

  // const fetchAccounts = async () => {
  //     console.log("Getting all accounts")
  //   await fetch('/api/account/getaccounts', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     }
  //   })
  // }


  // const fetchAccountData = async () => {
  //   await fetch('/api/account/getaccountbyname', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       name: newUserAccount.Full_name
  //     })
  //   })
  // }

  const fetchEvents = async () => {
      console.log("Getting all events")
      await fetch('/api/event/getEvents', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
      })
  }


  const fetchEventData = async () => {
    console.log("newEvent: " + newEvent.name);
    console.log("Getting event: " + newEvent.name);
    await fetch('/api/event/getEventbyName', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: newEvent.name
        })
    })
  }

  
  // const addAccount = async () => {
  //   await fetch('/api/account/addaccount', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       ...newUserAccount
  //     })
  //   })
  // }

  const addEvent = async () => {
    await fetch('/api/event/createevent', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
          Event_name: newEvent.name,
          Event_type: newEvent.type,
          Event_start_date: newEvent.startDate,
          Event_end_date: newEvent.endDate,
          Event_start_time: newEvent.startTime,
          Event_end_time: newEvent.endTime,
          Event_description: newEvent.desc,
          Capacity: newEvent.capacity,
          Minimum_age: newEvent.MinimumAge,
          Approved: newEvent.approved,
          Ticket_cost: newEvent.cost,
          Event_location: newEvent.location
          
      })
    })
  }

  return (
    <div>
      <h1>Back-end Testing page</h1>
      <input name="name" placeholder="name" onChange={setInput}></input>
      <input name="type" placeholder="Type" onChange={setInput}></input>
      <input type="Date" name="startDate" placeholder="Start Date" onChange={setInput}></input>
      <input type="Date" name="endDate" placeholder="End Date" onChange={setInput}></input>
      <input type="time" name="startTime" placeholder="Start Time" onChange={setInput}></input>
      <input type="time" name="endTime" placeholder="End Time" onChange={setInput}></input>
      <input name="desc" placeholder="Description" onChange={setInput}></input>
      <input type="number" name="capacity" placeholder="Capacity" onChange={setInput}></input>
      <input type="number" name="MinimumAge" placeholder="Minimum Age" onChange={setInput}></input>
      <input type="number" name="cost" placeholder="Ticket Cost" onChange={setInput}></input>
      <button onClick={() => fetchEvents()}>Fetch Data About All Events</button>
          <button onClick={() => fetchEventData()}>Fetch Data About an Event</button>
          <button onClick={() => addEvent()}>Add User Account</button>
    </div>
  );
}