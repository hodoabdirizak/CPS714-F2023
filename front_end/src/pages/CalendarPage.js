// pages/HomePage.js

import React from 'react';
import { useLocation } from "react-router-dom";
import Navbar from '../components/Navbar'; 
import './CalendarPage.css';
import { Scheduler } from "@aldabil/react-scheduler";

export const CalendarPage = () => {
  /* dummy data 
  need to retrieve this data from backend */
  const events = [
    {
      event_id: 1,
      title: "Event 1",
      start: new Date("2023/11/2 09:30"),
      end: new Date("2023/11/2 10:30"),
    },
    {
      event_id: 2,
      title: "Event 2",
      start: new Date("2023/11/8 10:00"),
      end: new Date("2023/11/8 11:00"),
    },
  ];

  const location = useLocation();
  const isLoggedIn = location?.state?.params;

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
