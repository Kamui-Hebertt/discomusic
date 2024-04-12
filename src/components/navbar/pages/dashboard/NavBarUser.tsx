import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css'; // Import the CSS file for styling
import axios from 'axios';

const NavBarUser: React.FC = () => {
  const history = useNavigate();

  const handleLogout = async () => {
    // Clear localStorage and redirect to login page
    const token = localStorage.getItem("tk");
  
    try {
      const response = await axios.post(
        'https://discomusic-serverside.onrender.com/api/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200 || response.status === 201) {
        localStorage.removeItem("tk");
        localStorage.removeItem("id");
        console.log(response);
        history('/login');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle error if needed
    }
  };
  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="logo">Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default NavBarUser;