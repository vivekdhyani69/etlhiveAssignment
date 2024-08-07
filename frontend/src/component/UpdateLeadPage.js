import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateLeadPage.css'; // Import CSS for styling

const UpdateLeadPage = () => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [product, setProduct] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://etlhive-assignment-api.vercel.app/api/leads/getSpecificLead/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const leadData = response.data.leads;
        setLead(leadData);
        setEmail(leadData.email);
        setName(leadData.name);
        setNumber(leadData.number);
        setProduct(leadData.product);
      } catch (err) {
        setError('Failed to fetch lead details');
        console.error(err);
      }
    };

    fetchLead();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve token from local storage

    try {
      await axios.put(`https://etlhive-assignment-api.vercel.app/api/leads/update/${id}`, { email, name, number, product }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate(`/home`); // Redirect to home page or other relevant page
    } catch (err) {
      setError('Failed to update lead');
      console.error(err);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="update-lead-container">
      <h2>Update Lead</h2>
      {lead && (
        <form onSubmit={handleSubmit} className="update-lead-form">
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
          <button type="submit">Update Lead</button>
        </form>
      )}
    </div>
  );
};

export default UpdateLeadPage;
