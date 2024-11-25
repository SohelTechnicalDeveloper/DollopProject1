 
        //  table header 
 
 {/* <h2 style={{ color: "#07284B", marginLeft: "25px" }}>Users</h2>

        <div
          className="form-group d-flex justify-content-end mx-5 mt-4"
          style={{ fontFamily: "Gill Sans, sans-serif" }}
        >
          <div className="mx-4">
            <input
              type="text"
              className="form-control input-color"
              placeholder="Search"
              onChange={(e) => searchUser(e)}
            />
          </div>
          <button
            onClick={() => addShowModel()}
            className="btn text-truncate"
            style={{
              backgroundColor: "#21b7b5",
              color: "#fff",
              fontSize: "18px",
            }}
          >
            {" "}
           
          </button>
        </div> */}


      //  button for the total question no

      
        // {Array.from({ length: totalQuestions }).map((_, index) => (
        //   <button
        //     key={index}
        //     className={`btn m-1  ${
        //       questionStatus[index] === 'answered'
        //         ? 'btn-success'
        //         : questionStatus[index] === 'notAnswered'
        //         ? 'btn-warning'
        //         : 'btn-secondary'
        //     }`}
        //     onClick={() => handleQuestionClick(index)}
        //   >
        //     {index + 1}
        //   </button>
        // ))}
         {/* <div className="fw-bold">
                    {subjectsData?.subjectQuestions?.[subject]?.questions?.[
                      currentIndex
                    ]?.question
                      ? parse(
                          String(
                            subjectsData.subjectQuestions[subject].questions[
                              currentIndex
                            ]?.question
                          ),
                          options
                        )
                      : "No question available"}
                  </div> */}




                   // const handleSubQuestion = (questionId, subQuestionId, index) => {
  //   console.log(questionId, subQuestionId, index);

  //   setSubSelectedOptions((prevSubOptions) => {
  //     const existingPrevSelection = prevSubOptions.findIndex(
  //       (subOption) =>
  //         subOption.questionId === questionId &&
  //         subOption.subQuestionId === subQuestionId
  //     );
  //     console.log(existingPrevSelection !== -1);

  //     if (existingPrevSelection !== -1) {
  //       if (prevSubOptions[existingPrevSelection]?.index === index) {
  //         return prevSubOptions.filter(
  //           (subOption, index) => index !== existingPrevSelection
  //         );
  //       } else {
  //         return prevSubOptions.map((subOption, i) =>
  //           i === existingPrevSelection ? { ...subOption, index } : subOption
  //         );
  //       }
  //     } else {
  //       setSubSelectedOptions([
  //         ...prevSubOptions,
  //         { questionId, subQuestionId, index },
  //       ]);
  //     }
  //   });
  // };
  
  // const handleQuestion = (questionId, index) => {
  //   setSelectedOptions((prevOptions) => {
  //     const existingSelection = prevOptions.findIndex(
  //       (option) => option.questionId === questionId
  //     );
  
  //     if (existingSelection !== -1) {
  //       // Toggle selection if the same option is clicked again
  //       if (prevOptions[existingSelection]?.index === index) {
  //         return prevOptions.filter(
  //           (option, idx) => idx !== existingSelection
  //         );
  //       } else {
  //         return prevOptions.map((option, i) =>
  //           i === existingSelection ? { ...option, index } : option
  //         );
  //       }
  //     } else {
  //       // Add new selected option
  //       return [...prevOptions, { questionId, index }];
  //     }
  //   });
  
  //   // Update question status to "answered"
  //   setQuestionStatus((prevStatus) =>
  //     prevStatus.map((status, idx) =>
  //       idx === currentQuestion ? "answered" : status
  //     )
  //   );
  // };



   // Function to simulate a countdown timer
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeLeft(prevTime => {
  //       const { hours, minutes, seconds } = prevTime;
  //       if (seconds > 0) {
  //         return { ...prevTime, seconds: seconds - 1 };
  //       } else if (minutes > 0) {
  //         return { hours, minutes: minutes - 1, seconds: 59 };
  //       } else if (hours > 0) {
  //         return { hours: hours - 1, minutes: 59, seconds: 59 };
  //       }
  //       return prevTime;
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);
  import React, { useState } from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

const BharatSatExam = () => {
  const [percent, setPercent] = useState(0); // Initial percentage
  const [error, setError] = useState(false);

  const handleClick = () => {
    setError(false);
    setPercent((prev) => Math.min(prev + 25, 100)); // Increment percentage by 25, max at 100
  };

  const handleBack = () => {
    setPercent((prev) => Math.max(prev - 25, 0)); // Decrement percentage by 25, min at 0
  };

  return (
    <div className="container mt-4">
      {percent === 0 ? (
        // First Template
        <div className="row mt-4 p-2">
          <div className="col-md-6 mb-3">
            <div className="m-1">
              <label className="form-label text-black fw-bold">
                Bharat SAT Exam Name<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Bharat SAT Exam Name"
              />
              {!error ? (
                <label
                  htmlFor=""
                  className="position-absolute mb-1 text-danger fw-bolder"
                >
                  Fields Can't Select
                </label>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* Additional Fields */}
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn mt-3"
              onClick={handleClick}
              style={{ backgroundColor: "#07284B", color: "#fff" }}
            >
              Next <MdArrowRightAlt style={{ fontSize: "22px" }} />
            </button>
          </div>
        </div>
      ) : percent === 100 ? (
        // Success Template
        <div className="text-center my-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <img
                src="welldone-image-url" // Replace with actual image URL
                alt="Success Illustration"
                className="img-fluid mb-4 rounded-5"
                height={270}
                width={270}
              />
              <h3 className="text-primary fw-bold">
                Well Done! <span className="fs-5">🤩😎</span>
              </h3>
              <p className="text-black fw-bolder">
                You have successfully created an exam.
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <div className="text-start">
              <button
                className="btn text-primary border-0"
                style={{ fontSize: "18px" }}
                onClick={handleBack}
              >
                <HiOutlineArrowNarrowLeft />
                &nbsp;Back
              </button>
            </div>
            <div className="text-end">
              <button
                className="btn truncate"
                style={{ backgroundColor: "#07284B", color: "#fff" }}
              >
                Create Bharat SAT Exam +
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Intermediate Template
        <div>
          <div
            className="row mt-4 p-3 shadow rounded-3 align-items-end mb-3"
            style={{ backgroundColor: "#D3E3FD" }}
          >
            <div className="col-md-6 mb-3">
              <label
                htmlFor=""
                style={{ color: "#477de8" }}
                className="form-label fw-bold"
              >
                Select Subject <span className="text-danger">*</span>
              </label>
              <select name="subject" className="form-select">
                <option value="" className="fw-bold text-black">
                  Select Subject
                </option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
              </select>
              {!error ? (
                <label
                  htmlFor=""
                  className="position-absolute mb-2 text-danger fw-bolder"
                >
                  Fields Can't Select
                </label>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="fw-bold" style={{ color: "#477de8", cursor: "pointer" }}>
            <button
              type="button"
              className="rounded-2 fw-bold addMore-btn"
              style={{
                fontSize: "11px",
                color: "#477de8",
                border: "2px solid #477de8",
              }}
            >
              +
            </button>{" "}
            Add More
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="mt-3 btn"
              style={{ backgroundColor: "#07284B", color: "#fff" }}
              onClick={handleClick}
            >
              Next <MdArrowRightAlt style={{ fontSize: "22px" }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BharatSatExam;


  