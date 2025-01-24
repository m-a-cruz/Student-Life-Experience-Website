import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/headerstyle.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State to track login status
  const [loggedIn, setLoggedIn] = useState(false);

  // Check for `loggedOut` flag from navigation state
  const { loggedOut } = location.state || {};

  useEffect(() => {
    // If navigated with `loggedOut`, ensure the login state reflects this
    if (loggedOut !== undefined) {
      setLoggedIn(!loggedOut);
    }
  }, [loggedOut]);

  // Handle login button click (redirect to login interface)
  const handleLoginClick = () => {
    navigate('/login/admin'); // Navigate to the login interface
  };

  // Handle logout button click
  const handleLogoutClick = () => {
    setLoggedIn(false); // Update state to logged out
    navigate('/home', { state: { loggedOut: true } }); // Navigate to home with `loggedOut` flag
  };

  // Navigate to home when clicking the logo
  const handleLogoClick = () => {
    navigate('/home');
  };

  return (
    <nav className="header-nav">
      <div className="header-container">
        {/* Logo Section */}
        <div className="header-logo">
          <img src="/ncfLogo1.png" alt="Logo" className="logo-image" onClick={handleLogoClick} />
        </div>
        {/* Login/Logout Button Section */}
        <div className="header-actions">
          {loggedIn ? (
            <button className="logout-button" onClick={handleLogoutClick}>
              LOGOUT
            </button>
          ) : (
            <button className="logout-button" onClick={handleLoginClick}>
              LOGIN
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
