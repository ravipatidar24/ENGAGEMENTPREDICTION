// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./Register.css";

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     name: "",
//     age: "",
//     residence: "",
//   });
//   const [registrationMessage, setRegistrationMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const getStringResponse = await axios.get(
//         "http://localhost:5000/LoginData/getstring"
//       );
//       const currentTempString = getStringResponse.data[0].temp;

//       localStorage.setItem("tempstring", currentTempString);

//       let newTempString;
//       switch (currentTempString) {
//         case "123456":
//           newTempString = "345612";
//           break;
//         case "345612":
//           newTempString = "561234";
//           break;
//         case "561234":
//           newTempString = "123456";
//           break;
//         default:
//           console.log("Invalid temp string:", currentTempString);
//           return;
//       }

//       const updateDataResponse = await axios.post(
//         "http://localhost:5000/LoginData/updatedata",
//         { temp: newTempString }
//       );

//       const registerResponse = await axios.post(
//         "http://localhost:5000/Logindata/create",
//         formData
//       );

//       localStorage.setItem("userMail", formData.email);
//       setRegistrationMessage("Registration successful");

//       navigate("/home");
//     } catch (error) {
//       console.error("Registration failed:", error.response.data);
//     }
//   };

//   return (
//     <div className="registerpage">
//       <Link to="/login" className="admin-button">
//         Admin{" "}
//       </Link>{" "}
//       <div className="register">
//         <header> UserInfo </header>{" "}
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="email"> Email: </label>{" "}
//             <input
//               type="email"
//               id="email"
//               className="register-input"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>{" "}
//           <div>
//             <label htmlFor="name"> Name: </label>{" "}
//             <input
//               type="text"
//               id="name"
//               className="register-input"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>{" "}
//           <div>
//             <label htmlFor="age"> Age: </label>{" "}
//             <input
//               type="number"
//               id="age"
//               className="register-input"
//               name="age"
//               value={formData.age}
//               onChange={handleChange}
//               required
//             />
//           </div>{" "}
//           <div>
//             <label htmlFor="residence"> Place of Residence: </label>{" "}
//             <input
//               type="text"
//               id="residence"
//               className="register-input"
//               name="residence"
//               value={formData.residence}
//               onChange={handleChange}
//               required
//             />
//           </div>{" "}
//           <button type="submit" className="next-button">
//             Next{" "}
//           </button>{" "}
//         </form>{" "}
//         {registrationMessage && (
//           <div className="registration-message"> {registrationMessage} </div>
//         )}{" "}
//       </div>{" "}
//     </div>
//   );
// };

// export default RegisterPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Register.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    age: "",
    residence: "",
  });
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!agreed) {
      alert("Please agree to the terms to proceed.");
      return;
    }

    setIsLoading(true); // Set loading to true while submitting

    try {
      const getStringResponse = await axios.get(
        "https://btpbackend.onrender.com/LoginData/getstring"
      );
      const currentTempString = getStringResponse.data[0].temp;

      localStorage.setItem("tempstring", currentTempString);

      let newTempString;
      switch (currentTempString) {
        case "123456":
          newTempString = "345612";
          break;
        case "345612":
          newTempString = "561234";
          break;
        case "561234":
          newTempString = "123456";
          break;
        default:
          console.log("Invalid temp string:", currentTempString);
          return;
      }

      const updateDataResponse = await axios.post(
        "https://btpbackend.onrender.com/LoginData/updatedata",
        { temp: newTempString }
      );

      const registerResponse = await axios.post(
        "https://btpbackend.onrender.com/Logindata/create",
        formData
      );

      localStorage.setItem("userMail", formData.email);
      setRegistrationMessage("Registration successful");

      navigate("/home");
    } catch (error) {
      console.error("Registration failed:", error.response.data);
    } finally {
      setIsLoading(false); // Set loading to false after submission completes
    }
  };

  return (
    <div className="registerpage">
      <Link to="/login" className="admin-button">
        Admin{" "}
      </Link>{" "}
      <div className="register">
        <header> UserInfo </header>{" "}
        {agreed ? (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email"> Email: </label>{" "}
              <input
                type="email"
                id="email"
                className="register-input"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>{" "}
            <div>
              <label htmlFor="name"> Name: </label>{" "}
              <input
                type="text"
                id="name"
                className="register-input"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>{" "}
            <div>
              <label htmlFor="age"> Age: </label>{" "}
              <input
                type="number"
                id="age"
                className="register-input"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>{" "}
            <div>
              <label htmlFor="residence"> Place of Residence: </label>{" "}
              <input
                type="text"
                id="residence"
                className="register-input"
                name="residence"
                value={formData.residence}
                onChange={handleChange}
                required
              />
            </div>{" "}
            <button type="submit" className="next-button" disabled={isLoading}>
              {" "}
              {isLoading ? "Submitting..." : "Next"}{" "}
            </button>{" "}
          </form>
        ) : (
          <div className="terms-agreement">
            <p>
              Before you proceed, it 's important to understand how your
              information will be used: By agreeing to take part, you 're
              allowing us to use the information we collect for academic and
              commercial research.This might involve things like analyzing the
              data, publishing our findings, or sharing them with other
              researchers or organizations.We want to assure you that your
              identity will always be kept private.Your personal details won 't
              be shared with anyone.{" "}
            </p>{" "}
            <input
              type="checkbox"
              id="agree-checkbox"
              onChange={() => setAgreed(!agreed)}
            />{" "}
            <label htmlFor="agree-checkbox">
              I agree to the terms and conditions{" "}
            </label>{" "}
          </div>
        )}{" "}
        {registrationMessage && (
          <div className="registration-message"> {registrationMessage} </div>
        )}{" "}
      </div>{" "}
    </div>
  );
};

export default RegisterPage;
