import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
  // State to hold login form data
  const [loginData, setLoginData] = useState({
    phoneNo: '',
    password: ''
  });

  // State to handle success or error message
  const [message, setMessage] = useState('');

  // Handler to update login form data as the user types
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      // Send POST request to backend
      const res = await axios.post('http://localhost:5000/patients/login', loginData);
      // Display success message
      let patient_detail = res.data;
      console.log(patient_detail);
      
      setMessage('Login successful!');
      navigate('/patients/home',{state:{patient_detail}});
    } catch (error) {
      console.error('Error:', error);
      // Display error message
      setMessage('Invalid mobile number or password. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      {/* Display message */}
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNo"
            value={loginData.phoneNo}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
