import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import your CSS file for styling

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleLogout = () => {
    // Clear user data and token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">EtlHive</Link>
        <ul className="navbar-menu">
          <li><Link to="/home" className="navbar-link">Home</Link></li>
          <li><Link to="/home" className="navbar-link">About</Link></li>
          <li><Link to="/home" className="navbar-link">Contact</Link></li>
        </ul>
        {
            token ?  <button className="navbar-logout"  onClick={handleLogout}>logout</button>
            :
<button className="navbar-logout">Login</button>
        }
        
      </div>
    </nav>
  );
};

export default Navbar;
