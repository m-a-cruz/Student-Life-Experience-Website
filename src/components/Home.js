import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  // Shared Styles
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    minHeight: "100vh",
    background: "#f0f4f8",
    fontFamily: "Arial, sans-serif",
  };

  const contentStyle = {
    textAlign: "justify",
    maxWidth: "800px",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    color: "#333",
    lineHeight: "1.8",
  };

  const headingStyle = {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#064e3b",
  };

  const listStyle = {
    margin: "20px 0",
    paddingLeft: "20px",
  };

  const buttonStyle = {
    padding: "12px 24px",
    backgroundColor: "#064e3b",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
    alignSelf: "flex-end",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: "#056038",
    transform: "scale(1.05)",
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={headingStyle}>
          Consent of Data Subject to Collection and Processing of Personal Data
        </h1>
        <p>Dear Students,</p>
        <p>
          We'd like to know how your college experience this year affected your
          well-being, growth, and success in this last semester.
        </p>
        <p>
          Your perspective matters! Your honest answers will help us understand
          the needs and experiences of students like you, paving the way for a
          more enriching and meaningful school experience for everyone.
        </p>
        <p>
          By answering this survey tool, you hereby give consent as a Data
          Subject under the Implementing Rules and Regulations of the Data
          Privacy Act of 2012, its amendments, or equivalent succeeding laws,
          rules, and regulations. The following data will be collected by the
          College of Computer Studies:
        </p>
        <ul style={listStyle}>
          <li>Email Address</li>
          <li>Survey Responses</li>
        </ul>
        <p>
          Survey responses may be in English, Tagalog, Bicol, or a mixture of
          these languages. Feel free to share your concerns to help us improve
          the college's service delivery.
        </p>
        <p>Thank you for your participation.</p>
        <button
          aria-label="Confirm your consent to proceed"
          style={buttonStyle}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
            e.target.style.transform = buttonHoverStyle.transform;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = buttonStyle.backgroundColor;
            e.target.style.transform = "scale(1)";
          }}
          onClick={handleLoginClick}
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
};

export default Home;
