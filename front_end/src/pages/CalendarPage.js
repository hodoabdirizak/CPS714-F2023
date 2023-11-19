
// pages/HomePage.js

import React from 'react';
import { useLocation } from "react-router-dom";
import Navbar from '../components/Navbar'; 
import './CalendarPage.css';
import { Scheduler } from "@aldabil/react-scheduler";

export const CalendarPage = () => {

  const events = [
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
