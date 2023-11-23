
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
        console.log(result);
        return result;
    }

    const getEventInfo = async (eventID) => {
        console.log("Getting event " + eventID);
        await fetch('/api/event/getEventInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: eventID
            })
        })
    }

    var events = [];
    const eventIDs = getUserEvents().then(req => {
        console.log(eventIDs);
        for (var i in eventIDs) {
            var event = getEventInfo(eventIDs[i]);
            var temp = {
                event_id: eventIDs[i],
                title: event["Event_name"],
                start: new Date(event["Event_start_date"] + " " + event["Event_start+time"]),
                end: new Date("2023/10/31 10:30"),
                color: "teal",
                editable: false,
                deletable: false,
                draggable: false
            };
            console.log(temp);
            events.push(temp);
        }
})

    events = [
        {
            event_id: 1,
            title: "Harmony Fest",
            start: new Date("2023/10/31 09:30"),
            end: new Date("2023/10/31 10:30"),
            color: "teal",
            editable: false,
            deletable: false,
            draggable: false
        },
        {
            event_id: 2,
            title: "Networking Events",
            start: new Date("2023/11/15 09:30"),
            end: new Date("2023/11/15 11:30"),
            color: "teal",
            editable: false,
            deletable: false,
            draggable: false
        },
        {
            event_id: 4,
            title: "TechInsight Summit",
            start: new Date("2024/01/20 09:30"),
            end: new Date("2024/01/20 11:30"),
            color: "teal",
            editable: false,
            deletable: false,
            draggable: false
        },
    ];
  

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
