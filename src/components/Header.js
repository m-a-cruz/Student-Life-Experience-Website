import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/headerstyle.css'; 

const Header = () => {
  const navigate = useNavigate(); 

  const handleLoginClick = () => {
    navigate('/login/admin'); 
  };


  const home = () => {
    navigate('/home');
  };

  return (
    <nav className="header-nav">
      <div className="header-container">
        {/* Logo Section */}
        <div className="header-logo">
          <img src="/ncfLogo1.png" alt="Logo" className="logo-image" onClick={home}/>
        </div>
        {/* Login Button Section */}
        <div className="header-actions">
          <button className="login-button" onClick={handleLoginClick}>LOGIN</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
