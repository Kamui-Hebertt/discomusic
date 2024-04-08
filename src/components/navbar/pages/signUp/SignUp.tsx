import React, { useState } from 'react';
import './SignUpPage.css';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    nickname: '',
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
    <div className="signup-container">
      <h2>Crie Uma Conta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Nome" required />
        </div>
        <div className="form-group">
          <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} placeholder="Nickname" required />
        </div>
        <div className="form-group">
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        </div>
        <div className="form-group">
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Senha" required />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default SignUp;
