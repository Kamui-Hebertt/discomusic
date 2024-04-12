import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import axios, { AxiosError } from 'axios';


const LoginPage: React.FC = () => {
  const history = useNavigate();

  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    interface ResponseData {
      error?: string;
      token: string;
      user: string;
      userId: number; 
    
    }

    
    
    try {
      if (formData.email.trim() === '' || formData.password.trim() === '') {
        throw new Error('Os campos não podem estar em branco.');
      }
    
      setLoading(true); // Start loading
    
      const response = await axios.post<ResponseData>(
        'https://discomusic-serverside.onrender.com/api/login',
        {
          email: formData.email,
          password: formData.password,
        }
      );
    
      console.log(response);
      if (response.status === 200) {
        toast.success('Login bem-sucedido!');

        console.log(response.data)
        localStorage.setItem("tk", response.data.token);
        localStorage.setItem('id', response.data.userId.toString());
        localStorage.setItem('authState', '1');
     
        // localStorage.setItem('userId', response.data.data.userId.toString());
        // Redirect to dashboard or home page after successful login
        history('/dashboard'); // Example: Redirect to dashboard
      } else {
        throw new Error('Não foi possível fazer login.');
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      // Check if error.response.data is defined before accessing error.response.data.error
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        toast.error(error.response.data.error as string);
      } else {
        toast.error("Ocorreu um erro ao fazer login.");
           localStorage.setItem('authState', '0');
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          </div>
          <div className="form-group">
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Senha" required />
          </div>
          <button type="submit" className={loading ? "loading-button" : ""}>
            {loading ? "Carregando..." : "Login"}
          </button>
        </form>
        <p>Ainda não tem uma conta? <Link to="/signUp">Crie uma conta</Link></p>
      </div>
    </>
  );
};

export default LoginPage;