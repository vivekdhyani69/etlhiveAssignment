import React, { useState } from 'react';
import axios from 'axios';
import './FormStyle.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    email : ''
  });
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', formData);
      alert(response.data.message);
   // Navigate to the login route on successful signup
   navigate('/login');
    } catch (err) {
      setError(err.response.data.error);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email"
          required
        />
         <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
        <p>Already Register!<a href="/login"> Please login </a></p>
      </form>
    </div>
  );
};

export default Register;
