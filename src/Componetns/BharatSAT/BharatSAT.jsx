import React, { useEffect, useState } from "react";
import MainLayout from "../../MainLayout";
import { Link, useLocation } from "react-router-dom";
import { MdArrowRightAlt } from "react-icons/md";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import "../../Styles/BharatSAT.css";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import welldone from "../../images/congratulations-well-done.gif";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment-timezone";
import { RiDeleteBinLine } from "react-icons/ri";
const BharatSAT = () => {
  const [sections, setSections] = useState([
    { subjectId: "", questionBank: "", totalQuestions: "" },
  ]);
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
  const [bharatSatId, setBharatSatId] = useState("");

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY3MmI2MTNhYzQ2ZWEyN2EzNzBhYmVhMyIsImVtYWlsIjoiYW5raXRjaG91aGFuLmRvbGxvcEBnbWFpbC5jb20iLCJpYXQiOjE3MzM3Mjk0NjAsImV4cCI6MTczMzgxNTg2MH0.ZQSe-mHO83fDXiWy0W2dF8FZSNDs98dLlHCxHOXTCSE";
  const location = useLocation();

  const { Data } = location.state || {};

  useEffect(() => {
    if (Data) {
      setBharatSatId(Data.bharatSatExamId);
      setExamName(Data.bharatSatExamName);
      setMedium(Data.medium);
      setExaminationDate(Data.bharatSatExamDate);

      setSelectClass(Data.class_id);
      setdurationTime(Data.durationInMinutes);
      setStartTime(Data.examStartTime);
      setEndTime(Data.examEndTime);

      // Set subject data for each section

      const updatedSections = Data.subjectData.map((subjectItem) => ({
        subjectId: subjectItem.subjectId,
        questionBank: subjectItem.numberOfQuestionsBank,
        totalQuestions: subjectItem.numberOfQuestionsBharatSat,
      }));

      setSections(Data.subjectData, "updated dat");
      console.log(Data.subjectData, "yufdtrv");

      // Set initial subject, questionBank, and totalQuestions based on the first subject data
      if (Data.subjectData.length > 0) {
        setSelectSubject(Data.subjectData[0].subjectId);
        setQuestionBank(Data.subjectData[0].numberOfQuestionsBank);
        setTotalQuestion(Data.subjectData[0].numberOfQuestionsBharatSat);
      }
    }
  }, [Data]);

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
  const getAllSubjects = async (classId) => {
    try {
      const response = await axios.get(
        `http://192.168.0.27:5003/subject/getAllSubjects/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            class_id: classId,
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

  const calculateTimeDifference = (start, end) => {
    /* ye descutring method hai hour and minute ke liye*/

    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    // Convert hours and minutes to total minutes
    const startInMinutes = startHour * 60 + startMinute;
    const endInMinutes = endHour * 60 + endMinute;
    return endInMinutes - startInMinutes;
  };
  const createExam = async () => {
    let errorMessage = "";

    // Validation for each required field
    sections.map((section, index) => {
      if (!section.subjectId) {
        errorMessage = `Subject is required for section ${index + 1}`;
      } else if (
        !section.numberOfQuestionsBank ||
        section.numberOfQuestionsBank <= 0
      ) {
        errorMessage = `Valid questionBank is required for section ${
          index + 1
        }`;
      } else if (
        section.numberOfQuestionsBank > section.numberOfQuestionsBank ||
        section.numberOfQuestionsBank < 0
      ) {
        errorMessage = `Question Bank should be between 0 and ${section.numberOfQuestionsBank}`;
      } else if (
        !section.numberOfQuestionsBharatSat ||
        section.numberOfQuestionsBharatSat <= 0
      ) {
        errorMessage = `Valid numberOfQuestionsBharatSat is required for section ${
          index + 1
        }`;
      } else if (
        section.numberOfQuestionsBharatSat > section.bharatSatQuestionCount ||
        section.numberOfQuestionsBharatSat < 0
      ) {
        errorMessage = `Total Questions should be between 0 and ${section.bharatSatQuestionCount}`;
      }
    });
    const subjectData = sections.map((section) => ({
      subjectId: section.subjectId,
      numberOfQuestionsBank: section.questionBank,
      numberOfQuestionsBharatSat: section.numberOfQuestionsBharatSat,
    }));
    console.log(subjectData, "subjectdata");

    if (errorMessage) {
      setError(true);
      toast.error(errorMessage);
      return;
    }

    const response = await axios.post(
      `http://192.168.0.27:5003/bharatSat/create-exam`,
      {
        bharatSatExamId: bharatSatId ? bharatSatId : "",
        bharatSatExamName: examName,
        medium: Medium,
        class_id: selectClass,
        durationInMinutes: durationTime,
        bharatSatExamDate: examinationDate,
        examStartTime: startTime,
        examEndTime: endTime,
        subjectData: sections,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log(response.data.data, "response");

      if (bharatSatId) {
        alert(bharatSatId)
        setTimeout(() => {
          toast.success(response.data.message);
          
        }, 1000);
      setPercent((prevPercent) => Math.min(prevPercent + 50, 100));

      } else {
        toast.success("Exam Create Success");
        setPercent((prevPercent) => Math.min(prevPercent + 50, 100));
      }
      setTimeout(() => {
        setSections([
          { subject: "", questionBank: "", numberOfQuestionsBharatSat: "" },
        ]); // Reset sections
      }, 2000);
    }
  };

  // const createExam = async () => {
  //   let errorMessage = "";

  //   if (!selectSubject) {
  //     errorMessage = "selectSubject is required";
  //   } else if (!questionBank) {
  //     errorMessage = "questionBank is required";
  //   } else if (!numberOfQuestionsBharatSat) {
  //     errorMessage = "numberOfQuestionsBharatSat  is required";
  //   }
  //   if (selectClass === Data.class_id) {
  //     setQuestionBank("");
  //     setTotalQuestion("");
  //   }

  //   if (errorMessage) {
  //     setError(false);
  //     toast.error(errorMessage);
  //     return;
  //   } else {
  //     const response = await axios.post(
  //       `http://192.168.0.27:5003/bharatSat/create-exam`,
  //       {
  //         bharatSatExamId: bharatSatId ? bharatSatId : "",
  //         bharatSatExamName: examName,
  //         medium: Medium,
  //         class_id: selectClass,
  //         durationInMinutes: durationTime,
  //         bharatSatExamDate: examinationDate,
  //         examStartTime: startTime,
  //         examEndTime: endTime,
  //         subjectId: selectSubject,
  //         numberOfQuestionsBank: questionBank,
  //         numberOfQuestionsBharatSat: numberOfQuestionsBharatSat,
  //         subjectData: [
  //           {
  //             subjectId: selectSubject,
  //             numberOfQuestionsBank: questionBank,
  //             numberOfQuestionsBharatSat: numberOfQuestionsBharatSat,
  //           },
  //         ],
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (response.status === 200) {
  //       if (bharatSatId) {
  //         toast.success(response.data.message);
  //       } else {
  //         toast.success("Exam Create Success");
  //       }

  //       setTimeout(() => {
  //         setPercent((prevPercent) => Math.min(prevPercent + 50, 100));
  //       }, 2000);
  //       setExamName("");
  //       setMedium("");
  //       setSelectClass("");
  //       setdurationTime("");
  //       setExaminationDate("");
  //       setStartTime("");
  //       setEndTime("");
  //       setSelectSubject("");
  //       setQuestionBank("");
  //       setTotalQuestion("");
  //     }
  //   }
  // };

  // const SubjectData = (e) => {
  //   setSelectSubject(e.target.value);
  //   const data = allSubjectsById.find((item) => item._id === e.target.value);
  //   setSubjectDataById(data);
  // };

  useEffect(() => {
    getAllClasses();
    if (selectClass) {
      getAllSubjects(selectClass);
    }
  }, [selectClass]);

  const handleClick = () => {
    let errorMessage = "";
    if (!examName) {
      errorMessage = "Exam Name is required";
    } else if (!Medium) {
      errorMessage = "Medium is required";
    } else if (!selectClass) {
      errorMessage = "Class  is required";
    } else if (!durationTime) {
      errorMessage = "Duration time  is required";
    } else if (!examinationDate) {
      errorMessage = "examination Date is required";
    } else if (!startTime) {
      errorMessage = "start time is required";
    } else if (!endTime) {
      errorMessage = "End time is required";
    }
    if (errorMessage) {
      setError(false);
      toast.error(errorMessage);
      return;
    }
    if (startTime && endTime) {
      const timeDifference = calculateTimeDifference(startTime, endTime);
      console.log(timeDifference);
      setdurationTime(timeDifference);
      if (timeDifference == durationTime) {
        toast.success("Time match success");
        setError(true);
        setTimeout(() => {
          setPercent((prevPercent) => Math.min(prevPercent + 50, 100));
        }, 2000);
      } else {
        toast.error(
          `Exam Timing does not match the ${durationTime} duration time.`
        );
      }
    }
  };
  const handleBack = (decrementValue) => {
    setPercent((prev) => Math.max(prev - decrementValue, 0)); // Decrement percentage by 50, min at 0
  };

  const handleChange = (e) => {
    const rawDate = e.target.value; // Get raw value (YYYY-MM-DD format)
    if (rawDate) {
      // Convert it to desired format (MM-DD-YYYY)
      const formattedDate = moment(rawDate, "YYYY-MM-DD").format("MM-DD-YYYY");
      setExaminationDate(formattedDate);
    }
  };

  const handleAddMore = () => {
    setSections([
      ...sections,
      {
        subjectId: "",
        numberOfQuestionsBank: "",
        numberOfQuestionsBharatSat: "",
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index] = { ...updatedSections[index], [field]: value };
    setSections(updatedSections);
    console.log(updatedSections, "updated section create");
  };

  const handleRemoveLast = () => {
    setSections((prevSections) => prevSections.slice(0, -1)); // Remove the last item
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
                    onClick={() => handleBack(50)}
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
                    onClick={percent === 50 ? null : () => handleBack(50)}
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
                      value={examName}
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
                      <option className="fw-bold" value="">
                        Select Medium
                      </option>
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
                      <option value="" className="fw-bold text-black">
                        Select Class
                      </option>

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
                      type="number"
                      value={durationTime}
                      className="form-control"
                      placeholder="Duration In Mins"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value >= 0 || value === "") {
                          setdurationTime(value); //
                        }
                      }}
                    />
                    {!error
                      ? (!durationTime || durationTime < 0) && (
                          <label
                            htmlFor=""
                            className=" position-absolute  mb-1 text-danger fw-bolder"
                          >
                            {durationTime < 0
                              ? "Please  enter  positive number"
                              : "Fields Can't Select"}
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
                    {/* <DatePicker
                    wrapperClassName="w-100"
                    className="form-control"
                    selected={examinationDate}
                    dateFormat="MM-dd-yyyy"
                    onChange={(e) => {
                      setExaminationDate(moment(e).format("MM-DD-YYYY"));
                    }}
                    minDate={new Date()}
                    placeholderText="MM/DD/YYYY"
                    showMonthDropdown
                    showYearDropdown
                  /> */}
                    <input
                      type="date"
                      className="form-control"
                      value={
                        examinationDate
                          ? moment(examinationDate, "MM-DD-YYYY").format(
                              "YYYY-MM-DD"
                            ) // Convert back to YYYY-MM-DD for input display
                          : ""
                      }
                      placeholder="Bharat SAT Exam Name"
                      onChange={handleChange}
                    />
                    {/* <MdOutlineDateRange
                      style={{
                        position: "relative",
                        top: "-34px",
                        left: "94%",
                      }}
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
                  <label htmlFor="" className="form-label text-black fw-bold">
                    Start Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    value={startTime}
                    name="startTime"
                    className="form-control"
                    placeholder="Start Time"
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                  {!error
                    ? !startTime && (
                        <label
                          htmlFor=""
                          className=" position-absolute  mb-1 text-danger fw-bolder"
                        >
                          Fields Can't Empty
                        </label>
                      )
                    : ""}
                </div>

                <div className="col-md-3 mb-3 ">
                  <label className="form-label text-black fw-bold">
                    End Time
                  </label>

                  <input
                    type="time"
                    id="endTime"
                    value={endTime}
                    name="endTime"
                    className="form-control"
                    placeholder="End Time"
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                  {!error
                    ? !endTime && (
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

              <div className="d-flex justify-content-end mt-3 ">
                <div className="btn-group " onClick={() => handleClick()}>
                  <button
                    type="submit"
                    className="btn "
                    style={{ backgroundColor: "#07284B", color: "#fff" }}
                  >
                    Next
                  </button>
                  <button
                    type="submit"
                    className="btn rounded-end-3  w-50  bg-primary text-white"
                  >
                    <MdArrowRightAlt style={{ fontSize: "22px" }} />
                  </button>
                  <ToastContainer />
                </div>
              </div>
            </>
          ) : percent === 50 ? (
            // this template for create question paper
            <div>
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="row mt-4 p-3 shadow rounded-3 align-items-end mb-3"
                  style={{ backgroundColor: "#D3E3FD" }}
                >
                  <div className="col-md-6 mb-3">
                    <label
                      style={{ color: "#477de8" }}
                      className="form-label fw-bold"
                    >
                      Select Subject <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      value={section.subjectId} // Bind to section's subject
                      onChange={(e) =>
                        handleInputChange(index, "subjectId", e.target.value)
                      }
                    >
                      <option value="" className="fw-bold text-black d-none">
                        Select Subject
                      </option>
                      {allSubjectsById?.map((item) => (
                        <option className={sections?.some((sub)=>sub.subjectId===item._id)&&'d-none'} key={item._id} value={item._id}>
                          {item.subject_name}
                        </option>
                      ))}
                    </select>
                    {!error
                      ? !section.subjectId && (
                          <label className="position-absolute mb-2 text-danger fw-bolder">
                            Subject is required
                          </label>
                        )
                      : ""}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label
                      className="form-label fw-bold"
                      style={{ color: "#477de8" }}
                    >
                      Total No. of Questions from Question Bank{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Total No. of Questions from Question Bank"
                      value={section.numberOfQuestionsBank} // Use section's value here
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "numberOfQuestionsBank",
                          e.target.value
                        )
                      }
                    />
                    {!section.numberOfQuestionsBank && (
                      <label className="position-absolute mb-1 text-danger fw-bolder">
                        Field can't be empty!
                      </label>
                    )}
                    {section.numberOfQuestionsBank < 0 && (
                      <label className="position-absolute mb-1 text-danger fw-bolder">
                        Invalid number of Questions!
                      </label>
                    )}
                    {section.numberOfQuestionsBank >
                      section.numberOfQuestionsBank && (
                      <label className="position-absolute mb-1 text-danger fw-bolder">
                        Please enter a number between 0 and{" "}
                        {section.numberOfQuestionsBank}
                      </label>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label
                      className="form-label fw-bold"
                      style={{ color: "#477de8" }}
                    >
                      Total No. of Questions from Bharat SAT Question Bank{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Total No. of Questions from Bharat SAT Question Bank"
                      value={section.numberOfQuestionsBharatSat} // Use section's value here
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "numberOfQuestionsBharatSat",
                          e.target.value
                        )
                      }
                    />
                    {!section.numberOfQuestionsBharatSat && (
                      <label className="position-absolute mb-1 text-danger fw-bolder">
                        Field can't be empty!
                      </label>
                    )}
                    {section.numberOfQuestionsBharatSat < 0 && (
                      <label className="position-absolute mb-1 text-danger fw-bolder">
                        Invalid number of Questions!
                      </label>
                    )}
                    {section.numberOfQuestionsBharatSat >
                      section.numberOfQuestionsBharatSat && (
                      <label className="position-absolute mb-1 text-danger fw-bolder">
                        Please enter a number between 0 and{" "}
                        {section.numberOfQuestionsBharatSat}
                      </label>
                    )}
                  </div>
                </div>
              ))}
              <div className="d-flex justify-content-between mb-3">
                <div
                  className="fw-bold"
                  style={{ color: "#477de8", cursor: "pointer" }}
                  onClick={handleAddMore}
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
                <div>
                  {sections.length !== 1 ? (
                    <div
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        borderRadius: "3px",
                        padding: "3px",
                        cursor: "pointer",
                        fontSize: "25px",
                      }}
                      onClick={handleRemoveLast}
                    >
                      <RiDeleteBinLine /> <span className="fs-6">Delete</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-end mt-3">
                <ToastContainer  />
                <div className="btn-group">
                  <button
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: "#07284B", color: "#fff" }}
                    onClick={() => createExam()}
                  >
                    Submit
                  </button>
                </div>
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
                    {!bharatSatId
                      ? `You have successfully created exam`
                      : `You have successfully Updated exam`}
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-between  mt-4">
                <button
                  className="btn text-primary border-0 d-flex align-items-center"
                  style={{ fontSize: "18px" }}
                  onClick={() => handleBack(50)}
                >
                  <HiOutlineArrowNarrowLeft />
                  &nbsp;Back
                </button>
                <button
                  onClick={() => handleBack(100)}
                  className="btn truncate w-25"
                  style={{ backgroundColor: "#07284B", color: "#fff" }}
                  title="Create Bharat SAT Exam +"
                >
                  Create Bharat SAT Exam +
                </button>
              </div>
              <ToastContainer />
            </div>
          )}
        </div>
      </MainLayout>
    </div>
  );
};

export default BharatSAT;
