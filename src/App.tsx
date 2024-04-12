
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/navbar/pages/Home';
import SignUp from './components/navbar/pages/signUp/SignUp';
import LoginPage from './components/navbar/pages/login/LoginPage';
import Dashboard from './components/navbar/pages/dashboard/Dashboard';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>

    </>
  )
}

export default App
