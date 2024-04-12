import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css'; // Import the CSS file for styling

const NavBarUser: React.FC = () => {
  const history = useNavigate();

  const handleLogout = () => {
    // Clear localStorage and redirect to login page
    localStorage.clear();
    history('/login');
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