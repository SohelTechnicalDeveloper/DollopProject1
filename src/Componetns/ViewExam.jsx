import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MainLayout from "../MainLayout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import "../Styles/ViewExam.css";
import parse from "html-react-parser";
import { FaFilePdf } from "react-icons/fa6";

const ViewExam = () => {
  const [subjectsData, setSubjectsData] = useState([]);
  const [activeLink, setactiveLink] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { classId } = location.state || {}; //this are use location hooks for get state other component to other component

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY3MmI2MTNhYzQ2ZWEyN2EzNzBhYmVhMyIsImVtYWlsIjoiYW5raXRjaG91aGFuLmRvbGxvcEBnbWFpbC5jb20iLCJpYXQiOjE3MzI4NzA5ODYsImV4cCI6MTczMjk1NzM4Nn0.b7zwedgmtS1e775DgIIVTc3SRlrAz9f64uM_-xcO0fI";

  const getAllUserSubject = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.27:5003/bharatSat/bharatSat-question-paper/`,
        {
          params: {
            classId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        setSubjectsData(data?.data || {});
        // console.log(data?.data?.subjectQuestions?.questions?.[0], "value");
        // console.log(data?.data?.subjects?.[0]?.subject_name || "No subject name");
        // console.log(data?.data?.subjects?.[0]?._id || "" ,"subjectID");
        setSubjectId(data?.data?.subjects?.[0]?._id || "");
        setactiveLink(data?.data?.subjects?.[0]?._id || "");
      } else {
        console.error("Unexpected API response:", response);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleClickSubName = (sub) => {
    setactiveLink(sub._id);
    setSubjectId(sub._id);
  };

  const downloadBase64PDF = () => {

    if (!subjectsData) {
      toast.error("No PDF data available to download!");
      return;
    }
    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${subjectsData}`;
    console.log(link.href);
    
    link.download = "document.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
   
  };

  //  this are find method in array subjectid mathc par result return karti hai

  const filteredQuestions = subjectsData?.subjectQuestions?.find(
    (subject) => subject.subjectId === subjectId
  );

  useEffect(() => {
    if (classId) {
      getAllUserSubject();
    } else {
      console.error("classId is not defined");
    }
  }, [classId]);

  return (
    <div className="bg-body-secondary">
      <MainLayout>
        <div className="d-flex justify-content-between p-3">
          <div className="fw-bold fs-5">BHARAT SAT</div>
          <div className="text-center">
            <span className="fw-bold">Dashborad</span>
            <MdKeyboardArrowRight />

            <Link
              className="text-decoration-none fw-bold"
              onClick={() => navigate("/create-exam")}
            >
              BHARAT SAT
            </Link>
          </div>
        </div>
        <div className="p-4 rounded-1 m-4 " style={{ backgroundColor: "#fff" }}>
          <div className="d-flex justify-content-between">
            <div className="fw-bold fs-4">Question Paper</div>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button
                className="btn btn-primary border-0"
                style={{ backgroundColor: "#0a5acc" }}
              >
                Export
              </button>
              <button type="button" class="btn btn-primary fs-6" onClick={downloadBase64PDF}>
                <FaFilePdf />
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-start mt-5  ">
            {subjectsData.subjects?.map((item, index) => {
              return (
                <ul className="nav mb-4 nav-list" key={index}>
                  <li className="nav-item">
                    <Link
                      className={`nav-link  sub-list ${
                        activeLink === item._id ? "sub-list active" : "text-black"
                      }`}
                      href="#"
                      onClick={() => handleClickSubName(item)}
                    >
                      {item.subject_name}
                    </Link>
                  </li>
                </ul>
              );
            })}
          </div>

          {filteredQuestions?.questions.map((q, index) => (
            <div className="mb-4" key={q.questionId}>
              <h5 className="mb-3 fw-bolder">Question {index + 1}</h5>
              <p className="fw-bold">{parse(q.question)}</p>
              <ul>
                {q.options?.map((option, index) => (
                  <div
                    key={index}
                    className="form-check py-1 d-flex justify-content-start"
                  >
                    <label className="form-check-label d-flex align-items-start">
                      <label className="checkbox-wrapper">
                        <input
                         className={`form-check-input ${q.correctOption === index ? "correct-inputBox" : ""}`}
                          type="checkbox"
                          checked={q.correctOption === index}
                          name={`question-${q.questionId}`}
                          id={`option-${q.questionId}-${index}`}
                        />
                      </label>

                      <li  className={`list-unstyled ${q.correctOption === index ? "correct-option fw-bold" : ""}`}>
                        {String.fromCharCode(65 + index)}. &nbsp;
                        {option.replace(/<[^>]*>|nbsp;/g, "")} &nbsp; 
                        {q.correctOption === index ? (
                          <span  className="fw-bold" style={{ color: "#23bc23" }}>
                            Correct Answer
                          </span>
                        ) : (
                          ""
                        )}
                      </li>
                    </label>
                  </div>
                ))}
              </ul>

              {/* subquesttion data  */}

              {q.subQuestions.length > 0 && (
                <div className="mt-4 ps-3 border-start">
                  {q.subQuestions.map((sub, subIndex) => (
                    <div key={sub.subQuestionId} className="mb-3">
                      <p className="fw-bold d-flex gap-2">
                        {" "}
                        {subIndex + 1}. {parse(sub.question)}
                      </p>
                      <ul>
                        {sub.options?.map((option, index) => (
                          <div
                            key={index}
                            className="form-check py-1 d-flex justify-content-start"
                          >
                            <label className="form-check-label d-flex align-items-start">
                              <label className="checkbox-wrapper">
                                <input
                                   className={`form-check-input ${sub.correctOption === index ? "correct-inputBox" : ""}`}
                                  type="checkbox"
                                  name={`sub-question-${sub.subQuestionId}`}
                                  id={`sub-option-${sub.subQuestionId}-${index}`}
                                  checked={sub.correctOption === index}
                                />
                              </label>
                              <li  className={`list-unstyled ${sub.correctOption === index ? "correct-option fw-bold" : ""}`}>
                                {String.fromCharCode(65 + index)}. &nbsp;
                                {option.replace(/<[^>]*>|&nbsp;/g, "")}  &nbsp;
                                {sub.correctOption === index? (
                                  <span className="fw-bold" style={{ color: "#23bc23" }}>
                                    Correct Answer
                                  </span>
                                ) : (
                                  ""
                                )}
                              </li>
                            </label>
                          </div>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </MainLayout>
    </div>
  );
};

export default ViewExam;
