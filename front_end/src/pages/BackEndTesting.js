// pages/SignUpPage.js
import React, { useState } from 'react';

export const BackEndTesting = () => {
  const [returnedData, setReturnedData] = useState(['Some data']);
  
  // call to get data
  const getData = async (url) => {
    const newData = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => res.json());

    
    console.log(newData);
    setReturnedData(newData.result)
  }
  getData('/api');
  return (
    <div>
      <h1>Back-end Testing page</h1>
      {returnedData}
    </div>
  );
}