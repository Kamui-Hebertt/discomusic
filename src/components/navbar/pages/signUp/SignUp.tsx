import React, { useState } from 'react';
import './SignUpPage.css';
import axios from 'axios';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    nickname: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false); // State to track loading status

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    try {
      if (
        formData.firstName.trim() === '' ||
        formData.nickname.trim() === '' ||
        formData.email.trim() === '' ||
        formData.password.trim() === ''
      ) {
        throw new Error('Os campos não podem estar em branco.');
      }
    
      setLoading(true); // Start loading
    
      const response = await axios.post(
        'https://discomusic-serverside.onrender.com/api/registerNewUser',
        {
          name: formData.firstName,
          nickname: formData.nickname,
          email: formData.email,
          password: formData.password,
        }
      );
    
      console.log(response);
      if (response.status === 201 || response.status === 200) {
        toast.success('Conta criada com sucesso!');
        setTimeout(() => {
          window.location.href = '/login'; 
        }, 3000);

      } else {
        throw new Error('Não foi possível registrar a conta.');
      }
    } catch (error) {
      console.error("Não foi possível registrar a conta:", error);
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error as string);
      } else {
        toast.error("Ocorreu um erro ao processar a solicitação.");
      }
    } finally {
      setLoading(false); // Stop loading
    }

  }

  return (
    <>
      <ToastContainer />
      <div className="signup-container">
        <h2>Crie Uma Conta</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Nome"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="Nickname"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Senha"
              required
            />
          </div>
          <button type="submit" className={loading ? "loading-button" : ""}>
            {loading ? "Carregando..." : "Registrar"}
          </button>
        </form>
      </div>
    </>
  );
};


export default SignUp;
