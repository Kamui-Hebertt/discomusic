import React from 'react';
import NavBar from '../NavBar';
import './Home.css'; // Importe o arquivo CSS para estilização

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <NavBar />
      <div className="home-content">
        <h1>Bem-vindo ao Disco Music</h1>
        <p>Compartilhe sua música com o mundo!</p>
        <button className="cta-button">Explorar Músicas</button>
      </div>
    </div>
  );
}

export default Home;
