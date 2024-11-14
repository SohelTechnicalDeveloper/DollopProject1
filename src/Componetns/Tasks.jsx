import React, { useEffect, useState } from "react";
import MainLayout from "../MainLayout";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Styles/Tasks.css";
import stopWatch from "../images/stopwatch.png";
import { IoBulbSharp } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";
import parse from "html-react-parser";
import { CirclesWithBar } from "react-loader-spinner";

const Tasks = () => {
  const [data, setData] = useState([]);
  const [select, setSelectSub] = useState(null);
  const [question, setQuestion] = useState([]);
  const [subjectId, setSubjectId] = useState();
  const [active, setActive] = useState();
  const [loader, setLoader] = useState(false);

  console.log(subjectId + "subjectid");

  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY3MjA5NDQ0OWVlYTA2YTc4OTlmMDU1NSIsImVtYWlsIjoiZG9sbG9wLnlhc2hAZ21haWwuY29tIiwiaWF0IjoxNzMxNTY1NzQxLCJleHAiOjE3MzE2NTIxNDF9.Dzggy1-1WY5wZELnfaxmduZ9PcvmFfWGUFZYwhlbDFA`;
  const getUserTest = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        `http://192.168.0.13:5003/mockTest/viewResult/`,
        {
          params: {
            mockTest_id: "671b2c6f0383db0a5cdd90a7",
            mockTestSubmissions_id: "6708d56a39bd1c847d7b97f3",
            subject_id: subjectId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("res" + response.data.data);
      if (response.status === 200) {
        setData(response.data.data);
        setSelectSub(select ? select : response.data.data.subjects[0]);
        setActive(subjectId);

        console.log(data.subjects.length);

        // setQuestion(response.data.data.questions)
      } else {
        console.error("Data is not an array", response.data);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoader(false);
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

          {loader ? (
            <div className="d-flex justify-content-center align-content-center align-items-center">
              <CirclesWithBar
                height="100"
                width="200"
                color="#4fa94d"
                outerCircleColor="#4fa94d"
                innerCircleColor="#4fa94d"
                barColor="#4fa94d"
                ariaLabel="circles-with-bar-loading"
                wrapperStyle={{}}
              />
            </div>
          ) : (
            <>
              {data.questions?.map((quest, index) => {
                return (
                  <div className="px-2 " key={index}>
                    <div className="card-body">
                      <p>
                        <strong>
                          Question {index + 1}
                          {quest.subQuestions.length ? (
                            ""
                          ) : quest.selectedOption !== null ? (
                            quest.correctOption === quest.selectedOption ? (
                              <label
                                className="ps-1"
                                style={{ color: "rgb(84 231 86)" }}
                              >
                                (+2 Marks)
                              </label>
                            ) : (
                              <label className=" text-danger ps-1">
                                {" "}
                                (0.5 Marks)
                              </label>
                            )
                          ) : (
                            <label className=" text-danger ps-1">
                              {" "}
                              Not Answered
                            </label>
                          )}
                        </strong>
                      </p>

                      <div className="fw-bold">
                        {parse(quest.question, options)}
                      </div>

                      {loader ? (
                        <div className="d-flex justify-content-center align-content-center align-items-center">
                          <CirclesWithBar
                            height="100"
                            width="200"
                            color="#4fa94d"
                            outerCircleColor="#4fa94d"
                            innerCircleColor="#4fa94d"
                            barColor="#4fa94d"
                            ariaLabel="circles-with-bar-loading"
                            wrapperStyle={{}}
                          />
                        </div>
                      ) : (
                        quest.subQuestions?.map((subQuestion, optIndex) => {
                          return (
                            <>
                              <p>
                                <strong>
                                  <br />
                                  Question {optIndex + 1}
                                  {subQuestion.length ? (
                                    ""
                                  ) : subQuestion.selectedOption !== null ? (
                                    subQuestion.correctOption ===
                                    subQuestion.selectedOption ? (
                                      <label
                                        className="ps-1"
                                        style={{ color: "rgb(84 231 86)" }}
                                      >
                                        (+2 Marks)
                                      </label>
                                    ) : (
                                      <label className=" text-danger ps-1">
                                        {" "}
                                        (0.5 Marks)
                                      </label>
                                    )
                                  ) : (
                                    <label className=" text-danger ps-1">
                                      {" "}
                                      Not Answered
                                    </label>
                                  )}
                                </strong>

                                {/* subQuestion  */}
                              </p>{" "}
                              <p className="fw-bold">
                                {parse(subQuestion.question, options)}
                              </p>
                              <form>
                                {subQuestion.options?.map(
                                  (option, optIndex) => (
                                    <div className="form-check" key={optIndex}>
                                      {/* {/ correct Answer /} */}
                                      <label className="checkbox-wrapper ">
                                        {subQuestion.correctOption ===
                                        optIndex ? (
                                          <input
                                            className="custom-icon-checkbox"
                                            type="checkbox"
                                            checked={true}
                                            name={`question${subQuestion.questionId}`}
                                            id={`option${optIndex}${subQuestion.questionId}`}
                                          />
                                        ) : (
                                          ""
                                        )}
                                        {subQuestion.correctOption !==
                                          optIndex &&
                                        optIndex ===
                                          subQuestion.selectedOption ? (
                                          <input
                                            className="custom-icon-checkbox"
                                            type="checkbox"
                                            checked={false}
                                            name={`question${subQuestion.questionId}`}
                                            id={`option${optIndex}${subQuestion.questionId}`}
                                          />
                                        ) : (
                                          ""
                                        )}
                                        {subQuestion.correctOption !==
                                          optIndex &&
                                        optIndex ===
                                          subQuestion.selectedOption ? (
                                          <span className="checkbox-icon"></span>
                                        ) : subQuestion.correctOption ===
                                          optIndex ? (
                                          <span className="checkbox-icon"></span>
                                        ) : (
                                          <span className="empty"></span>
                                        )}
                                      </label>

                                      <label className="form-check-label">
                                        {String.fromCharCode(65 + optIndex)}.
                                        &nbsp;
                                        {option.replace(/<[^>]*>/g, "")}
                                        <span className="fw-bold">
                                          {optIndex ===
                                            subQuestion.correctOption &&
                                          optIndex ===
                                            subQuestion.selectedOption ? (
                                            <span style={{ color: "#23bc23" }}>
                                              &nbsp;(Correct Answer)
                                            </span>
                                          ) : optIndex ===
                                            subQuestion.correctOption ? (
                                            <span style={{ color: "#23bc23" }}>
                                              &nbsp;(Correct Answer)
                                            </span>
                                          ) : optIndex ===
                                            subQuestion.selectedOption ? (
                                            <span style={{ color: "red" }}>
                                              &nbsp;(Incorrect Answer)
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                        </span>
                                      </label>
                                    </div>
                                  )
                                )}
                              </form>
                              {subQuestion.solution ? (
                                <>
                                  <button className="btn btn-link text-decoration-none mt-2 fw-bold text-dark">
                                    <IoBulbSharp
                                      className="fw-bold"
                                      style={{ color: "#F6821F" }}
                                    />
                                    &nbsp; Solution &nbsp;{" "}
                                    <a
                                      className="btn text-decoration-none fw-bold fst-italic"
                                      data-bs-toggle="collapse"
                                      href={`#collapseExample${quest.subQuestionId}`}
                                      role="button"
                                      aria-expanded="false"
                                      aria-controls={`collapseExample${quest.subQuestionId}`}
                                      style={{ color: "#F6821F" }}
                                    >
                                      Show
                                    </a>
                                  </button>

                                  <div
                                    className="collapse"
                                    id={`collapseExample${quest.subQuestionId}`}
                                  >
                                    <div className="card card-body">
                                      {parse(subQuestion.solution, options) ||
                                        "No solution provided."}
                                    </div>
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                            </>
                          );
                        })
                      )}

                      <form>
                        {quest.options?.map((option, optIndex) => (
                          <div className="form-check" key={optIndex}>
                            <label className="form-check-label d-flex">
                              <label className="checkbox-wrapper ">
                                {quest.correctOption === optIndex ? (
                                  <input
                                    className="custom-icon-checkbox"
                                    type="checkbox"
                                    checked={true}
                                    name={`question${quest.questionId}`}
                                    id={`option${optIndex}${quest.questionId}`}
                                  />
                                ) : (
                                  ""
                                )}
                                {quest.correctOption !== optIndex &&
                                optIndex === quest.selectedOption ? (
                                  <input
                                    className="custom-icon-checkbox"
                                    type="checkbox"
                                    checked={false}
                                    name={`question${quest.questionId}`}
                                    id={`option${optIndex}${quest.questionId}`}
                                  />
                                ) : (
                                  ""
                                )}
                                {quest.correctOption !== optIndex &&
                                optIndex === quest.selectedOption ? (
                                  <span className="checkbox-icon"></span>
                                ) : quest.correctOption === optIndex ? (
                                  <span className="checkbox-icon"></span>
                                ) : (
                                  <span className="empty"></span>
                                )}
                              </label>
                              {String.fromCharCode(65 + optIndex)}. &nbsp;
                              {option.replace(/<[^>]*>/g, "")}
                              <span className="fw-bold">
                                {optIndex === quest.correctOption &&
                                optIndex === quest.selectedOption ? (
                                  <span style={{ color: "#23bc23" }}>
                                    &nbsp;(Correct Answer)
                                  </span>
                                ) : optIndex === quest.correctOption ? (
                                  <span style={{ color: "#23bc23" }}>
                                    &nbsp;(Correct Answer)
                                  </span>
                                ) : optIndex === quest.selectedOption ? (
                                  <span style={{ color: "red" }}>
                                    &nbsp;(Incorrect Answer)
                                  </span>
                                ) : (
                                  ""
                                )}
                              </span>
                            </label>
                          </div>
                        ))}
                      </form>

                      {quest.typeOfQuestion === "General" ? (
                        <>
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

                          <div
                            className="collapse"
                            id={`collapseExample${index}`}
                          >
                            <div className="card card-body">
                              {parse(quest.solution) || "No solution provided."}
                            </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <hr />
                  </div>
                );
              })}
            </>
          )}
        </div>
      </MainLayout>
    </div>
  );
};

export default Tasks;
