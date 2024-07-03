import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddItem = ({ addItem }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('Nepal'); 
  
  const [profilePicture, setProfilePicture] = useState(null);
  const [countries, setCountries] = useState([]);


  useEffect(() => {
    const fetchCountries = async () => {
      const apiUrl = 'https://restcountries.com/v3.1/all';
      const proxyUrl = 'https://api.allorigins.win/get?url=';
  
      try {
        const response = await axios.get(proxyUrl + encodeURIComponent(apiUrl));
        const data = response.data.contents;
        const parsedData = JSON.parse(data);
        setCountries(parsedData);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);
  
  
  

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phoneNumber) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Invalid email format.');
      return;
    }
    if (!/^\d{7,}$/.test(phoneNumber)) {
      alert('Phone number must be at least 7 digits.');
      return;
    }
    if (profilePicture && !profilePicture.type.includes('png')) {
      alert('Profile picture must be a PNG file.');
      return;
    }

    const newItem = {
      name,
      email,
      phoneNumber,
      dob,
      city,
      district,
      province,
      country,
      profilePicture,
    };
    addItem(newItem);
    setName('');
    setEmail('');
    setPhoneNumber('');
    setDob('');
    setCity('');
    setDistrict('');
    setProvince('');
    setCountry('Nepal');
    setProfilePicture(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
      <input type="date" placeholder="DOB" value={dob} onChange={(e) => setDob(e.target.value)} />
      <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
      <input type="text" placeholder="District" value={district} onChange={(e) => setDistrict(e.target.value)} />
      <select value={province} onChange={(e) => setProvince(e.target.value)}>
        <option value="">Select Province</option>
        <option value="Province 1">Province 1</option>
        <option value="Province 2">Province 2</option>
        <option value="Province 3">Province 3</option>
        <option value="Province 4">Province 4</option>
        <option value="Province 5">Province 5</option>
        <option value="Province 6">Province 6</option>
        <option value="Province 7">Province 7</option>
      </select>
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        {countries.map((c) => (
          <option key={c.cca3} value={c.name.common}>{c.name.common}</option>
        ))}
      </select>
      <input type="file" accept=".png" onChange={(e) => setProfilePicture(e.target.files[0])} />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItem;
