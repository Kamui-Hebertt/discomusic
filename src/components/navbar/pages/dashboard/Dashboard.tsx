import React, { useEffect } from 'react';

import NavBarUser from './NavBarUser';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {

  const history = useNavigate();

  const checkAuth = async () => {
    const token = localStorage.getItem("tk");
  
    if (!token) {
      // Handle case where token is not available
      history('/');
      return false;
    }
  
    try {
      const response = await axios.get('https://discomusic-serverside.onrender.com/api/checkLogin', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Handle response from the server
      console.log(response.data);
      return true; // Return true if the token is valid
    } catch (error) {
      history('/');
      // Handle error
      // console.error('Error checking authentication:', error);
      // return false; // Return false if there's an error or token is invalid
    }
  };

  const getData = async () => {
    const id = localStorage.getItem("id");
    const response = await axios.get(`https://discomusic-serverside.onrender.com/api/music/user/${Number(id)}`);
    console.log(response);
  }
  useEffect(() => {
    checkAuth();
    getData();
  },[])

  return (
    <div className="home-container">
      <NavBarUser />
      <div className="home-content">
        <h1>Minhas Músicas</h1>


       
        {/* <button className="cta-button">Explorar Músicas</button> */}
      </div>
    </div>
  );
}

export default Dashboard;