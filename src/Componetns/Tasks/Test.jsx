import React, { useEffect, useState } from "react";
import MainLayout from "../../MainLayout";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";
import parse from "html-react-parser";
import { toast, ToastContainer } from "react-toastify";
import "../../Styles/Test.css";
import { IoMdStopwatch } from "react-icons/io";

const Test = () => {
  const [subjectId, setSubjectId] = useState(null);
  const [subjectsData, setSubjectsData] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [subject, setSubject] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]); // Stores selected option per questionId
  const [subSelectedOptions, setSubSelectedOptions] = useState([]); // Stores selected option per questionId
  const [currentQuestion, setCurrentQuestion] = useState(0); // Active question index
  const [questionStatus, setQuestionStatus] = useState([]);


  const [timeLeft, setTimeLeft] = useState({
    hours: 35,
    minutes: 43,
    seconds: 23,
  });

  
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjcxYTUwZThmZDU0NmQ3MmNmYjhmZDhjIiwiaWF0IjoxNzMwMDkzMTQyLCJleHAiOjE3MzAxNzk1NDJ9.WqTkjIU71kbnRnk6T8H7Uq9r0FJeSIG0k0_LWTghKho`;

  // useEffect(() => {
  //   // Calculate total questions
  //   const total = subjectsData.subjectQuestions?.reduce((acc, subject) => {
  //     return acc + (subject.questions ? subject.questions.length : 0);
  //   }, 0);
  //   console.log(total);
  //   // Set total in state
  //   setTotalQuestions(total);
  // }, [subjectsData.subjectQuestions]);

  const getAllUserSubject = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.13:5003/mockTest/getAllQuestionById/`,
        {
          params: {
            mockTest_id: `671b2c6f0383db0a5cdd90a7`,
            subject_id: subjectId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // console.log(response.data.data);

        setSubjectsData(response.data.data);
        setSubjectId(
          subjectId ? subjectId : response.data.data.subjects[0].subjectId
        );
        
       
      }
    } catch (error) {
      toast.error(error);
      console.log("cathing error", error);
    }
  };

  useEffect(() => {
    if (subjectsData) {
      const allQuestions =
        subjectsData.subjectQuestions?.flatMap((sub) =>
          sub.questions.map((item) => ({
            subjectId: sub.subjectId,
            status: "notViwed", // default status
          }))
        ) || [];

      setTotalQuestions(allQuestions.length);
      setQuestionStatus(allQuestions); // Sets the questionStatus with subjectId and initial status
    }
  }, [subjectsData]);

  const handleNext = () => {
    if (
      subject === subjectsData?.subjects?.length - 1 &&
      currentIndex + 1 ===
        subjectsData.subjectQuestions[subject].questions.length
    ) {
      toast.error("NO Question available");
    } else if (
      subjectsData.subjectQuestions[subject]?.questions.length - 1 <
      currentIndex + 1
    ) {
      setSubject(subject + 1);
      setCurrentIndex(0);
      setSubjectId(subjectsData.subjectQuestions[subject + 1].subjectId);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
    // setQuestionStatus('notViewed')
  };

  const handlePrevious = () => {
    if (currentIndex - 1 < 0) {
      setSubject(subject - 1);
      setCurrentIndex(
        subjectsData.subjectQuestions[subject - 1]?.questions.length - 1
      );
      setSubjectId(subjectsData.subjectQuestions[subject - 1].subjectId);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleClickSub = (sub, i) => {
    setSubjectId(sub.subjectId);
    // setActive(sub.subjectId);
    setSubject(i);
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
            width={500}
            height={400}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        );
      }
    },
  };

  const handleQuestionClick = (index1, questionId) => {
    const updatedStatus = questionStatus.map((status, index) => {
     if (index1 === index) 
       {
        return {
          ...status,
          status: status.status === "answered" ? "notAnswered" : "answered",
        };
      }

      return status;

    });
        setQuestionStatus(updatedStatus);
        setCurrentQuestion(index1);

  };
  
  const handleQuestion = (questionId, index) => {
    setSelectedOptions((prevOptions) => {
      const existingSelection = prevOptions.findIndex(
        (option) => option.questionId === questionId
      );
  
      if (existingSelection !== -1) {
        // Remove element on double click
        if (prevOptions[existingSelection]?.index === index) {
          return prevOptions.filter(
            (option, idx) => idx !== existingSelection
          );
        } else {
          return prevOptions.map((option, i) =>
            i === existingSelection ? { ...option, index } : option
          );
        }
      } else {
        // Add new selection
        return [...prevOptions, { questionId, index }];
      }
    });

  
    setQuestionStatus((prevStatus) => {
      const updatedStatus = prevStatus.map((status, index) => {
        
        if (index === currentQuestion) {
          
          return { ...status, status: "answered", questionId }; // Update with questionId
        }
        return status;
      });

      // const jsonFormatData = JSON.stringify(updatedStatus)
      // console.log(jsonFormatData +"update" );
      
      return updatedStatus;

    });

    
  };
  

  const handleSubQuestion = (questionId, subQuestionId, index) => {

    setSubSelectedOptions((prevSubOptions) => {

      const existingSelection = prevSubOptions.findIndex(               //index find method using questionId
        (subOption) =>
          subOption.questionId === questionId &&
          subOption.subQuestionId === subQuestionId
      );

      if (existingSelection !== -1) {
        if (prevSubOptions[existingSelection]?.index === index) {   //double click karne par delete hoga
          return prevSubOptions.filter(
            (subOption, idx) => idx !== existingSelection
          );
        } else {
          return prevSubOptions.map((subOption, i) =>
            i === existingSelection ? { ...subOption, index } : subOption
          );
        }
      } else {
        return setSubSelectedOptions([
          ...prevSubOptions,
          { questionId, subQuestionId, index },
        ]);
      }
    });
    console.log(subSelectedOptions);
    

    // Update question status for subquestions independently
    setQuestionStatus((prevStatus) => {
      const updatedStatus = prevStatus.map((status, index) => {
        
        if (index === currentQuestion) {
          
          return { ...status, status: "answered", subQuestionId }; // Update with questionId
        }
        return status;
      });
      // const jsonFormatData = JSON.stringify(updatedStatus)
      // console.log(jsonFormatData +"update" );
      
      return updatedStatus;

    });
    handleQuestionClick()
  };

  return (
    <div>
      <MainLayout>
        <div className="mx-3">
          <div className="d-flex  justify-content-between p-3 ">
            <h5 className="fw-bold">Bharat SAT Exam & 3 Mock Test</h5>
            <div className="">
              <Link
                className="text-decoration-none fs-4 fw-bold"
                style={{ color: "darkorange" }}
              >
                Back
                <IoMdArrowDropright
                  className=" text-black"
                  style={{ position: "absolute" }}
                />
              </Link>
            </div>
          </div>
          <div className="">
            <h4>{subjectsData.mockTestName}</h4>
          </div>
          <br />
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
                            subjectId === sub.subjectId
                              ? "active"
                              : "text-black "
                          }`}
                          href="#"
                          onClick={() => handleClickSub(sub, index)}
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
                  <div className="fw-bold">
                    {subjectsData.subjectQuestions?.map(
                      (item, subjectIndex) => (
                        <div key={item.subjectId}>
                          {item.questions.map((ques, questionIndex) => (
                            <div key={ques.questionId}>
                              {subjectId === ques.subjectId &&
                                questionIndex === currentIndex && (
                                  <>
                                    <p>{parse(ques.question, options)}</p>
                                    <ul>
                                      {ques.options?.map((option, index) => (
                                        <div
                                          key={index}
                                          className="form-check py-1 d-flex justify-content-start"
                                        >
                                          <label className="form-check-label d-flex align-items-start">
                                            <label className="checkbox-wrapper">
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={
                                                  selectedOptions?.some(
                                                    (item) =>
                                                      item.questionId ===
                                                        ques.questionId &&
                                                      item.index === index
                                                  ) || false
                                                }
                                                onChange={() => {
                                                  handleQuestion(
                                                    ques.questionId,
                                                    index
                                                  );
                                                  // handleQuestionClick(index);
                                                }}
                                              />
                                            </label>
                                            <li className="list-unstyled">
                                              {String.fromCharCode(65 + index)}.
                                              &nbsp;
                                              {option.replace(/<[^>]*>/g, "")}
                                            </li>
                                          </label>
                                        </div>
                                      ))}
                                    </ul>

                                    {/* Subquestions */}
                                    {ques.subQuestions?.map(
                                      (subQues, subIndex) => (
                                        <div className="px-2" key={subIndex}>
                                          <div className="card-body">
                                            <p>
                                              <strong>
                                                Sub-Question {subIndex + 1}
                                              </strong>
                                            </p>
                                            <p>
                                              {parse(subQues.question, options)}
                                            </p>

                                            <ul>
                                              {subQues.options?.map(
                                                (option, index) => (
                                                  <div
                                                    key={index}
                                                    className="form-check py-1 d-flex justify-content-start"
                                                  >
                                                    <label className="form-check-label d-flex align-items-start">
                                                      <label className="checkbox-wrapper">
                                                        <input
                                                          className="form-check-input"
                                                          type="checkbox"
                                                          checked={
                                                            subSelectedOptions?.some(
                                                              (item) =>
                                                                item.questionId ===
                                                                  ques.questionId &&
                                                                item.subQuestionId ===
                                                                  subQues.subQuestionId &&
                                                                item.index ===
                                                                  index
                                                            ) || false
                                                          }
                                                          onChange={() =>
                                                            handleSubQuestion(
                                                              ques.questionId,
                                                              subQues.subQuestionId,
                                                              index
                                                            )
                                                          }
                                                        />
                                                      </label>
                                                      <li className="list-unstyled">
                                                        {String.fromCharCode(
                                                          65 + index
                                                        )}
                                                        . &nbsp;
                                                        {option.replace(
                                                          /<[^>]*>/g,
                                                          ""
                                                        )}
                                                      </li>
                                                    </label>
                                                  </div>
                                                )
                                              )}
                                            </ul>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </>
                                )}
                            </div>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div
                className="d-flex justify-content-between align-items-center mb-4 "
                style={{ gap: "25%" }}
              >
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
                  onClick={() => handleNext()}
                  // disabled={}
                >
                  Next
                </button>
              </div>

              <ToastContainer />
            </div>

            <div className="col-md-4 col-lg-4 col-sm-12 mb-4 mt-5">
              <div className="p-3  bg-body-secondary rounded-3 right-side  h-100">
                {/* Timer */}
                <div
                  className="card mb-2 border-0 "
                  style={{ borderRadius: "10px" }}
                >
                  <div className="card-body card-body-style rounded-2  text-white">
                    <div className="d-flex">
                      <h5 className="text-start">
                        <IoMdStopwatch /> &nbsp; Time Left
                      </h5>
                    </div>
                    <div className="d-flex text-center justify-content-center">
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
                <div className="p-3">
                  {/* Question Navigation */}
                  <div className="card-body bg-body-secondary text-center">
                    <div className="row">
                      {questionStatus.map((status, index) => {
                        return subjectId === status.subjectId ? (
                          <div key={index} className="col-2 m-1 text-center">
                            <button
                              className={`btn ${
                                status.status === "answered"
                                  ? "btn-success"
                                  : status.status === "notAnswered"
                                  ? "btn-warning"
                                  : status.status === "notViewed"
                                  ? "btn-secondary"
                                  : "btn-secondary"
                              }`}
                              onClick={() =>
                                handleQuestionClick(index, status.questionId)
                              }
                            >
                              {index + 1}
                            </button>
                          </div>
                        ) : null;
                      })}
                    </div>

                    {/* Legend */}
                    <div className="mt-3 ">
                      <div className="text-start">
                        <div className="d-flex mb-3 align-items-center me-3">
                          <span className="badge rounded-5 bg-success me-1">
                            &nbsp;
                          </span>{" "}
                          Answered
                        </div>

                        <div className="d-flex mb-3 align-items-center me-3">
                          <span className="badge rounded-5 bg-warning me-1">
                            &nbsp;
                          </span>{" "}
                          Not Answered
                        </div>

                        <div className="d-flex mb-3 align-items-center">
                          <span className="badge rounded-5 bg-secondary me-1">
                            &nbsp;
                          </span>{" "}
                          Not Viewed
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
