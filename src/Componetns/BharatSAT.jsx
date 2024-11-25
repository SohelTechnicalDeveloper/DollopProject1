import React, { useEffect, useState } from "react";
import MainLayout from "../MainLayout";
import { Link } from "react-router-dom";
import { MdArrowRightAlt } from "react-icons/md";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import "../Styles/BharatSAT.css";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import welldone from "../images/congratulations-well-done.gif";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers";

const BharatSAT = () => {
  const [error, setError] = useState(true);
  const [percent, setPercent] = useState(0);
  const [examName, setExamName] = useState("");
  const [Medium, setMedium] = useState("");
  const [selectClass, setSelectClass] = useState("");
  const [durationTime, setdurationTime] = useState("");
  const [examinationDate, setExaminationDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectSubject, setSelectSubject] = useState("");
  const [questionBank, setQuestionBank] = useState("");
  const [totalQuestions, setTotalQuestion] = useState("");
  const [allClass, setAllClass] = useState([]);
  const [allSubjectsById, setAllSubjectsById] = useState([]);
  console.log(selectClass);
  

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY3MjA5NDQ0OWVlYTA2YTc4OTlmMDU1NSIsImVtYWlsIjoiZG9sbG9wLnlhc2hAZ21haWwuY29tIiwiaWF0IjoxNzMyNTM4MTM3LCJleHAiOjE3MzI2MjQ1Mzd9.hrR8aIEAOLeec1NmHNGwE481YzGaJpvzUjUjN71z-tc";

  const getAllClasses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.27:5003/class/getAllClasses`
      );
      if (response.status === 200) {
        setAllClass(response.data.data);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const getAllSubjects = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.27:5003/subject/getAllSubjects/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            class_id:selectClass,
          },
        }
      );
      if (response.status === 200) {
        setAllSubjectsById(response.data.data);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };


  const createExam = async () => {
    try {
      const response = await axios.post(
        `http://192.168.0.27:5003/bharatSat/create-exam`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        {
          examName,
          Medium,
          selectClass,
          durationTime,
          examinationDate,
          startTime,
          endTime,
          selectSubject,
          questionBank,
          totalQuestions,
        }
      );
      if (response.status === 201) {
        toast.success("Exam Create Success");
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllClasses();
    getAllSubjects();
  }, []);

  const handleClick = () => {
    setError(false);
    setPercent((prevPercent) => Math.min(prevPercent + 50, 100));
  };
  const handleBack = () => {
    setPercent((prev) => Math.max(prev - 50, 0)); // Decrement percentage by 25, min at 0
  };

  return (
    <div className="bg-body-secondary">
      <MainLayout>
        <div className="d-flex justify-content-between p-3">
          <div className="fw-bold">BHARAT SAT</div>
          <div className="">
            <span className="fw-bold">Dashborad</span>-{" "}
            <Link className="text-decoration-none fw-bold">BHARAT SAT</Link>
          </div>
        </div>
        <div className="p-4 rounded-1 m-4 " style={{ backgroundColor: "#fff" }}>
          <div className="fw-bold fs-4 mb-4">Create Bharat SAT Exam</div>
          <div className="p-4">
            {" "}
            {/* this are progress bar */}
            <ProgressBar
              percent={percent}
              filledBackground="linear-gradient(to right, #6a11cb, #2575fc)"
              height={5}
            >
              {/* Step 1 */}
              <Step transition="scale">
                {({ accomplished }) => (
                  <div
                    style={{
                      backgroundColor: accomplished ? "#07284B" : "#e0e0e0",
                      color: accomplished ? "white" : "#000",
                      width: 40,
                      height: 40,
                    }}
                    className="progress-bar"
                    onClick={() => handleBack()}
                  >
                    01
                  </div>
                )}
              </Step>
              {/* Step 2 */}
              <Step transition="scale">
                {({ accomplished }) => (
                  <div
                    style={{
                      backgroundColor: accomplished ? "#07284B" : "#e0e0e0",
                      color: accomplished ? "white" : "#000",
                      width: 40,
                      height: 40,
                    }}
                    className="progress-bar"
                    onClick={percent === 50 ? null : () => handleBack()}
                  >
                    02
                  </div>
                )}
              </Step>
              {/* Step 3 */}
              <Step transition="scale">
                {({ accomplished }) => (
                  <div
                    style={{
                      backgroundColor: accomplished ? "#07284B" : "#e0e0e0",
                      color: accomplished ? "white" : "#000",
                      width: 40,
                      height: 40,
                    }}
                    className="progress-bar"
                  >
                    03
                  </div>
                )}
              </Step>
            </ProgressBar>
          </div>

          {/* create Examination  this template for create question paper*/}

          {percent === 0 ? (
            <>
              <div className="row mt-4 p-2">
                <div className="col-md-6   mb-3">
                  <div className="m-1">
                    <label className="form-label text-black fw-bold">
                      Bharat SAT Exam Name<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Bharat SAT Exam Name"
                      onChange={(e) => setExamName(e.target.value)}
                    />
                    {!error
                      ? !examName && (
                          <label
                            htmlFor=""
                            className=" position-absolute  mb-1 text-danger fw-bolder"
                          >
                            Fields Can't Select
                          </label>
                        )
                      : ""}
                  </div>
                </div>
                <div className="col-md-6  mb-3">
                  <div className="m-1">
                    <label className="form-label text-black fw-bold">
                      Medium <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      value={Medium}
                      onChange={(e) => setMedium(e.target.value)}
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Marathi">Marathi</option>
                      <option value="Semi-English">Semi-English</option>
                    </select>
                    {!error
                      ? !Medium && (
                          <label
                            htmlFor=""
                            className=" position-absolute  mb-1 text-danger fw-bolder"
                          >
                            Fields Can't Select
                          </label>
                        )
                      : ""}
                  </div>
                </div>
                <div className="col-md-6  mb-3">
                  <div className="m-1">
                    <label className="form-label text-black fw-bold">
                      Select Class <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      value={selectClass}
                      onChange={(e) => setSelectClass(e.target.value)}
                    >
                      <option className="fw-bold text-black">Select Class</option>

                      {allClass.map((item) => {
                        return (
                          <option value={item._id}>{item.class_name}</option>
                        );
                      })}
                    </select>
                    {!error
                      ? !selectClass && (
                          <label
                            htmlFor=""
                            className=" position-absolute  mb-1 text-danger fw-bolder"
                          >
                            Fields Can't Select
                          </label>
                        )
                      : ""}
                  </div>
                </div>
                <div className="col-md-6  mb-3">
                  <div className="m-1">
                    <label className="form-label text-black fw-bold">
                      Duration In Mins<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Duration In Mins"
                      onChange={(e) => setdurationTime(e.target.value)}
                    />
                    {!error
                      ? !durationTime && (
                          <label
                            htmlFor=""
                            className=" position-absolute  mb-1 text-danger fw-bolder"
                          >
                            Fields Can't Select
                          </label>
                        )
                      : ""}
                  </div>
                </div>
                <div className="col-md-6  mb-3">
                  <div className="m-1">
                    <label className="form-label text-black fw-bold">
                      Bharat SAT Examinaton Date
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      min={new Date().toISOString().split("T")[0]} // Set min date as today
                    //   minDate={new Date()}
                      placeholder="Bharat SAT Exam Name"
                        onChange={(e) => setExaminationDate(e.target.value)}
                      />
                      {/* <DatePicker
                        className="form-control"
                        selected={examinationDate}
                        placeholderText="Select From Date"
                        dateFormat="dd//mm/yyyy"
                        
                      /> */}
                    {!error
                      ? !examinationDate && (
                          <label
                            htmlFor=""
                            className=" position-absolute  mb-1 text-danger fw-bolder"
                          >
                            Fields Can't Select
                          </label>
                        )
                      : ""}
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  {/* <label className="form-label text-black fw-bold">
                    Exam Timings<span className="text-danger">*</span>
                  </label> */}
                  <label htmlFor="" className="form-label text-black fw-bold">
                    Start Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    className="form-control"
                    placeholder="Start Time"
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>

                <div className="col-md-3 mb-3 ">
                  <label className="form-label text-black fw-bold">
                    End Time
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    className="form-control"
                    placeholder="End Time"
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn mt-3"
                  onClick={() => handleClick()}
                  style={{ backgroundColor: "#07284B", color: "#fff" }}
                >
                  Next <MdArrowRightAlt style={{ fontSize: "22px" }} />
                </button>
                <ToastContainer/>

              </div>
            </>
          ) : percent === 50 ? (
            // this template for create question paper

            <div>
              <div
                className="row  mt-4 p-3 shadow rounded-3 align-items-end mb-3"
                style={{ backgroundColor: "#D3E3FD" }}
              >
                <div className="col-md-6  mb-3 mb-3">
                  <label
                    htmlFor=""
                    style={{ color: "#477de8" }}
                    className="form-label  fw-bold"
                  >
                    Select Subject <span className="text-danger">*</span>
                  </label>
                  <select
                    name="subject"
                    className="form-select"
                    onClick={(e) => setSelectSubject(e.target.value)}
                  >
                    <option value="" className="fw-bold text-black">
                      Select Subject
                    </option>
                    {allSubjectsById?.map((item) => {
                      return (
                        <option value={item._id}>{item.subject_name}</option>
                      );
                    })}
                  </select>
                  {!error
                    ? !selectSubject && (
                        <label
                          htmlFor=""
                          className=" position-absolute  mb-2 text-danger fw-bolder"
                        >
                          Fields Can't Select
                        </label>
                      )
                    : ""}
                </div>

                <div className="col-md-6 mb-3">
                  <label
                    className="form-label  fw-bold"
                    style={{ color: "#477de8" }}
                  >
                    Total No. of Questions from Question Bank{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    name="totalQuestions"
                    className="form-control"
                    placeholder=" Total No. of Questions from Question Bank"
                    onClick={(e) => setQuestionBank(e.target.value)}
                  />
                  {!error
                    ? !questionBank && (
                        <label
                          htmlFor=""
                          className=" position-absolute  mb-1 text-danger fw-bolder"
                        >
                          Fields Can't Empty
                        </label>
                      )
                    : ""}
                </div>

                <div className="col-md-6 mb-3">
                  <label
                    className="form-label  fw-bold"
                    style={{ color: "#477de8" }}
                  >
                    Total No. of Questions from Bharat SAT Question Bank{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    name="totalQuestions"
                    className="form-control"
                    onChange={(e) => setTotalQuestion(e.target.value)}
                    placeholder="Total No. of Questions from Bharat SAT Question Bank"
                  />
                  {!error
                    ? !totalQuestions && (
                        <label
                          htmlFor=""
                          className=" position-absolute  mb-1 text-danger fw-bolder"
                        >
                          Fields Can't Empty
                        </label>
                      )
                    : ""}
                </div>
              </div>
              <div
                className="fw-bold "
                style={{ color: "#477de8", cursor: "pointer" }}
              >
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
                  onClick={() => {
                    handleClick();
                  }}
                >
                  Submit <MdArrowRightAlt style={{ fontSize: "22px" }} />
                </button>

                <ToastContainer/>

              </div>
            </div>
          ) : (
            // this are well done template

            <div className=" text-center my-5">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <img
                    src={welldone}
                    alt="Success Illustration"
                    className="img-fluid mb-4 rounded-5"
                    height={270}
                    width={270}
                  />
                  <h3 className="text-primary fw-bold">
                    Well Done! <span className="fs-5">🤩😎</span>
                  </h3>
                  <p className="text-black fw-bolder">
                    You have successfully created exam
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-4">
                <div className="text-start">
                  <button
                    className="btn text-primary border-0"
                    style={{ fontSize: "18px" }}
                    onClick={() => handleBack()}
                  >
                    {" "}
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
              <ToastContainer/>
              </div>
            </div>
          )}
        </div>
      </MainLayout>
    </div>
  );
};

export default BharatSAT;
