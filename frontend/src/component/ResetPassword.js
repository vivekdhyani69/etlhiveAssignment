import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/users/reset-password/${token}`, { password });
      setMessage('Password has been reset successfully');
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="form-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          required
        />
        {message && <p className="message">{message}</p>}
        {error && <p className="error">{error}</p>}
        <button type="submit">Reset Password</button>
        <p>Not Signup! <a href = "/">Please Signup</a></p>
      </form>
    </div>
  );
};

export default ResetPassword;
