import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You can add form submission logic here, like sending data to a server
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        </div>
        <div className="form-group">
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Senha" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Ainda não tem uma conta? <Link to="/signUp"> Crie uma conta</Link></p>
    </div>
  );
}

export default LoginPage;
