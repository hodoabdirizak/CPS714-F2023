import React, { useEffect } from 'react';

const Map = ({ address }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDigdmRb4bkqzGebVsl_ZyaSSZZwXZX6ic&libraries=places`;
    script.defer = true;
    script.async = true;

    script.onload = () => {
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 8,
            center: results[0].geometry.location,
          });

          new window.google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
          });
        } else {
          console.error('Geocode was not successful for the following reason: ' + status);
        }
      });
    };

    script.onerror = () => {
      console.error('Error loading Google Maps API script.');
    };


    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [address]);

  return <div id="map" style={{ height: '200px', width: '100%', marginBottom: '10px'}}></div>;
};

export default Map;
