import axios from "axios";
import React, { useEffect, useState } from "react";
import MainLayout from "../MainLayout";
import userImage from "../images/SM596414 (1).jpg";
import "../Styles/Userdata.css";
import { useNavigate } from "react-router-dom";
// import Dashboard from "./Dashboard";

const Userdata = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL
console.log(baseUrl);


  const auth = JSON.parse(localStorage.getItem("user"));
 
  const getUser = async () => {
    try {
      const response = await axios.get(`http://192.168.0.139:8000/user/getUser`, {
        headers: {
          Authorization: `bearer ${auth.token}`,
        },
      });
      console.log(response,"hello");
      
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (auth) 
    {
      getUser();
    } 
    else {
      navigate("/");
    }
  },[auth, getUser, navigate]);

  return (
    <div>
      <MainLayout>
      <div
          id="carouselExampleDark"
          className="carousel carousel-dark slide"
          data-bs-ride="carousel"
        >
          {/* <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={0}
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={1}
              aria-label="Slide 2"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={2}
              aria-label="Slide 3"
            />
          </div> */}
           <div className="carousel-inner h-50">
          <div className="carousel-item active" data-bs-interval={15000}>
            <img height={500}  src="https://s3.ap-south-1.amazonaws.com/awsimages.imagesbazaar.com/1200x1800-new/11164/SM351615.jpg" className="carousel-image d-block w-100" alt="..." />
          </div>
          <div className="carousel-item" data-bs-interval={15000}>
            <img height={500} src="https://s3.ap-south-1.amazonaws.com/awsimages.imagesbazaar.com/900x600/2595/20-SM98724.jpg" className="carousel-image d-block w-100" alt="..." />
          </div>
          <div className="carousel-item" data-bs-interval={15000}> 
            <img height={500} src="https://s3.ap-south-1.amazonaws.com/awsimages.imagesbazaar.com/900x600/5940/20-SM150261.jpg" className="carousel-image d-block w-100" alt="..." />
          </div>
        </div>
        
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" style={{color:"#000",fontSize:"18rem"}} aria-hidden="true" />
            <span className="visually-hidden" >Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* //User Data card */}
      <div className="row mt-5 mx-3">
          {data.map((item) => {
            return (
              <div className="col-md-4 col-lg-3 col-sm-6 p-2">
                <div className="card d-flex justify-content-center align-items-center card-style"   >
                  <img
                    className="card-img-top p-3 "
                    alt="userImage"
                    src={userImage}
                  />
                  <div className="card-body  justify-content-center align-content-center text-center" >
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text text-center">Female</p>
                    <p
                      className="card-text text-center"
                      style={{ fontSize: "12px" }}
                    >
                      {item.email}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </MainLayout>
    </div>
  );
};

export default Userdata;
// import React, { useState } from "react";

// const totalQuestions = 17; // Example total questions

// const ExamInterface = () => {
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [questionStatus, setQuestionStatus] = useState(
//     Array(totalQuestions).fill("notVisited")
//   );
//   const [currentQuestion, setCurrentQuestion] = useState(0); // Active question index

//   const questionData = [
//     {
//       id: 1,
//       question: "Sample Question 1",
//       options: [
//         "Option Number 1",
//         "Option Number 2",
//         "Option Number 3",
//         "Option Number 4",
//       ],
//     },
//     // Add more question objects here
//   ];

//   // Handle answer selection
//   const handleOptionSelect = (index) => {
//     setSelectedOptions((prev) => ({
//       ...prev,
//       [currentQuestion]: index, // Store selected option for current question
//     }));
//     // Update question status to "answered"
//     setQuestionStatus((prevStatus) =>
//       prevStatus.map((status, idx) =>
//         idx === currentQuestion ? "answered" : status
//       )
//     );
//   };

//   // Handle navigation
//   const handleNext = () => {
//     setCurrentQuestion((prev) => (prev + 1) % totalQuestions);
//     updateQuestionStatus("notAnswered"); // Mark as "Not Answered" if not selected
//   };

//   const handleMarkForReview = () => {
//     updateQuestionStatus("marked");
//     setCurrentQuestion((prev) => (prev + 1) % totalQuestions);
//   };

//   const handleSkip = () => {
//     setCurrentQuestion((prev) => (prev + 1) % totalQuestions);
//   };

//   // Update the status of the question
//   const updateQuestionStatus = (status) => {
//     setQuestionStatus((prevStatus) =>
//       prevStatus.map((s, idx) => (idx === currentQuestion ? status : s))
//     );
//   };

//   return (
//     <div className="exam-container">
//       {/* Question Area */}
//       <div className="question-section">
//         <h3>Q. {currentQuestion + 1}</h3>
//         <p>{questionData[currentQuestion]?.question}</p>
//         <ul>
//           {questionData[currentQuestion]?.options.map((option, index) => (
//             <li key={index}>
//               <input
//                 type="radio"
//                 name={`question-${currentQuestion}`}
//                 checked={selectedOptions[currentQuestion] === index}
//                 onChange={() => handleOptionSelect(index)}
//               />
//               {option}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Question Palette */}
//       <div className="question-palette">
//         <h4>Choose a Question</h4>
//         <div className="question-buttons">
//           {questionStatus.map((status, index) => (
//             <button
//               key={index}
//               className={`btn ${
//                 status === "answered"
//                   ? "btn-success"
//                   : status === "notAnswered"
//                   ? "btn-warning"
//                   : status === "marked"
//                   ? "btn-info"
//                   : "btn-secondary"
//               }`}
//               onClick={() => setCurrentQuestion(index)}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Control Buttons */}
//       <div className="control-buttons">
//         <button onClick={handleMarkForReview}>Mark for Review & Next</button>
//         <button onClick={handleNext}>Save & Next</button>
//         <button onClick={handleSkip}>Skip</button>
//         <button
//           onClick={() =>
//             setSelectedOptions((prev) => ({
//               ...prev,
//               [currentQuestion]: null,
//             }))
//           }
//         >
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ExamInterface;
