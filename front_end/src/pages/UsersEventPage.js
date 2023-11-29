// pages/UsersEventsPage.js

import React from 'react'
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './UsersEventPage.css';

export const UsersEventPage = () => {
    const dispatch = useDispatch();
    
    /* dummy data */
    const events = [
      {
        id: 1,
        title: 'Harmony Fest',
        date: 'October 31, 2023',
        time: '6:00 PM - 10:00 PM',
        organizers: 'EAM Events',
        org_email: 'info.eventteam@gmail.com',
        capacity: 10450,
        event_type: 'Concert',
        catering: 'N/A',
        event_desc: 'Get ready for an unforgettable night of music and magic! Join us for a mesmerizing concert experience that transcends boundaries and elevates your senses. Immerse yourself in the soulful melodies of talented artists, feel the pulsating rhythms, and let the electric atmosphere ignite your passion for music.',
        venue: 'Scotiabank Arena',
        address: '40 Bay St., Toronto, ON M5J 2X2',
        imageUrl: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbmNlcnR8ZW58MHx8MHx8fDA%3D',
      },
      {
        id: 2,
        title: 'Networking Night',
        date: 'November 15, 2023',
        time: '8:00 PM - 10:00 PM',
        organizers: 'Admin Orgs',
        org_email: 'admin@eventplanninghub.com',
        capacity: 350,
        event_type: 'Conference',
        catering: 'N/A',
        event_desc: 'Dive into the future of your profession at our premier conference for professionals seeking inspiration and innovation. Join industry leaders, experts, and visionaries as they share insights, strategies, and the latest trends that will shape the landscape of your field.',
        venue: 'Metropolitan Conference Center',
        address: '123 Main Street, Cityville',
        imageUrl: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29uZmVyZW5jZXxlbnwwfHwwfHx8MA%3D%3D',
      },
      {
        id: 3,
        title: 'Art Discussion',
        date: 'December 5, 2023',
        time: '6:00 PM - 8:00 PM',
        organizers: 'Art Enthusiasts Society',
        org_email: 'info@artenthusiastssociety.org',
        capacity: 150,
        event_type: 'Discussion',
        catering: 'N/A',
        event_desc: 'Experience a visual feast as we showcase the works of talented artists from around the world. Join us for an evening of art appreciation, creativity, and cultural exploration.',
        venue: 'Gallery Harmony',
        address: '456 Creative Street, Artsville',
        imageUrl: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGV2ZW50fGVufDB8fDB8fHww',
      },
      {
        id: 4,
        title: 'TechInsight Summit',
        date: 'January 20, 2024',
        time: '6:00 PM - 8:00 PM',
        organizers: 'Tech Enthusiasts Forum',
        org_email: 'info@techenthusiastsforum.com',
        capacity: 150,
        event_type: 'Tech Talk',
        catering: 'N/A',
        event_desc: 'Join us for an insightful tech talk, where industry experts will delve into the latest advancements, trends, and innovations shaping the world of technology. Connect with fellow enthusiasts and broaden your knowledge in this dynamic and ever-evolving field.',
        venue: 'Innovation Tech Hub',
        address: '789 Tech Boulevard, Toronto',
        imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGV2ZW50fGVufDB8fDB8fHww',
      },
    ];
  
    return (
      <div className='users-event-page-container'>
        <Navbar/>
        <h1>Upcoming Events</h1>
        <div className="event-cards">
        {events.map((event) => (
          <Link
            key={event.id}
            to={`/event/${event.id}`} 
            onClick={() => dispatch({ type: 'SET_EVENT', payload: event })} >
            <EventCard event={event} />
          </Link>
        ))}
      </div>
      </div> 
    );
  }