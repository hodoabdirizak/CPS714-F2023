// pages/HomePage.js

// import React, { useState } from 'react';
import Navbar from '../components/Navbar'; 
import CoverPhoto from '../assets/images/CoverPhoto.jpeg';
import EventCard from '../components/EventCard';
import './HomePage.css';

/* dummy data 
need to retrieve this data from backend */
const events = [
    {
      id: 1,
      title: 'Event 1',
      date: 'October 31, 2023',
      venue: 'Venue 1',
      imageUrl: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbmNlcnR8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: 2,
      title: 'Event 2',
      date: 'November 15, 2023',
      venue: 'Venue 2',
      imageUrl: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29uZmVyZW5jZXxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      id: 3,
      title: 'Event 3',
      date: 'December 5, 2023',
      venue: 'Venue 3',
      imageUrl: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGV2ZW50fGVufDB8fDB8fHww',
    },
    {
      id: 4,
      title: 'Event 4',
      date: 'January 20, 2024',
      venue: 'Venue 4',
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGV2ZW50fGVufDB8fDB8fHww',
    },
  ];


export const HomePage = () => {
    // const [isLoggedIn] = useState(false);

    return (
        <div className='home-page-container'>
            {/* <Navbar isLoggedIn={isLoggedIn} /> */}
            <Navbar/>
            <div className='background-image'>
                <img src={CoverPhoto} alt=''/>
            </div>
            <div className='content'>
                <h1>Socials, conferences, corporate events, workshops and <span style={{ color: '#8C6ACB' }}>more</span>.</h1>
                <h2>Trending events in <span style={{color: '#696969' }}>Toronto</span></h2>
                <div className="event-cards">
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </div>
    );
}