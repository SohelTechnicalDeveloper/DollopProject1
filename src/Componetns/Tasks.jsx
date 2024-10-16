import React, { useEffect, useState } from "react";
import MainLayout from "../MainLayout";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Styles/Tasks.css";
import stopWatch from "../images/stopwatch.png";
import { IoBulbSharp } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";

const Tasks = () => {
  const [data, setData] = useState([]);
  const [select, setSelectSub] = useState(null);
  const [question, setQuestion] = useState([]);
  const [subjectId, setSubjectId] = useState();
  const [active, setActive] = useState();
  console.log(subjectId + "subjectid");

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjcwMDExZWYzZjM4MmE4OTg2MmU0OGI0IiwiaWF0IjoxNzI5MDgwODg2LCJleHAiOjE3MjkxNjcyODZ9.iu0qT6knP42s8fAPt4AObPKe2NFnwk3olBUPNaQNhd4";

  const getUserTest = async () => {
    try {
      const response = await axios.get(
        `http://13.235.121.38:5001/mockTest/viewresult/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            mockTest_id: "67000a073f382a89862e47cb",
            mockTestSubmissions_id: "670d11801c7b3db481d25cbd",
            subject_id: subjectId,
          },
        }
      );
      // console.log(response.data.data);
      if (response.status === 200) {
        setData(response.data.data);
        setSelectSub(select ? select : response.data.data.subjects[0]);
        setActive(subjectId);

        console.log(data.subjects.length);

        // if(data.subjects.length>0 && subjectId===null )
        //   {
        //     console.log("heello data");

        //   const result = await axios.get(`http://13.235.121.38:5001/mockTest/viewresult/`,
        //     {
        //       headers: {
        //         Authorization: `Bearer ${token}`,
        //       },
        //       params:{
        //         mockTest_id:'67000a073f382a89862e47cb',
        //         mockTestSubmissions_id:'670d11801c7b3db481d25cbd',
        //         subject_id:subjectId
        //     }
        //     }
        //   );
        //   setData(result.data.data);
        //   setSubjectId(result.data.data.subjects.subjectId)
        //   setSelectSub(result.data.data.subjects)
        // }

        // setQuestion(response.data.data.questions)
      } else {
        console.error("Data is not an array", response.data);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleClick = (sub) => {
    setSubjectId(sub.subjectId);
    setSelectSub(sub);
    setActive(sub.subjectId);
  };

  useEffect(() => {
    getUserTest();
  }, [subjectId]);

  return (
    <div>
      <MainLayout>
        <div className="mx-4">
          {/* //header content  */}
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
          {/* marks and time and question content */}
          {
            <div className="p-3 rounded-2">
              <div className="card mb-4 shadow ">
                <div className="card-body text-start">
                  <h5 className="text-primary fw-bold">
                    My Overall Performance Summary
                  </h5>
                  <div className="row mt-2">
                    <div className="col d-flex">
                      <div className=" text-start text-light ">
                        <img
                          src={stopWatch}
                          alt=""
                          className="rounded-5   text-white p-2"
                          // height={70}
                          width={70}
                        />
                      </div>
                      <h5 className="mt-2">
                        {data.score}/{data.totalMarks} <br />{" "}
                        <p className="text-secondary">Marks</p>
                      </h5>
                    </div>
                    <div className="col">
                      <div className="col d-flex">
                        <div className=" text-start text-light ">
                          <img
                            src={stopWatch}
                            alt=""
                            className="rounded-5   text-white p-2"
                            // height={70}
                            width={70}
                          />
                        </div>
                        <h5 className="mt-2">
                          {data.totalAttemptQuestions}/{data.totalQuestions}{" "}
                          <br /> <p className="text-secondary">Attempted</p>
                        </h5>
                      </div>
                    </div>
                    <div className="col">
                      <div className="col d-flex">
                        <div className=" text-start text-light ">
                          <img
                            src={stopWatch}
                            alt=""
                            className="rounded-5   text-white p-2"
                            // height={70}
                            width={70}
                          />
                        </div>
                        <h5 className="mt-2">
                          {data.totalCorrectQuestions}/{data.totalQuestions}{" "}
                          <br /> <p className="text-secondary">Correct</p>
                        </h5>
                      </div>
                    </div>
                    <div className="col">
                      <div className="col d-flex">
                        <div className=" text-start text-light ">
                          <img
                            src={stopWatch}
                            alt=""
                            className="rounded-5 text-white p-2"
                            // height={70}
                            width={70}
                          />
                        </div>
                        <h5 className="mt-2">
                          {data.totalIncorrectQuestions}/{data.totalQuestions}{" "}
                          <br /> <p className="text-secondary">Incorrect</p>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <h5 className="text-primary fw-bold">Total Time Taken</h5>
                  <div className="row mt-2">
                    <div className="col ">
                      <div className="col d-flex">
                        <div className=" text-start text-light ">
                          <img
                            src={stopWatch}
                            alt=""
                            className="rounded-5   text-white p-2"
                            // height={70}
                            width={70}
                          />
                        </div>

                        {/* <p>hh/mm/ss</p> */}
                        <h5 className="mt-2 text-start">
                          {" "}
                          <strong>{data.startTime}</strong> <br />{" "}
                          <p className="text-secondary"> Start Time</p>
                        </h5>
                      </div>
                    </div>
                    <div className="col">
                      <div className="col d-flex">
                        <div className=" text-start text-light ">
                          <img
                            src={stopWatch}
                            alt=""
                            className="rounded-5   text-white p-2"
                            // height={70}
                            width={70}
                          />
                        </div>
                        <h5 className="mt-2">
                          {" "}
                          <strong>{data.endTime}</strong> <br />{" "}
                          <p className="text-secondary"> End Time</p>
                        </h5>
                      </div>
                    </div>
                    <div className="col">
                      <div className="col d-flex">
                        <div className=" text-start text-light ">
                          <img
                            src={stopWatch}
                            alt=""
                            className="rounded-5   text-white p-2"
                            // height={70}
                            width={70}
                          />
                        </div>
                        <h5 className="mt-2">
                          {" "}
                          <strong>{data.submittedTime}</strong> <br />{" "}
                          <p className="text-secondary">Time Taken</p>
                        </h5>
                      </div>
                    </div>
                    <div className="col"></div>
                  </div>
                </div>
              </div>
            </div>
          }

          <div className="d-flex">
            {data.subjects?.map((item, index) => {
              return (
                <ul className="nav mb-4 nav-list" key={index}>
                  <li className="nav-item">
                    <Link
                      className={`nav-link fs-5  ${
                        active === item.subjectId ? "active" : "text-black"
                      }`}
                      href="#"
                      onClick={() => handleClick(item)}
                    >
                      {item.subjectName}
                    </Link>
                  </li>
                </ul>
              );
            })}
          </div>

          <div className="card mb-4 shadow">
            <div className="card-body">
              <h5 className="text-primary fw-bold">
                Subject Performance Summary
              </h5>

              <div className="row text-start">
                <div className="col d-flex">
                  <div className=" text-start text-light ">
                    <img
                      src={stopWatch}
                      alt=""
                      className="rounded-5   text-white p-2"
                      // height={70}
                      width={70}
                    />
                  </div>
                  <h5 className="mt-2">
                    {select?.score}/{select?.totalQuestions * 2} <br />{" "}
                    <p className="text-secondary">Marks</p>
                  </h5>
                </div>
                <div className="col">
                  <div className="col d-flex">
                    <div className=" text-start text-light ">
                      <img
                        src={stopWatch}
                        alt=""
                        className="rounded-5   text-white p-2"
                        // height={70}
                        width={70}
                      />
                    </div>
                    <h5 className="mt-2">
                      {select?.attemptedQuestions}/{select?.totalQuestions}{" "}
                      <br /> <p className="text-secondary">Attempted</p>
                    </h5>
                  </div>
                </div>
                <div className="col">
                  <div className="col d-flex">
                    <div className=" text-start text-light ">
                      <img
                        src={stopWatch}
                        alt=""
                        className="rounded-5   text-white p-2"
                        // height={70}
                        width={70}
                      />
                    </div>
                    <h5 className="mt-2">
                      {select?.correctQuestions}/{select?.totalQuestions} <br />{" "}
                      <p className="text-secondary">Correct</p>
                    </h5>
                  </div>
                </div>
                <div className="col">
                  <div className="col d-flex">
                    <div className=" text-start text-light ">
                      <img
                        src={stopWatch}
                        alt=""
                        className="rounded-5   text-white p-2"
                        // height={70}
                        width={70}
                      />
                    </div>
                    <h5 className="mt-2">
                      {select?.incorrectQuestions}/{select?.totalQuestions}{" "}
                      <br /> <p className="text-secondary">Incorrect</p>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {data.questions?.map((quest, index) => {
            return (
              <div className="card mb-4" key={index}>
                <div className="card-body">
                  <p>
                    <strong>
                      Question {index + 1}
                      {true === true ? (
                        <span className="fw-bold" style={{ color: "#23bc23" }}>
                          &nbsp; (+2 Marks)
                        </span>
                      ) : (
                        ""
                      )}
                    </strong>
                  </p>

                  <p>{quest.question.replace(/<[^>]*>/g, "")}</p>
                   

                  {
                    (
                      quest.subQuestions?.map((subQuestion, optIndex) => {
                        return (
                          <>
                            <p>
                    <strong>
                      Question {optIndex + 1}
                      {true === true ? (
                        <span className="fw-bold" style={{ color: "#23bc23" }}>
                          &nbsp; (+2 Marks)
                        </span>
                      ) : (
                        ""
                      )}
                    </strong>
                  </p>
                            {" "}
                            <p>{subQuestion.question.replace(/<[^>]*>/g, "")}</p>
                            <form>
                              {subQuestion.options?.map((option, optIndex) => (
                                <div className="form-check" key={optIndex}>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={
                                      subQuestion.correctOption === optIndex
                                        ? true
                                        : false
                                    }
                                    name={`question${subQuestion.questionId}`}
                                    id={`option${optIndex}${subQuestion.questionId}`}
                                  />
                                  <label className="form-check-label">
                                    {String.fromCharCode(65 + optIndex)}.
                                    {option.replace(/<[^>]*>/g, "")}
                                    {optIndex === subQuestion.correctOption ? (
                                      <span
                                        className="fw-bold"
                                        style={{ color: "#23bc23" }}
                                      >
                                        &nbsp;(Correct Answer)
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </label>
                                </div>
                              ))}
                            </form>
                            
                          </>
                        );
                      }))}

                  <form>
                    {quest.options?.map((option, optIndex) => (
                      <div className="form-check" key={optIndex}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={quest.correctOption===optIndex?true:false}
                          name={`question${quest.questionId}`}
                          id={`option${optIndex}${quest.questionId}`}
                        />
                        <label className="form-check-label">
                          {String.fromCharCode(65 + optIndex)}.{option}
                          {optIndex === quest.correctOption ? (
                            <span
                              className="fw-bold"
                              style={{ color: "#23bc23" }}
                            >
                              &nbsp;(Correct Answer)
                            </span> 
                          )
                          :""}
                        </label>
                      </div>
                    ))}
                  </form>

                  <button className="btn btn-link text-decoration-none mt-2 fw-bold text-dark">
                    <IoBulbSharp
                      className="fw-bold"
                      style={{ color: "#F6821F" }}
                    />
                    &nbsp; Solution &nbsp;{" "}
                    <a
                      className="btn text-decoration-none fw-bold fst-italic"
                      data-bs-toggle="collapse"
                      href={`#collapseExample${index}`}
                      role="button"
                      aria-expanded="false"
                      aria-controls={`collapseExample${index}`}
                      style={{ color: "#F6821F" }}
                    >
                      Show
                    </a>
                  </button>

                  <div className="collapse" id={`collapseExample${index}`}>
                    <div className="card card-body">
                      {quest.solution || "No solution provided."}
                    </div>
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

export default Tasks;
