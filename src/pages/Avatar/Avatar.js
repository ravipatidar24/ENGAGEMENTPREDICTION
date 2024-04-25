// import React, { useState, useEffect } from "react";
// import ReactPlayer from "react-player";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./Avatar.css";

// const AvatarPage = () => {
//   const [avatarData, setAvatarData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [submitting, setSubmitting] = useState(false);
//   const userMail = localStorage.getItem("userMail");
//   const tempString = localStorage.getItem("tempstring");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:5000/LoginData/getavatar"
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const data = await response.json();
//         setAvatarData(data);
//         setSelectedOptions(new Array(data.length).fill(""));
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleOptionChange = (index, option) => {
//     const newSelectedOptions = [...selectedOptions];
//     newSelectedOptions[index] = option;
//     setSelectedOptions(newSelectedOptions);
//   };

//   const handleSubmit = async (index) => {
//     try {
//       setSubmitting(true);
//       const response = await axios.post(
//         "http://localhost:5000/user/createdata",
//         {
//           email: userMail,
//           engagement: selectedOptions[index],
//           videoNumber: avatarData[index].videoNumber,
//           videoType: "Avatar",
//           videostring: avatarData[index].videoLink,
//         }
//       );
//       console.log("Data submitted successfully:", response.data);
//       window.alert("Data submitted successfully");
//     } catch (error) {
//       console.error("Failed to submit data:", error.response.data);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="avatar-page">
//       <Link to="/home" className="avatar-back-btn">
//         Back{" "}
//       </Link>{" "}
//       {loading && <p className="avatar-loading"> Loading... </p>}{" "}
//       {error && <p className="avatar-error"> Error: {error} </p>}{" "}
//       {!loading && !error && (
//         <div className="avatar-data">
//           {" "}
//           {avatarData.length === 0 ? (
//             <p className="avatar-no-data"> No data available </p>
//           ) : (
//             avatarData.map((video, index) => {
//               if (
//                 video.videoNumber === tempString[0] ||
//                 video.videoNumber === tempString[1]
//               ) {
//                 return (
//                   <div key={video._id} className="avatar-item">
//                     <p className="avatar-video-description">
//                       Video Description: {video.videoDescription}{" "}
//                     </p>{" "}
//                     <p className="avatar-video-description">
//                       Note: Double click on video to zoom{" "}
//                     </p>{" "}
//                     <div className="avatar-video">
//                       <ReactPlayer
//                         url={video.videoLink}
//                         width="800px"
//                         height="550px"
//                       />
//                     </div>{" "}
//                     <p className="avatar-engagement">
//                       Please select engagement after watching video:
//                     </p>{" "}
//                     <div className="options-container">
//                       <div className="option">
//                         <label>
//                           <input
//                             type="radio"
//                             name={`engagement-${index}`}
//                             value="Not Engaged"
//                             checked={selectedOptions[index] === "Not Engaged"}
//                             onChange={() =>
//                               handleOptionChange(index, "Not Engaged")
//                             }
//                           />
//                           Not Engaged(Rarely interested){" "}
//                         </label>{" "}
//                         <img src="/image1.png" alt="Not Engaged" />
//                       </div>{" "}
//                       <div className="option">
//                         <label>
//                           <input
//                             type="radio"
//                             name={`engagement-${index}`}
//                             value="Barely Engaged"
//                             checked={
//                               selectedOptions[index] === "Barely Engaged"
//                             }
//                             onChange={() =>
//                               handleOptionChange(index, "Barely Engaged")
//                             }
//                           />
//                           Barely Engaged(Little interest){" "}
//                         </label>{" "}
//                         <img src="/image2.png" alt="Barely Engaged" />
//                       </div>{" "}
//                       <div className="option">
//                         <label>
//                           <input
//                             type="radio"
//                             name={`engagement-${index}`}
//                             value="Engaged"
//                             checked={selectedOptions[index] === "Engaged"}
//                             onChange={() =>
//                               handleOptionChange(index, "Engaged")
//                             }
//                           />
//                           Engaged(Regularly interacts){" "}
//                         </label>{" "}
//                         <img src="/image3.png" alt="Engaged" />
//                       </div>{" "}
//                       <div className="option">
//                         <label>
//                           <input
//                             type="radio"
//                             name={`engagement-${index}`}
//                             value="Highly Engaged"
//                             checked={
//                               selectedOptions[index] === "Highly Engaged"
//                             }
//                             onChange={() =>
//                               handleOptionChange(index, "Highly Engaged")
//                             }
//                           />
//                           Highly Engaged(Actively involved){" "}
//                         </label>{" "}
//                         <img src="/image4.png" alt="Highly Engaged" />
//                       </div>{" "}
//                     </div>{" "}
//                     <button
//                       className="avatar-submit-btn"
//                       onClick={() => handleSubmit(index)}
//                       disabled={submitting}
//                     >
//                       {submitting ? "Submitting..." : "Submit"}{" "}
//                     </button>{" "}
//                     <hr className="avatar-hr" />
//                   </div>
//                 );
//               } else {
//                 return null;
//               }
//             })
//           )}{" "}
//         </div>
//       )}{" "}
//     </div>
//   );
// };

// export default AvatarPage;
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Avatar.css";

const AvatarPage = () => {
  const [avatarData, setAvatarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const userMail = localStorage.getItem("userMail");
  let tempString = localStorage.getItem("tempstring") || "0_0";
  let showNoVideosMessage = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/LoginData/getavatar"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setAvatarData(data);
        setSelectedOptions(new Array(data.length).fill(""));
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOptionChange = (index, option) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = option;
    setSelectedOptions(newSelectedOptions);
  };

  const handleSubmit = async (index) => {
    try {
      setSubmitting(true);
      const response = await axios.post(
        "http://localhost:5000/user/createdata",
        {
          email: userMail,
          engagement: selectedOptions[index],
          videoNumber: avatarData[index].videoNumber,
          videoType: "Avatar",
          videostring: avatarData[index].videoLink,
        }
      );
      console.log("Data submitted successfully:", response.data);
      window.alert("Data submitted successfully");
      // Update tempString to mark the video as submitted
      tempString = tempString.replace(avatarData[index].videoNumber, "0");
      localStorage.setItem("tempstring", tempString);
      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error("Failed to submit data:", error.response.data);
    } finally {
      setSubmitting(false);
    }
  };

  // Check if any video matches the condition
  for (let video of avatarData) {
    if (
      video.videoNumber === tempString[0] ||
      video.videoNumber === tempString[1]
    ) {
      showNoVideosMessage = false;
      break;
    }
  }

  return (
    <div className="avatar-page">
      <Link to="/home" className="avatar-back-btn">
        Back{" "}
      </Link>{" "}
      {loading && <p className="avatar-loading"> Loading... </p>}{" "}
      {error && <p className="avatar-error"> Error: {error} </p>}{" "}
      {!loading && !error && (
        <div className="avatar-data">
          {" "}
          {showNoVideosMessage ? (
            <p className="avatar-no-data">
              {" "}
              You have already watched all available videos.Thank you for your
              engagement!{" "}
            </p>
          ) : (
            avatarData.map((video, index) => {
              if (
                video.videoNumber === tempString[0] ||
                video.videoNumber === tempString[1]
              ) {
                return (
                  <div key={video._id} className="avatar-item">
                    <p className="avatar-video-description">
                      Video Description: {video.videoDescription}{" "}
                    </p>{" "}
                    <p className="avatar-video-description">
                      Note: Double click on video to zoom{" "}
                    </p>{" "}
                    <div className="avatar-video">
                      <ReactPlayer
                        url={video.videoLink}
                        width="800px"
                        height="550px"
                      />
                    </div>{" "}
                    <p className="avatar-engagement">
                      Please select engagement after watching the video:
                    </p>{" "}
                    <div className="options-container">
                      <div className="option">
                        <label>
                          <input
                            type="radio"
                            name={`engagement-${index}`}
                            value="Not Engaged"
                            checked={selectedOptions[index] === "Not Engaged"}
                            onChange={() =>
                              handleOptionChange(index, "Not Engaged")
                            }
                          />
                          Not Engaged(Rarely interested){" "}
                        </label>{" "}
                        <img src="/image1.png" alt="Not Engaged" />
                      </div>{" "}
                      <div className="option">
                        <label>
                          <input
                            type="radio"
                            name={`engagement-${index}`}
                            value="Barely Engaged"
                            checked={
                              selectedOptions[index] === "Barely Engaged"
                            }
                            onChange={() =>
                              handleOptionChange(index, "Barely Engaged")
                            }
                          />
                          Barely Engaged(Little interest){" "}
                        </label>{" "}
                        <img src="/image2.png" alt="Barely Engaged" />
                      </div>{" "}
                      <div className="option">
                        <label>
                          <input
                            type="radio"
                            name={`engagement-${index}`}
                            value="Engaged"
                            checked={selectedOptions[index] === "Engaged"}
                            onChange={() =>
                              handleOptionChange(index, "Engaged")
                            }
                          />
                          Engaged(Regularly interacts){" "}
                        </label>{" "}
                        <img src="/image3.png" alt="Engaged" />
                      </div>{" "}
                      <div className="option">
                        <label>
                          <input
                            type="radio"
                            name={`engagement-${index}`}
                            value="Highly Engaged"
                            checked={
                              selectedOptions[index] === "Highly Engaged"
                            }
                            onChange={() =>
                              handleOptionChange(index, "Highly Engaged")
                            }
                          />
                          Highly Engaged(Actively involved){" "}
                        </label>{" "}
                        <img src="/image4.png" alt="Highly Engaged" />
                      </div>{" "}
                    </div>{" "}
                    <button
                      className="avatar-submit-btn"
                      onClick={() => handleSubmit(index)}
                      disabled={submitting}
                    >
                      {submitting ? "Submitting..." : "Submit"}{" "}
                    </button>{" "}
                    <hr className="avatar-hr" />
                  </div>
                );
              } else {
                return null;
              }
            })
          )}{" "}
        </div>
      )}{" "}
    </div>
  );
};

export default AvatarPage;
