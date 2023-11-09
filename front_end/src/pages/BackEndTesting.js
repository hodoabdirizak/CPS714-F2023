import React, { useState } from 'react';

export const BackEndTesting = () => {
  const [returnedData, setReturnedData] = useState(['Some data']);
  const [newUserAccount, setUserAccount] = useState({User_id: 0, Email: '', Full_name: '', 
                                                  Phone_number: 0, Pronouns: '', Account_type: ''});

  const setInput = (e) => {
    const {name, value} = e.target;
    console.log(name, value);
    if (name === 'User_id' || name === 'Phone_number'){
      console.log('Convert to number type')
      setUserAccount(prevState => ({
        ...prevState,
        [name]: parseInt(value)
      }));
      return;
    }
    // Return value as-is
    setUserAccount(prevState => ({
      ...prevState,
      [name]: value
    }));
    return;
  }

  const fetchAccounts = async () => {
    await fetch('/api/account/getaccounts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }


  const fetchAccountData = async () => {
    await fetch('/api/account/getaccountbyname', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: newUserAccount.Full_name
      })
    })
  }

  
  const addAccount = async () => {
    await fetch('/api/account/addaccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...newUserAccount
      })
    })
  }

  return (
    <div>
      <h1>Back-end Testing page</h1>
      <input type="number" name="User_id" placeholder="User_id" onChange={setInput}></input>
      <input name="Email" placeholder="Email" onChange={setInput}></input>
      <input name="Full_name" placeholder="Full_name" onChange={setInput}></input>
      <input type="number" name="Phone_number" placeholder="Phone_number" onChange={setInput}></input>
      <input name="Pronouns" placeholder="Pronouns" onChange={setInput}></input>
      <input name="Account_type" placeholder="Account_type" onChange={setInput}></input>
      <button onClick={() => fetchAccounts()}>Fetch Data About All Users</button>
      <button onClick={() => fetchAccountData()}>Fetch Data About A User</button>
      <button onClick={() => addAccount()}>Add User Account</button>
    </div>
  );
}