import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";

function Admin() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/getdata");
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const downloadCSV = () => {
    const csvHeaders = [
      "Email",
      "Engagement",
      "Video Number",
      "Video Type",
      "Video String",
      "Created At",
    ];

    const csvRows = userData.map((user) => [
      user.email,
      user.engagement,
      user.videoNumber,
      user.videoType,
      user.videostring,
      new Date(user.createdAt).toLocaleString(),
    ]);

    const csvContent =
      csvHeaders.join(",") +
      "\n" +
      csvRows.map((row) => row.join(",")).join("\n");

    // Create a Blob object
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "user_data.csv";
    document.body.appendChild(link);
    // Trigger the download
    link.click();

    // Clean up
    document.body.removeChild(link);
  };

  return (
    <div className="admin">
      <h1> User Data </h1> <button onClick={downloadCSV}> Download CSV </button>{" "}
      {/* Download button */}{" "}
      <div>
        {" "}
        {userData.map((user) => (
          <div key={user._id} className="admin-item">
            <p>
              <strong> Email: </strong> {user.email}{" "}
            </p>{" "}
            <p>
              <strong> Engagement: </strong> {user.engagement}{" "}
            </p>{" "}
            <p>
              <strong> Video Number: </strong> {user.videoNumber}{" "}
            </p>{" "}
            <p>
              <strong> Video Type: </strong> {user.videoType}{" "}
            </p>{" "}
            <p>
              <strong> Video String: </strong>{" "}
              <a
                href={user.videostring}
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.videostring}{" "}
              </a>{" "}
            </p>{" "}
            <p>
              <strong> Created At: </strong>{" "}
              {new Date(user.createdAt).toLocaleString()}{" "}
            </p>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
}

export default Admin;
