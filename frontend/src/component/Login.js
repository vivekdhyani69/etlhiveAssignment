import React, { useState } from 'react';
import axios from 'axios';
import './FormStyle.css'; // Import the CSS file for styling
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [verified,setVerified] = useState(false)
  const [error, setError] = useState('');

  const handleChange = (e) => { 
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    }); 
  };
  function onChange(value) {
    setVerified(true)

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://sai-lovat.vercel.app/api/users/login', formData);

      alert('Login successful!' );
navigate(`/home`)
      JSON.stringify(localStorage.setItem('token',response.data?.token))
   // Convert the object to a JSON string
   console.log(response.data?.user)
localStorage.setItem('userData', JSON.stringify(response.data?.user));

    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        {error && <p className="error">{error}</p>}
        <ReCAPTCHA
    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
    onChange={onChange}
  />
        <button type="submit" style={{marginTop:'2%'}} disabled={!verified}>Login</button>
        <p>Not Signup! <a href = "/">Please Signup</a></p>
        <a href='/forgot-password'>Forgot Password</a>
      </form>
    </div>
  );
};

export default Login;
