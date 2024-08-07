import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LeadDetails.css'; // Import CSS for styling

const HomePage = () => {
  const [allLeads, setAllLeads] = useState([]);
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  let timer = null; // Timer variable
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order
  // Function to handle delete operation
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      await axios.delete(`https://etlhive-assignment-api.vercel.app/api/leads/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Re-fetch the leads after deletion
      fetchLeads();
    } catch (err) {
      console.error('Failed to delete lead', err);
    }
  };

  // Function to fetch all leads
  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem('token');
      const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve user data from local storage

      const response = await axios.get(`https://etlhive-assignment-api.vercel.app/api/leads/getleads/${userData._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setAllLeads(response.data.leads);
      setLeads(response.data.leads); // Set the initial leads to display
    } catch (err) {
      setError('Failed to fetch leads');
      console.error(err);
    }
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.trim(); // Trim white spaces from the input
    setSearchQuery(query);

    // Clear existing timer
    if (timer) {
      clearTimeout(timer);
    }

    // Set a new timer
    timer = setTimeout(() => {
      if (query) {
        const filteredLeads = allLeads.filter(lead =>
          lead.email.toLowerCase().includes(query.toLowerCase()) ||
          lead.name.toLowerCase().includes(query.toLowerCase()) ||
          lead.number.includes(query) ||
          lead.product.toLowerCase().includes(query.toLowerCase())
        );
        setLeads(filteredLeads);
      } else {
        setLeads(allLeads);
      }
    }, 2000); // Delay of 2 seconds
  };
  

  useEffect(() => {
    fetchLeads();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }
// Function to handle sorting order change
 // Function to handle sorting order change
 const handleSortOrderChange = async (order) => {
    setSortOrder(order);

    try {
      const token = localStorage.getItem('token');
      const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve user data from local storage

      const response = await axios.get(`https://etlhive-assignment-api.vercel.app/api/leads/sort/${userData._id}?sortBy=${order}`);

      setLeads(response.data.leads); // Update leads with sorted data
    } catch (err) {
      setError('Failed to fetch sorted leads');
      console.error(err);
    }
  };



  return (
    <div className="lead-details-container">
      <h2>Leads Details</h2>
      <div style={{display:'flex'}}>
      <input
        style={{ padding: '1%' }}
        placeholder="Search Leads"
        value={searchQuery}
        onChange={handleSearchChange}
      />
       <div className="sort-buttons" style={{display:'flex',marginLeft:'3%'}}>
        <button onClick={() => handleSortOrderChange('asc')} className="sort-button">Sort Name Ascending</button>
        <button style={{marginLeft:'2%'}} onClick={() => handleSortOrderChange('desc')} className="sort-button">Sort Name Descending</button>
      </div>
      </div>
      <table className="lead-details-table">
        <thead>
          <tr>
            <th>ID</th> {/* Added ID column */}
            <th>Email</th>
            <th>Name</th>
            <th>Number</th>
            <th>Product</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.length > 0 ? (
            leads.map((lead, index) => (
              <tr key={lead._id}>
                <td>{index + 1}</td> {/* Display ID as index + 1 */}
                <td>{lead.email}</td>
                <td>{lead.name}</td>
                <td>{lead.number}</td>
                <td>{lead.product}</td>
                <td>
                  <div className="button-container">
                    <Link to={`/update-lead/${lead._id}`} className="button update-button">Update</Link>
                    <button onClick={() => handleDelete(lead._id)} className="button delete-button">Delete</button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="empty-table">No leads available!</td> {/* Adjusted colspan */}
            </tr>
          )}
        </tbody>
      </table>
      <Link to="/create-lead">
        <button className="back-button">Create Lead</button>
      </Link>
    </div>
  );
};

export default HomePage;
