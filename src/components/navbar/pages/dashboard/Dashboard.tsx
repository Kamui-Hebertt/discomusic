import React, { useEffect, useState } from 'react';

import NavBarUser from './NavBarUser';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const history = useNavigate();
  const [dataMusic, setDataMusic] = useState<any[]>([]); // Ensure dataMusic is always initialized as an array

  const checkAuth = async () => {
    const token = localStorage.getItem("tk");
  
    if (!token) {
      history('/');
      return false;
    }
  
    try {
      const response = await axios.get('https://discomusic-serverside.onrender.com/api/checkLogin', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log(response.data);
      return true;
    } catch (error) {
      history('/');
    }
  };

  const getData = async () => {
    const id = localStorage.getItem("id");
    try {
      const response = await axios.get(`https://discomusic-serverside.onrender.com/api/music/user/${Number(id)}`);
      setDataMusic(response.data.data || []);
      console.log(response.data.data) // Set dataMusic to an empty array if response.data is falsy
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await checkAuth();
      await getData();
    };
    fetchData();
  }, []);

  return (
    <div className="home-container">
      <NavBarUser />
      <div className="home-content">
        <h1>Minhas Músicas</h1>
        {dataMusic.length === 0 ? (
          <p>Nenhuma música ainda.</p>
        ) : (
          <ul>
            {dataMusic.map((music: any) => ( // No need for optional chaining operator here
              <li key={music.id}>{music.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;