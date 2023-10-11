// pages/HomePage.js
import Navbar from '../components/Navbar'; 
import CoverPhoto from './../assets/images/Homepage-Cover-Page.jpeg';
import './HomePage.css';
export const HomePage = () => {
    return (
        <>
        <Navbar />
        <div style={{backgroundImage: `url(${CoverPhoto})`}}></div>
        {/* <div className="image-container">
            <img src={CoverPhoto} className="cropped-image" alt=""/>
        </div> */}
        <h1>Socials, conferences, corporate events, workshops and <span style={{ color: '#8C6ACB' }}>more</span>.</h1>
        <h2>Trending events in <span style={{color: '#696969' }}>Toronto</span></h2>
        </>
    )
}