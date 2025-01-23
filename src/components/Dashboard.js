import React, { useEffect, useState } from "react";

// Add styles for the dashboard
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },
  chartGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", // Responsive grid for charts
    gap: "20px", // Space between charts
    width: "100%",
    maxWidth: "1000px", // Set max width for the grid
  },
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "15px",
    textAlign: "center",
  },
  chartImage: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
  },
  loading: {
    fontSize: "20px",
    color: "#555",
  },
  spinner: {
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #3498db",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
  },
};

const Dashboard = () => {
  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCharts()
    setInterval(fetchCharts, 20000);
  }, []);

  const fetchCharts = async () => {
    fetch("http://127.0.0.1:5000/get-charts")
      .then((response) => response.json())
      .then((data) => {
        setCharts([]);
        setCharts(data.charts); // Set the Base64-encoded charts
        console.log(charts)
        setLoading(false); // Hide the loading spinner once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching charts:", error);
        setError("Failed to load charts. Please try again later.");
        setLoading(false);
      });
  }



  const Sections = {
    1: {"Title": "Demographics", "Content": ["Q1", "Q2", "Q3",]},
    2: {"Title": "Experience", "Content": ["Q4", "Q5",]},
    3: {"Title": "Challenges", "Content": ["Q6", "Q7", "Q9"]},
    4: {"Title": "Satisfaction", "Content": ["Q8", "Q10", "Q11", "Q12"]},
  }

  return (
    <div style={styles.container}>
       <section>
            {Object.keys(Sections).map((key) => (
                <div key={key}>
                {loading ? (
                    <div style={styles.spinner}></div>
                ) : error ? (
                    <p style={styles.loading}>{error}</p>
                ) : charts.length > 0 ? (
                    <div>
                    <h2>{Sections[key]["Title"]}</h2>
                    <div style={styles.chartGrid}>
                        {Sections[key]["Content"].map((item, sec_index) => (
                        <div key={sec_index}>
                            {charts.map((chart, index) => 
                            chart.column === item ? (
                                <div key={index} style={styles.chartContainer}>
                                <img
                                    src={`data:image/png;base64,${chart.image}`}
                                    alt={`Pie Chart ${index + 1}`}
                                    style={styles.chartImage}
                                />
                                </div>
                            ) : null
                            )}
                        </div>
                        ))}
                    </div>
                    </div>
                ) : (
                    <p style={styles.loading}>No charts available</p>
                )}
                </div>
            ))}
        </section>
    </div>
  );
}

export default Dashboard;
