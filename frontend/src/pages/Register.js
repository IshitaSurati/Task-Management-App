import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    try {
      // Make API call to register the user
      const response = await axios.post('/api/auth/register', { name, email, password });
      // If registration is successful, redirect to the login page
      history.push('/login');
    } catch (error) {
      // Handle registration errors (e.g., user already exists)
      setErrorMessage('Registration failed! Please try again.');
    }
  };

  return (
    <div className="w-50 mx-auto mt-5">
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleRegister}>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-3">Register</button>
      </form>
      <p className="mt-3 text-center">
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
  
}

export default Register;
