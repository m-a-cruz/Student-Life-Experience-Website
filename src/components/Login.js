import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/login.css';

const Login = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Fetch users from the backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/fetch-data');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Validate the email input and check if the user exists
  const validate = (event) => {
    event.preventDefault();
    setErrorMessage(''); // Reset error message

    // Email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email is valid
    if (!emailPattern.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const user = users.find((user) => user['Email Address'] === email);
    if (user) {
      if (user.Status === "Active" && user['Remarks (Yes/No)'] === "No") {
        // Save the user id in local storage and navigate to the forms page
        localStorage.setItem('email', user['Email Address']);
        navigate('/forms');
      } else if (user.Status !== "Active") {
        setErrorMessage('User  details do not exist!');
        navigate('/');
      } else if (user.Status === "Active" && user['Remarks (Yes/No)'] === "Yes") {
        setErrorMessage('User  has already taken the survey!');
      }
    } else {
      setErrorMessage('Invalid Gbox email account!');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="m-10 p-4 max-w-sm bg-white border items-center border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className='main-content'>
          <div className="form-container">
            <p className="form-text">Please enter your email address.</p>
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
              {/* Error Message */}
              {errorMessage && <p className="text-red-500 mb-4" style={{ color: 'red',  fontSize: '16px', }}>{errorMessage}</p>}
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