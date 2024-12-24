import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = { email, password };

    try {
      // Updated API endpoint
      const response = await axios.post('http://localhost:5000/api/auth/login', userData);
      console.log(response.data);

      // Display success toast notification
      toast.success('Login successful! Redirecting to dashboard...', {
        position: "top-right",
        autoClose: 3000, // Closes the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Store JWT token in localStorage
      localStorage.setItem('token', response.data.token);

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (err) {
      console.error("Login error:", err);

      // Display error toast notification
      toast.error('Invalid credentials. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <div className="card-body">
          <h2 className="card-title login-heading">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="label">Email address</label>
              <input
                type="email"
                className="form-control input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="label">Password</label>
              <input
                type="password"
                className="form-control input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn btn-primary submit-btn">
              Login
            </button>
          </form>
          <p className="signup-link">
            Don't have an account? <a href="/">Sign Up</a> {/* Link to signup page */}
          </p>
        </div>
      </div>

      {/* Toast container to display notifications */}
      <ToastContainer />
    </div>
  );
};

export default Login;
