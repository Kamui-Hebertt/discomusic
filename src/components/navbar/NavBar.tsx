import React from 'react';
import './NavBar.css'; 

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/signUp">Crie uma conta</a></li>
        <li><a href="/about">Sobre</a></li>
        <li><a href="/contact">Contato</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;
