import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateLeadPage.css'; // Import CSS for styling

const CreateLeadPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [product, setProduct] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve token from local storage

    try {
    
      await axios.post('https://etlhive-assignment-api.vercel.app/api/leads/createLeads', { email, name, number, product, userId : userData?._id }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate(`/home`)
    } catch (err) {
      setError('Failed to create lead');
      console.error(err);
    }
  };

  return (
    <div className="create-lead-container">
      <h2>Create New Lead</h2>
      <form onSubmit={handleSubmit} className="create-lead-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Number"
          required
        />
        <select
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          required
        >
          <option value="" disabled>Select a product</option>
          <option value="Digital Dreams">Digital Dreams</option>
          <option value="Idea Emporium">Idea Emporium</option>
          <option value="Gizmo Generation">Gizmo Generation.</option>
        </select>
        {error && <p className="error">{error}</p>}
        <button type="submit">Create Lead</button>
      </form>
    </div>
  );
};

export default CreateLeadPage;
