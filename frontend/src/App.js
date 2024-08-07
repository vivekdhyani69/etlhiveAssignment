
import './App.css';
import Register from './component/Register';
import Login from './component/Login';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import ForgotPassword from './component/ForgotPassword';
import ResetPassword from './component/ResetPassword';
import HomePage from './component/HomePage';
import CreateLeadPage from './component/CreateLeadPage';
import UpdateLeadPage from './component/UpdateLeadPage.js';
import Navbar from './component/Navbar.js';
import { useEffect, useState } from 'react';
function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(true);

  // useEffect(() => {
  //   // Check if token exists in localStorage
  //   const token = localStorage.getItem('token');
  //   if(!token){
  //     setIsAuthenticated(false);
  //   }
   
  // }, []);

  // if(!isAuthenticated){
  //   <p>Please login firstlly</p>
  // }
  const PrivateRoute = ({ element, ...rest }) => {
    const token = localStorage.getItem('token'); // Check for token in localStorage
  
    return token ? element : <Navigate to="/login" />;
  };
  return (
    <Router>
    <div className="app">

      <Navbar/>
      <Routes> 

        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/home" element={<PrivateRoute element={<HomePage />} />} />
          <Route path="/update-lead/:id" element={<PrivateRoute element={<UpdateLeadPage />} />} />
          <Route path="/create-lead" element={<PrivateRoute element={<CreateLeadPage />} />} /> {/* Add the route for CreateLeadPage */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
