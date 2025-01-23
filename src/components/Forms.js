import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Forms = () => {
    const Questions = [
        { ID: 1, Question: "Please select your program study.", choicesType: "radio", Choices: ["BS Computer Science", "BS Information Systems"] },
        { ID: 2, Question: "Please select your year level.", choicesType: "radio", Choices: ["1st year", "2nd year", "3rd year", "4th year"] },
        { ID: 3, Question: "What is your status as a student? Please select all that applies.", choicesType: "checkbox", Choices: ["Regular student", "Irregular student", "Shiftee", "Transferee", "Returnee", "Working student", "Scholar", "Student assistant"] },
        { ID: 4, Question: "Overall, how satisfied are you with your college experience this semester.", choicesType: "radio", Choices: ["Very satisfied", "Satisfied", "Dissatisfied", "Very dissatisfied"] },
        { ID: 5, Question: "Which aspects of your college experience contributed to your personal growth? Select all that apply.", choicesType: "checkbox", Choices: ["Academic courses", "Extracurricular activities", "Faculty interaction", "Peer interaction", "Campus facilities", "Support services"] },
        { ID: 6, Question: "What challenges did you face this semester? Select all that apply.", choicesType: "checkbox", Choices: ["Academic workload", "Time management", "Financial issues", "Personal issues", "Lack of support services", "Health-related issues"] },
        { ID: 7, Question: "Did your overall well-being improve during this semester?", choicesType: "radio", Choices: ["Significantly improved", "Somewhat improved", "Remained the same", "Somewhat worsened", "Significantly worsened"] },
        { ID: 8, Question: "How supported did you feel by the college in achieving your academic and personal goals?", choicesType: "radio", Choices: ["Very supported", "Somewhat supported", "Supported", "Not supported"] },
        { ID: 9, Question: "Please share any specific instance or event at the college that had a significant impact on your well-being.", choicesType: "text-box" },
        { ID: 10, Question: "On a scale of 1 to 5, how satisfied are you with your teaching and learning experience in college?", choicesType: "radio", Choices: ['1','2','3','4','5'] },
        { ID: 11, Question: "On a scale of 1 to 5, how satisfied are you with the facilities offered by the college?", choicesType: "radio", Choices: ['1','2','3','4','5'] },
        { ID: 12, Question: "How could the college improve your experience in the next semester?", choicesType: "text-box" },
      ];

  const navigate = useNavigate();
  const token = localStorage.getItem("email");

  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState({});
  const questionsPerPage = 3;

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = Questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const isCurrentPageValid = () => {
    return currentQuestions.every((item) => {
      const answer = answers[item.ID];
      if (item.choicesType === "checkbox") {
        return answer && answer.length > 0;
      }
      return !!answer;
    });
  };

  const handleChange = (e, id) => {
    const { value, type, checked } = e.target;
    setAnswers((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers };
      if (type === "checkbox") {
        const currentSelection = updatedAnswers[id] || [];
        updatedAnswers[id] = checked
          ? [...currentSelection, value]
          : currentSelection.filter((item) => item !== value);
      } else {
        updatedAnswers[id] = value;
      }
      return updatedAnswers;
    });
  };

  const nextPage = () => {
    if (isCurrentPageValid()) { 
      setCurrentPage((prev) => prev + 1);
    } else {
      alert("Please fill in all the questions before proceeding.");
    }
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const getFormattedAnswers = () => {
    return Object.entries(answers).reduce((acc, [id, answer]) => {
      acc[id] = Array.isArray(answer) ? answer.join(", ") : answer;
      return acc;
    }, {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedAnswers = getFormattedAnswers();

    try {
      await axios.post("http://127.0.0.1:5000/save-data", formattedAnswers);
      console.log("Form submitted successfully.");
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    try {
      await axios.put("http://127.0.0.1:5000/update-data", { email: token });
      console.log("User data updated successfully.");
      localStorage.removeItem("email");
      navigate("/home");
      alert("Thank you for participating. Your response has been recorded.");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
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
    marginTop: "10px",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#f9f9f9" }}>
      <form style={{ width: "100%", maxWidth: "800px" }}>
        {currentQuestions.map((item) => (
          <div key={item.ID}>
            <p style={{ fontSize: "16px", fontWeight: "500", marginBottom: "1px" }}>{item.Question}</p>
            {item.choicesType === "radio" &&
              item.Choices.map((choice, idx) => (
                <label key={idx} style={{ display: "block", marginBottom: "5px" }}>
                  <input
                    type="radio"
                    name={`question-${item.ID}`}
                    value={choice}
                    checked={answers[item.ID] === choice}
                    onChange={(e) => handleChange(e, item.ID)}
                    style={{ marginRight: "8px" }}
                  />
                  {choice}
                </label>
              ))}
            {item.choicesType === "checkbox" &&
              item.Choices.map((choice, idx) => (
                <label key={idx} style={{ display: "block", marginBottom: "5px" }}>
                  <input
                    type="checkbox"
                    value={choice}
                    checked={answers[item.ID]?.includes(choice)}
                    onChange={(e) => handleChange(e, item.ID)}
                    style={{ marginRight: "8px" }}
                  />
                  {choice}
                </label>
              ))}
            {item.choicesType === "text-box" && (
              <textarea
                value={answers[item.ID] || ""}
                onChange={(e) => handleChange(e, item.ID)}
                placeholder="Type your response"
                style={{ width: "100%", height: "80px", border: "1px solid #ccc", padding: "10px" }}
              />
            )}
          </div>
        ))}
       
      </form>
      <div style={{ display: "flex", justifyContent: "space-between",  width: "800px", marginTop: '10px' }}>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            style={{ ...buttonStyle, backgroundColor: currentPage === 1 ? "#ccc" : "#064e3b" }}
          >
            Previous
          </button>
          {currentPage === Math.ceil(Questions.length / questionsPerPage) ? (
            <button onClick={handleSubmit} style={{ ...buttonStyle, backgroundColor: "#064e3b" }}>
              Submit
            </button>
          ) : (
            <button
            onClick={nextPage}
            style={{
              ...buttonStyle,
              backgroundColor: isCurrentPageValid() ? "#064e3b" : "#ccc",
              cursor: isCurrentPageValid() ? "pointer" : "not-allowed",
              }}
            >
              Continue
            </button>
          )}
        </div>
    </div>
  );
};

export default Forms;
