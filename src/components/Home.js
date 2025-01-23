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
    // padding: "20px",
    background: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    textAlign: "justify",
    fontSize: "22px",
    fontWeight: "600",
    // marginBottom: "20px",
    color: "#064e3b",
  };

  const contentStyle = {
    textAlign: "justify",
    maxWidth: "800px",
    // margin: "10px auto",
    color: "#333",
    lineHeight: "1.6",
  };

  const buttonStyle = {
    padding: "12px 24px",
    backgroundColor: "#064e3b",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    alignSelf: "flex-end",
    marginTop: "20px",
    marginLeft: "85%",
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
        <ul>
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
          onClick={handleLoginClick}
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
};

export default Home;
