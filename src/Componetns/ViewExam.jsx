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
  const navigate = useNavigate()
  const location = useLocation()

  const { classId } = location.state || {};
  console.log(classId);
  

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY3MjA5NDQ0OWVlYTA2YTc4OTlmMDU1NSIsImVtYWlsIjoiZG9sbG9wLnlhc2hAZ21haWwuY29tIiwiaWF0IjoxNzMyNzczODc5LCJleHAiOjE3MzI4NjAyNzl9.A_QvoXiGvhrwUGRhDfkzHc_h6yvyPeiCNd8ByYQt38c";

  const getAllUserSubject = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.27:5003/bharatSat/bharatSat-question-paper/`,
        {
          params: {
            classId: classId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setSubjectsData(response.data.data);
        console.log(response.data.data.subjectQuestions.questions);
        setactiveLink(response.data.data.subjects[0].subject_name);
        setactiveLink(response.data.data.subjects[0].subjectId);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleClickSubName = (sub) => {
    setactiveLink(sub.subject_name);
    setSubjectId(sub._id);
  };
  const filteredQuestions = subjectsData?.subjectQuestions?.find(
    (subject) => subject.subjectId === subjectId
  );

  

  useEffect(() => {
    getAllUserSubject();
  }, []);
  return (
    <div className="bg-body-secondary">
      <MainLayout>
        <div className="d-flex justify-content-between p-3">
          <div className="fw-bold">BHARAT SAT</div>
          <div className="text-center">
            <span className="fw-bold">Dashborad</span>
            <MdKeyboardArrowRight />

            <Link className="text   -decoration-none fw-bold" onClick={()=>navigate('/create-exam')}>BHARAT SAT</Link>
          </div>
        </div>
        <div className="p-4 rounded-1 m-4 " style={{ backgroundColor: "#fff" }}>
          <div className="d-flex justify-content-between">
            <div className="fw-bold fs-4">Question Paper</div>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button
                className="btn btn-primary border-0"
                style={{ backgroundColor: "#07284B" }}
              >
                Export
              </button>
              <button type="button" class="btn btn-primary fs-6">
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
                        activeLink === item.subject_name
                          ? "active"
                          : "text-black"
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
                          className="form-check-input"
                          type="checkbox"
                          checked={q.correctOption === index}
                          name={`question-${q.questionId}`}
                          id={`option-${q.questionId}-${index}`}
                        />
                      </label>

                      <li className="list-unstyled">
                        {String.fromCharCode(65 + index)}. &nbsp;
                        {option.replace(/<[^>]*>/g, "")}
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
                      <h6 className="fw-bolder">Sub Question {subIndex + 1}</h6>
                      <p className="fw-bold">{parse(sub.question)}</p>
                      <ul>
                        {sub.options?.map((option, index) => (
                          <div
                            key={index}
                            className="form-check py-1 d-flex justify-content-start"
                          >
                            <label className="form-check-label d-flex align-items-start">
                              <label className="checkbox-wrapper">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name={`sub-question-${sub.subQuestionId}`}
                                  id={`sub-option-${sub.subQuestionId}-${index}`}
                                  checked={sub.correctOption === index}
                                />
                              </label>
                              <li className="list-unstyled">
                                {String.fromCharCode(65 + index)}. &nbsp;
                                {option.replace(/<[^>]*>/g, "")}
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
