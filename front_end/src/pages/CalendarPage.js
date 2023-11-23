
// pages/HomePage.js

import React from 'react';
import { useLocation } from "react-router-dom";
import Navbar from '../components/Navbar'; 
import './CalendarPage.css';
import { Scheduler } from "@aldabil/react-scheduler";

export const CalendarPage = () => {

  /*const events = */

  const location = useLocation();
   const isLoggedIn = location?.state?.params;

    const userID = location.state?.userID || 1;

    const getUserEvents = async () => {
        console.log("Getting events for user " + userID);
        const result = await fetch('/api/eventAttendee/getUserEvents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: userID
            })
        })
        const eventIDs = await result.json();
        console.log("Calendar "+ eventIDs);
        for (var i in eventIDs) {
            getEventInfo(eventIDs[i]);
        }
            
    }

    const getEventInfo = async (eventID) => {
        console.log("Getting event " + eventID);
        const result = await fetch('/api/event/getEventInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: eventID
            })
        })
        const event = JSON.parse(JSON.stringify(await result.json()));
        var temp = {
            event_id: eventID,
            title: event[0]["Event_name"],
            start: new Date(event[0]["Event_start_date"] + " " + event[0]["Event_start_time"]),
            end: new Date(event[0]["Event_end_date"] + " " + event[0]["Event_end_time"]),
            color: "teal",
            editable: false,
            deletable: false,
            draggable: false
        };
        events.push(temp);
    }

    var events = [];
    var eventIDs = getUserEvents();
  

  const translations = {
    navigation: {
      week: " ",
      day: " ",
      month: " ",
      today: " "
    },
  };

  return (
  <div className='home-page-container'>
    <Navbar isLoggedIn={isLoggedIn} />
    <div className='calendar-section' style={{ width: '90%' }}>
      <div style={{ paddingTop: "12vh", paddingLeft: "7vw", fontSize: "40px", fontWeight: "bold", marginBottom: "0%", color: "#696969" }}>
        My Calendar
      </div>
      <div style={{marginLeft: "8%", width: "95%"}}>
      <Scheduler
        height={400}
        view="month"
        events={events}
        translations={translations}
      />
      </div>
    </div>
  </div>
  );
}
