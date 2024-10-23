import React, { useEffect, useState } from "react";
import MainLayout from "../MainLayout";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";
import parse from "html-react-parser";
import { toast, ToastContainer } from "react-toastify";
import "../Styles/Test.css";
import { IoMdStopwatch } from "react-icons/io";

const Test = () => {
  const [subjectId, setSubjectId] = useState();
  const [subjectsData, setSubjectsData] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [subject, setSubject] = useState(0);
  const [active, setActive] = useState(0);

  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZhYTJmYmI3NTNkODA1YTlhYTAzNzkwIiwiaWF0IjoxNzI5NjY2OTk5LCJleHAiOjE3Mjk3NTMzOTl9.dVv_tNg3lQle8bbJTiGIQCQ4h2y7O216McjlUXsJcwg`;

  const getAllUserSubject = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.15:5003/mockTest/getAllQuestionById/`,
        {
          params: {
            mockTest_id: `66f5356f6259b7aa88a60ded`,
            subject_id: subjectId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data + "hello");
      if (response.status === 200) {
        setSubjectsData(response.data.data);
        setActive(response.data.data.subjects[0].subjectId);
      }
    } catch (error) {
      toast.error(error);
      console.log("cathing error", error);
    }
  };

  const handleNext = () => {
    if (
      subjectsData.subjectQuestions[subject]?.questions.length - 1 <
      currentIndex + 1
    ) {
      setSubject(subject + 1);
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex - 1 < 0) {
      setSubject(subject - 1);
      setCurrentIndex(
        subjectsData.subjectQuestions[subject - 1]?.questions.length - 1
      );
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleClickSub = (sub, i) => {
    setSubjectId(sub.subjectId);
    setActive(sub.subjectId);
    // setCurrentIndex(i)
  };

  useEffect(() => {
    getAllUserSubject();
  }, []);
  const options = {
    replace: (domNode) => {
      // Handle <img> tags
      if (domNode.name === "img") {
        const { src } = domNode.attribs;
        return (
          <img
            src={src}
            width={500}
            height={400}
            className="img-fluid"
            alt="Content Image"
          />
        );
      }
      // Handle <oembed> for videos
      if (domNode.name === "oembed") {
        const videoUrl = domNode.attribs.url;
        const embedUrl = videoUrl.replace("youtu.be/", "youtube.com/embed/");
        return (
          <iframe
            className="emded"
            src={embedUrl}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        );
      }
    },
  };

  const totalQuestions = 30;
  const [timeLeft, setTimeLeft] = useState({
    hours: 35,
    minutes: 43,
    seconds: 23,
  });
  const [questionStatus, setQuestionStatus] = useState(
    Array(totalQuestions).fill("notViewed") // Example statuses: 'answered', 'notAnswered', 'notViewed'
  );

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

  {
    /* // Function to update question status (for demo purposes) */
  }
  const handleQuestionClick = (index) => {
    const updatedStatus = questionStatus.map((status, idx) => {
      if (idx === index) {
        return status === "answered" ? "notAnswered" : "answered"; // Toggle status for demo
      }
      return status;
    });
    setQuestionStatus(updatedStatus);
  };

  return (
    <div>
      <MainLayout>
        <div className="mx-3">
          <div className="d-flex  justify-content-between p-3 ">
            <h5 className="fw-bold">Bharat SAT Exam & 3 Mock Test</h5>
            <div className="d-flex">
              <Link
                className="text-decoration-none fs-4 fw-bold"
                style={{ color: "darkorange" }}
              >
                Back
                <IoMdArrowDropright className="fs-3 text-black" />
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 col-lg-8 col-sm-12">
              {/* Subjects name */}

              <div className="d-flex">
                {subjectsData.subjects?.map((sub, index) => {
                  return (
                    <ul className="nav mb-4 nav-list " key={index}>
                      <li className="nav-item ">
                        <Link
                          className={`nav-link fs-5  ${
                            active === sub.subjectId ? "active" : "text-black "
                          }`}
                          href="#"
                          onClick={() => handleClickSub(sub)}
                        >
                          {sub.subjectName}
                        </Link>
                      </li>
                    </ul>
                  );
                })}
              </div>

              {/* Questions Data */}

              <div className="px-2">
                <div className="card-body">
                  <p>
                    <strong>Question {currentIndex + 1}</strong>
                  </p>
                  {/* Display the current question */}
                  <div className="fw-bold">
                    {subjectsData
                      ? parse(
                          subjectsData.subjectQuestions[subject]?.questions[
                            currentIndex
                          ]?.question,
                          options
                        )
                      : ""}
                  </div>

                  {/* Subquestion  options  */}

                  {/* Display the options */}
                  <ul>
                    {subjectsData
                      ? subjectsData.subjectQuestions[subject].questions[
                          currentIndex
                        ]?.options?.map((option, index) => (
                          <div className="form-check py-1 d-flex justify-content -start">
                            <label className="form-check-label d-flex align-items-start">
                              <label className="checkbox-wrapper ">
                                <input className=" " type="checkbox" />
                              </label>
                              <li key={index} className="list-unstyled">
                                {String.fromCharCode(65 + index)}. &nbsp;
                                {option.replace(/<[^>]*>/g, "")}
                              </li>
                            </label>
                          </div>
                        ))
                      : ""}
                  </ul>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center m-4">
                {
                  <button
                    className={`btn btn-warning   ${
                      currentIndex === 0 && subject === 0 ? "d-none" : "d-block"
                    }`}
                    onClick={handlePrevious}
                  >
                    Previous
                  </button>
                }

                <button
                  className="btn btn-warning"
                  onClick={handleNext}
                  // disabled={ subjectsData.subjectQuestions.length > subjectsData.subjectQuestions.questions.length  }
                >
                  Next
                </button>
              </div>

              <ToastContainer />
            </div>

            <div className="col-md-4 col-lg-4 col-sm-12">
              <div
                className="position-fixed px-4 position-media"
                style={{
                  right: 0,
                  top: -20,
                  height: "100vh",
                  overflowY: "auto",
                  padding: "10px",
                  width: "28%",
                }}
              >
                <div className="p-3 bg-body-secondary rounded-3 right-side">
                  {/* Timer */}
                  <div
                    className="card mb-2 border-0"
                    style={{ borderRadius: "10px" }}
                  >
                    <div className="card-body card-body-style text-start text-white">
                      <div className="d-flex">
                        <h5 className="text-start">
                          <IoMdStopwatch /> &nbsp; Time Left
                        </h5>
                      </div>
                      <div className="d-flex">
                        <div className="px-2">
                          <h4>{timeLeft.hours}</h4>
                          <small>Hours</small>
                        </div>
                        <div className="px-2">
                          <h4>{timeLeft.minutes}</h4>
                          <small>Minutes</small>
                        </div>
                        <div className="px-2">
                          <h4>{timeLeft.seconds}</h4>
                          <small>Seconds</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Question Navigation */}
                  <div className="p-1">
                    <div className="card-body bg-body-secondary text-center">
                      <div className="row">
                        {Array.from({ length: totalQuestions }).map(
                          (_, index) => (
                            <div
                              key={index}
                              className="col-2"
                              style={{ padding: "5px" }}
                            >
                              <button
                                className={`btn w-100 ${
                                  questionStatus[index] === "answered"
                                    ? "btn-success"
                                    : questionStatus[index] === "notAnswered"
                                    ? "btn-warning"
                                    : "btn-secondary"
                                }`}
                                onClick={() => handleQuestionClick(index)}
                              >
                                {index + 1}
                              </button>
                            </div>
                          )
                        )}
                      </div>

                      {/* Legend */}
                      <div className="mt-3">
                        <div className="text-start">
                          <div className="d-flex align-items-center me-3">
                            <span className="badge rounded-5 bg-success me-1">
                              &nbsp;
                            </span>{" "}
                            Answered
                          </div>
                          <br />
                          <div className="d-flex align-items-center me-3">
                            <span className="badge rounded-5 bg-warning me-1">
                              &nbsp;
                            </span>{" "}
                            Not Answered
                          </div>
                          <br />
                          <div className="d-flex align-items-center">
                            <span className="badge rounded-5 bg-secondary me-1">
                              &nbsp;
                            </span>{" "}
                            Not Viewed
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-success">Submit Test</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default Test;
