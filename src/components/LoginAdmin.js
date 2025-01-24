import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/login.css';
const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Fetch users from the backend


  const validate = (event) => {
    event.preventDefault();
    setErrorMessage(''); // Reset error message

    // Improved email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email is valid
    if (!emailPattern.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 6 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
      setErrorMessage('Password must be at least 6 characters long and include uppercase letters, numbers, and special characters.');
      return;
    }

    handleLogin();
  };

  const handleLogin = async () => {
    setLoading(true); // Set loading state
    try {
      // Replace with your actual login API endpoint
      const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
      console.log('Login successful:', response.data);
      navigate('/dashboard', { state: { loggedOut: false }}); // Navigate to the next page on successful login
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials and try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* <Headers /> */}
      <div className="m-10 p-4 max-w-sm bg-white border items-center border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className='main-content'>
          <div className="form-container">
            <p className="form-text">Login</p>
            <form onSubmit={validate}>
              {/* Input Field */}
              <input
                type="email"
                placeholder="Enter your email address"
                className="email-input w-full p-2 mb-4 border border-gray-300 rounded-lg"
                id='email'
                value={email}
                onChange={event => setEmail(event.target.value)}
                aria-label="Email"
                required
              />
              <input
                type="password"
                placeholder="Enter your password"
                className="email-input w-full p-2 mb-4 border border-gray-300 rounded-lg"
                id='password'
                value={password}
                onChange={event => setPassword(event.target.value)}
                aria-label="Password"
                required
              />
              {/* Error Message */}
              {errorMessage && <p className="text-red-500 mb-4" style={{ color: 'red', fontSize: '10px' }}>{errorMessage}</p>}
              {/* Continue Button */}
              <button 
                type="submit" 
                className={`continue-button w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'CONTINUE'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}; 

export default Login;