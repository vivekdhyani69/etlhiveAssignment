import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://etlhive-assignment-api.vercel.app/api/users/forgot-password', { email });
      setMessage('Reset email sent, please check your inbox');
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="form-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        {message && <p className="message">{message}</p>}
        {error && <p className="error">{error}</p>}
        <button type="submit">Send Reset Link</button>
        <p>Not Signup! <a href = "/">Please Signup</a></p>
      </form>
    </div>
  );
};

export default ForgotPassword;
