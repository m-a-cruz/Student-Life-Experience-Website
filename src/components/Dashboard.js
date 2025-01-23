import React, { useEffect, useState } from "react";

// Styles for the dashboard
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
  },
  section: {
    width: "100%",
    maxWidth: "1200px",
    margin: "15px auto",
  },
  sectionTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#064e3b",
    margin: "20px 0",
    textAlign: "left",
    borderBottom: "2px solid #064e3b",
    paddingBottom: "10px",
  },
  chartGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", // 3 charts per row, dynamic
    gap: "20px",
    width: "100%",
  },
  chartContainer: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    height: "auto", // Ensure charts adjust their height proportionally
  },
  chartContainerHover: {
    transform: "scale(1.03)",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
  },
  chartImage: {
    width: "100%",
    height: "auto",
  },
  loading: {
    fontSize: "20px",
    color: "#6b7280",
    margin: "20px 0",
  },
  spinner: {
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #3498db",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 1s linear infinite",
    margin: "20px auto",
  },
  errorMessage: {
    color: "#d9534f",
    fontWeight: "bold",
    fontSize: "18px",
    margin: "20px 0",
  },
};

const Dashboard = () => {
  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetchCharts();
    fetchSections();
    const interval = setInterval(fetchCharts, 20000);
    return () => clearInterval(interval);
  }, []);

  const fetchCharts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get-charts");
      const data = await response.json();
      setCharts(data.charts || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching charts:", err);
      setError("Failed to load charts. Please try again later.");
      setLoading(false);
    }
  };

  const fetchSections = async () => {
    // Fetch dynamic sections from an API or data source, if needed.
    // Here, we just use the hardcoded values as an example.
    setSections([
      { id: 1, title: "Demographics", content: ["Q1", "Q2", "Q3"] },
      { id: 2, title: "Experience", content: ["Q4", "Q5"] },
      { id: 3, title: "Challenges", content: ["Q6", "Q7", "Q9"] },
      { id: 4, title: "Satisfaction", content: ["Q8", "Q10", "Q11", "Q12"] },
    ]);
  };

  return (
    <div style={styles.container}>
      {sections.length > 0 ? (
        sections.map((section) => (
          <section key={section.id} style={styles.section}>
            <h2 style={styles.sectionTitle}>{section.title}</h2>
            {loading ? (
              <div style={styles.spinner}></div>
            ) : error ? (
              <p style={styles.errorMessage}>{error}</p>
            ) : charts.length > 0 ? (
              <div style={styles.chartGrid}>
                {section.content.map((item) =>
                  charts
                    .filter((chart) => chart.column === item)
                    .map((chart, index) => (
                      <div
                        key={index}
                        style={styles.chartContainer}
                        onMouseEnter={(e) =>
                          Object.assign(e.currentTarget.style, styles.chartContainerHover)
                        }
                        onMouseLeave={(e) =>
                          Object.assign(e.currentTarget.style, {
                            transform: "scale(1)",
                            boxShadow: styles.chartContainer.boxShadow,
                          })
                        }
                      >
                        <img
                          src={`data:image/png;base64,${chart.image}`}
                          alt={`Chart for ${item}`}
                          style={styles.chartImage}
                        />
                      </div>
                    ))
                )}
              </div>
            ) : (
              <p style={styles.loading}>No charts available</p>
            )}
          </section>
        ))
      ) : (
        <p style={styles.loading}>No sections available</p>
      )}
    </div>
  );
};

export default Dashboard;
