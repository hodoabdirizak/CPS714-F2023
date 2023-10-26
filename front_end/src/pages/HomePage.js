// pages/HomePage.js
import Navbar from '../components/Navbar'; 
import CoverPhoto from '../assets/images/CoverPhoto.jpeg';
import './HomePage.css';

export const HomePage = () => {
    return (
        <div className='home-page-container'>
            <Navbar />
            <div className='background-image'>
                <img src={CoverPhoto} alt=''/>
            </div>
            <div className='content'>
                <h1>Socials, conferences, corporate events, workshops and <span style={{ color: '#8C6ACB' }}>more</span>.</h1>
                <h2>Trending events in <span style={{color: '#696969' }}>Toronto</span></h2>
            </div>
        </div>
    );
}