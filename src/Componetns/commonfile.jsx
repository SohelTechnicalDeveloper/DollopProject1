 
//         //  table header 
 
//  {/* <h2 style={{ color: "#07284B", marginLeft: "25px" }}>Users</h2>

//         <div
//           className="form-group d-flex justify-content-end mx-5 mt-4"
//           style={{ fontFamily: "Gill Sans, sans-serif" }}
//         >
//           <div className="mx-4">
//             <input
//               type="text"
//               className="form-control input-color"
//               placeholder="Search"
//               onChange={(e) => searchUser(e)}
//             />
//           </div>
//           <button
//             onClick={() => addShowModel()}
//             className="btn text-truncate"
//             style={{
//               backgroundColor: "#21b7b5",
//               color: "#fff",
//               fontSize: "18px",
//             }}
//           >
//             {" "}
           
//           </button>
//         </div> */}


//       //  button for the total question no

      
//         // {Array.from({ length: totalQuestions }).map((_, index) => (
//         //   <button
//         //     key={index}
//         //     className={`btn m-1  ${
//         //       questionStatus[index] === 'answered'
//         //         ? 'btn-success'
//         //         : questionStatus[index] === 'notAnswered'
//         //         ? 'btn-warning'
//         //         : 'btn-secondary'
//         //     }`}
//         //     onClick={() => handleQuestionClick(index)}
//         //   >
//         //     {index + 1}
//         //   </button>
//         // ))}
//          {/* <div className="fw-bold">
//                     {subjectsData?.subjectQuestions?.[subject]?.questions?.[
//                       currentIndex
//                     ]?.question
//                       ? parse(
//                           String(
//                             subjectsData.subjectQuestions[subject].questions[
//                               currentIndex
//                             ]?.question
//                           ),
//                           options
//                         )
//                       : "No question available"}
//                   </div> */}




//                    // const handleSubQuestion = (questionId, subQuestionId, index) => {
//   //   console.log(questionId, subQuestionId, index);

//   //   setSubSelectedOptions((prevSubOptions) => {
//   //     const existingPrevSelection = prevSubOptions.findIndex(
//   //       (subOption) =>
//   //         subOption.questionId === questionId &&
//   //         subOption.subQuestionId === subQuestionId
//   //     );
//   //     console.log(existingPrevSelection !== -1);

//   //     if (existingPrevSelection !== -1) {
//   //       if (prevSubOptions[existingPrevSelection]?.index === index) {
//   //         return prevSubOptions.filter(
//   //           (subOption, index) => index !== existingPrevSelection
//   //         );
//   //       } else {
//   //         return prevSubOptions.map((subOption, i) =>
//   //           i === existingPrevSelection ? { ...subOption, index } : subOption
//   //         );
//   //       }
//   //     } else {
//   //       setSubSelectedOptions([
//   //         ...prevSubOptions,
//   //         { questionId, subQuestionId, index },
//   //       ]);
//   //     }
//   //   });
//   // };
  
//   // const handleQuestion = (questionId, index) => {
//   //   setSelectedOptions((prevOptions) => {
//   //     const existingSelection = prevOptions.findIndex(
//   //       (option) => option.questionId === questionId
//   //     );
  
//   //     if (existingSelection !== -1) {
//   //       // Toggle selection if the same option is clicked again
//   //       if (prevOptions[existingSelection]?.index === index) {
//   //         return prevOptions.filter(
//   //           (option, idx) => idx !== existingSelection
//   //         );
//   //       } else {
//   //         return prevOptions.map((option, i) =>
//   //           i === existingSelection ? { ...option, index } : option
//   //         );
//   //       }
//   //     } else {
//   //       // Add new selected option
//   //       return [...prevOptions, { questionId, index }];
//   //     }
//   //   });
  
//   //   // Update question status to "answered"
//   //   setQuestionStatus((prevStatus) =>
//   //     prevStatus.map((status, idx) =>
//   //       idx === currentQuestion ? "answered" : status
//   //     )
//   //   );
//   // };



//    // Function to simulate a countdown timer
//   // useEffect(() => {
//   //   const timer = setInterval(() => {
//   //     setTimeLeft(prevTime => {
//   //       const { hours, minutes, seconds } = prevTime;
//   //       if (seconds > 0) {
//   //         return { ...prevTime, seconds: seconds - 1 };
//   //       } else if (minutes > 0) {
//   //         return { hours, minutes: minutes - 1, seconds: 59 };
//   //       } else if (hours > 0) {
//   //         return { hours: hours - 1, minutes: 59, seconds: 59 };
//   //       }
//   //       return prevTime;
//   //     });
//   //   }, 1000);

//   //   return () => clearInterval(timer);
//   // }, []);
//   import React, { useState } from "react";
//   import { Table, Pagination } from "react-bootstrap";
  
//   const ExamList = () => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const rowsPerPage = 10;
  
//     // Dummy data for demonstration
//     const examData = [
//       { id: 1, name: "oplk;", class: "12th", medium: "English", date: "27/11/2024", startTime: "4:54 AM", endTime: "5:35 AM" },
//       { id: 2, name: "rgvf", class: "6th", medium: "English", date: "29/11/2024", startTime: "6:59 AM", endTime: "5:59 AM" },
//       { id: 3, name: "dhgb v", class: "12th", medium: "English", date: "29/11/2024", startTime: "11:05 PM", endTime: "11:20 PM" },
//       { id: 4, name: "vsdvfds", class: "6th", medium: "Bangali", date: "30/11/2024", startTime: "6:50 PM", endTime: "9:50 PM" },
//       { id: 5, name: "Create New Exam", class: "12th", medium: "Marathi", date: "27/11/2024", startTime: "6:47 PM", endTime: "7:47 PM" },
//       { id: 6, name: "hfghfh", class: "8th", medium: "English", date: "28/11/2024", startTime: "5:47 PM", endTime: "5:49 PM" },
//       { id: 7, name: "hjfgh", class: "8th", medium: "Hindi", date: "29/11/2024", startTime: "5:40 PM", endTime: "10:35 PM" },
//       { id: 8, name: "sohel khan", class: "8th", medium: "Hindi", date: "06/12/2024", startTime: "5:47 PM", endTime: "5:47 PM" },
//       { id: 9, name: "afdj", class: "8th", medium: "English", date: "05/12/2024", startTime: "5:44 PM", endTime: "5:44 PM" },
//       { id: 10, name: "New Exam", class: "9th", medium: "Marathi", date: "29/11/2024", startTime: "10:22 PM", endTime: "10:22 PM" },
//       // Add more rows as needed...
//     ];
  
//     // Pagination logic
//     const totalPages = Math.ceil(examData.length / rowsPerPage);
//     const handleChangePage = (pageNumber) => {
//       setCurrentPage(pageNumber);
//     };
  
//     const startIndex = (currentPage - 1) * rowsPerPage;
//     const paginatedData = examData.slice(startIndex, startIndex + rowsPerPage);
  
//     return (
//       <div className="container mt-4">
//         <h4>Bharat SAT Exam List</h4>
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>
//                 <input type="checkbox" />
//               </th>
//               <th>Sr No.</th>
//               <th>Bharat SAT Exam Name</th>
//               <th>Class</th>
//               <th>Medium</th>
//               <th>Exam Date</th>
//               <th>Exam Start Time</th>
//               <th>Exam End Time</th>
//               <th>View Question Paper</th>
//               <th>Generate E-Hall Ticket</th>
//               <th>Current Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((exam, index) => (
//               <tr key={exam.id}>
//                 <td>
//                   <input type="checkbox" />
//                 </td>
//                 <td>{startIndex + index + 1}</td>
//                 <td>{exam.name}</td>
//                 <td>{exam.class}</td>
//                 <td>{exam.medium}</td>
//                 <td>{exam.date}</td>
//                 <td>{exam.startTime}</td>
//                 <td>{exam.endTime}</td>
//                 <td>
//                   <a href="#">View</a>
//                 </td>
//                 <td>
//                   <a href="#">Generate</a>
//                 </td>
//                 <td>
//                   <input type="checkbox" defaultChecked />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//         {/* Pagination Component */}
//         <Pagination className="justify-content-center">
//           {[...Array(totalPages)].map((_, index) => (
//             <Pagination.Item
//               key={index}
//               active={currentPage === index + 1}
//               onClick={() => handleChangePage(index + 1)}
//             >
//               {index + 1}
//             </Pagination.Item>
//           ))}
//         </Pagination>
//       </div>
//     );
//   };
  
//   export default ExamList;
  
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import MainLayout from "../MainLayout";
// import { MdDeleteOutline } from "react-icons/md";
// import { Link } from "react-router-dom";
// import { GoPlus } from "react-icons/go";

// const CreateExam = () => {
//   const [ExamData, setExamData] = useState([]);
//   const [limit] = useState(10); // Records per page
//   const [page, setPage] = useState(1); // Current page (1-indexed)
//   const [totalRecords, setTotalRecords] = useState(0); // Total records count
//   const [search, setSearch] = useState("");

//   const token = "your-auth-token-here"; // Replace with your actual token

//   const getAllExam = async () => {
//     try {
//       const response = await axios.get(
//         `http://192.168.0.27:5003/bharatSat/list-all-exam`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           params: {
//             offset: (page - 1) * limit, // Calculate offset based on current page
//             limit: limit,
//             searchQuery: search,
//           },
//         }
//       );

//       if (response.status === 200) {
//         setExamData(response.data.data || []); // Update table data
//         setTotalRecords(response.data.totalRecords || 0); // Safely set total records
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.error || "Failed to fetch data");
//     }
//   };

//   useEffect(() => {
//     getAllExam();
//   }, [page, search]); // Re-fetch data on page or search change

//   const totalPages = Math.max(Math.ceil(totalRecords / limit), 1); // Ensure at least 1 page

//   return (
//     <div className="bg-body-secondary">
//       <MainLayout>
//         <div className="d-flex justify-content-between p-2">
//           <div className="fw-bold">BHARAT SAT</div>
//           <div>
//             <span className="fw-bold">Dashboard</span> -{" "}
//             <Link className="text-decoration-none fw-bold">BHARAT SAT</Link>
//           </div>
//         </div>
//         <div className="p-4  rounded-1 m-4" style={{ backgroundColor: "#fff" }}>
//           <div>
//             <div className="fw-bold fs-4 mb-4">Create Bharat SAT Exam</div>
//             <div className="d-flex gap-3  justify-content-between text-center">
//                 <div>
//                   <MdDeleteOutline
//                     className="exam-deleteBtn"
//                     style={{
//                       backgroundColor: "#efd7da",
//                       fontSize: "35px",
//                       color: "#fff",
//                       borderRadius: "3px",
//                       padding: "3px",
//                       cursor: "pointer",
//                     }}
//                   />
//                 </div>
//                 <div className="d-flex gap-4 ">
//                   <div>
//                     <input
//                       id="input1"
//                       type="search"
//                       className="form-control w-100"
//                       placeholder="Search User"
//                       onChange={(e) => setSearch(e.target.value)}
//                     />
//                   </div>
//                   <div className="d-flex justify-content-end">
//                     <div className="btn-group">
//                       <button
//                         type="submit"
//                         className="btn"
//                         style={{ backgroundColor: "#07284B", color: "#fff" }}
//                       >
//                         Submit
//                       </button>
//                       <button
//                         type="submit"
//                         className="btn rounded-end-3 w-50 bg-primary text-white"
//                       >
//                         <GoPlus style={{ fontSize: "18px" }} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//             </div>
//           </div>

//           <div className="mt-4 table-scroller overflow-auto ">
//             <table className="table p-3">
//               <thead className="table-primary text-center">
//                 <tr>
//                   <th>
//                     <input
//                       type="checkbox"
//                       style={{
//                         width: "18px",
//                         height: "20px",
//                         cursor: "pointer",
//                       }}
//                     />
//                   </th>
//                   <th>Sr No.</th>
//                   <th>Bharat SAT Exam Name</th>
//                   <th>Class</th>
//                   <th>Medium</th>
//                   <th>Exam Date</th>
//                   <th>Exam Start Time</th>
//                   <th>Exam End Time</th>
//                   <th>View Question Paper</th>
//                   <th>Generate E-Hall Ticket</th>
//                   <th>Current Status</th>
//                 </tr>
//               </thead>
//               <tbody className="mx-3 text-center">
//                 {ExamData.length > 0 ? (
//                   ExamData.map((item, index) => (
//                     <tr key={item.id}>
//                       <td>
//                         <input
//                           type="checkbox"
//                           style={{
//                             width: "18px",
//                             height: "20px",
//                             cursor: "pointer",
//                           }}
//                         />
//                       </td>
//                       <td>{(page - 1) * limit + index + 1}</td>
//                       <td>{item.bharatSatExamName}</td>
//                       <td>{item.className}</td>
//                       <td>{item.medium}</td>
//                       <td>{item.bharatSatExamDate}</td>
//                       <td>{item.examStartTime}</td>
//                       <td>{item.examEndTime}</td>
//                       <td>
//                         <Link>View</Link>
//                       </td>
//                       <td>
//                         <Link>Generate</Link>
//                       </td>
//                       <td>
//                         <div className="form-switch d-flex justify-content-center align-items-center">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             checked={item.is_active}
//                           />
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="11">No data found</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <nav aria-label="Page navigation example">
//             <ul className="pagination justify-content-end mt-4">
//               <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
//                 <button
//                   className="page-link"
//                   onClick={() => setPage(page - 1)}
//                   disabled={page === 1}
//                 >
//                   &laquo; Previous
//                 </button>
//               </li>

//               {Array.from({ length: totalPages }).map((_, index) => (
//                 <li
//                   key={index}
//                   className={`page-item ${page === index + 1 ? "active" : ""}`}
//                 >
//                   <button
//                     className="page-link"
//                     onClick={() => setPage(index + 1)}
//                   >
//                     {index + 1}
//                   </button>
//                 </li>
//               ))}

//               <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
//                 <button
//                   className="page-link"
//                   onClick={() => setPage(page + 1)}
//                   disabled={page === totalPages}
//                 >
//                   Next &raquo;
//                 </button>
//               </li>
//             </ul>
//           </nav>
//         </div>

//         <ToastContainer />
//       </MainLayout>
//     </div>
//   );
// };
import React, { useState } from "react";

const QuestionViewer = ({ subjectsData }) => {
  const [activeSubjectId, setActiveSubjectId] = useState(null);

  // Handle subject click and set the active subject ID
  const handleClickSubName = (subject) => {
    setActiveSubjectId(subject.subjectId); // Match `subjectId` from the data
  };

  // Filter questions based on the active subject ID
  const filteredQuestions = subjectsData.subjectQuestions.find(
    (subject) => subject.subjectId === activeSubjectId
  );

  return (
    <div className="container mt-4">
      {/* Subject Name Buttons */}
      <div className="d-flex mb-4">
        {subjectsData.subjectQuestions.map((subject, index) => (
          <button
            key={subject.subjectId}
            className={`btn ${
              activeSubjectId === subject.subjectId ? "btn-primary" : "btn-outline-primary"
            } me-2`}
            onClick={() => handleClickSubName(subject)}
          >
            Subject {index + 1}
          </button>
        ))}
      </div>

      {/* Render Questions for Selected Subject */}
      {filteredQuestions ? (
        filteredQuestions.questions.map((q, index) => (
          <div className="mb-4" key={q.questionId}>
            <h5 className="mb-3">Question {index + 1}</h5>
            <p dangerouslySetInnerHTML={{ __html: q.question }}></p>

            <div className="row">
              {q.options.map((option, i) => (
                <div className="col-md-6" key={i}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`question-${q.questionId}`}
                      id={`option-${q.questionId}-${i}`}
                      disabled
                      checked={q.correctOption === i}
                    />
                    <label
                      className={`form-check-label ${
                        q.correctOption === i ? "text-success fw-bold" : ""
                      }`}
                      htmlFor={`option-${q.questionId}-${i}`}
                    >
                      <span dangerouslySetInnerHTML={{ __html: option }}></span>
                      {q.correctOption === i && (
                        <span className="ms-2">Correct Answer</span>
                      )}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {/* Render Subquestions if Available */}
            {q.subQuestions.length > 0 && (
              <div className="mt-4 ps-3 border-start">
                {q.subQuestions.map((sub, subIndex) => (
                  <div key={sub.subQuestionId} className="mb-3">
                    <h6>Sub Question {subIndex + 1}</h6>
                    <p dangerouslySetInnerHTML={{ __html: sub.question }}></p>
                    <div className="row">
                      {sub.options.map((option, i) => (
                        <div className="col-md-6" key={i}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`sub-question-${sub.subQuestionId}`}
                              id={`sub-option-${sub.subQuestionId}-${i}`}
                              disabled
                              checked={sub.correctOption === i}
                            />
                            <label
                              className={`form-check-label ${
                                sub.correctOption === i ? "text-success fw-bold" : ""
                              }`}
                              htmlFor={`sub-option-${sub.subQuestionId}-${i}`}
                            >
                              <span
                                dangerouslySetInnerHTML={{ __html: option }}
                              ></span>
                              {sub.correctOption === i && (
                                <span className="ms-2">Correct Answer</span>
                              )}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Please select a subject to view the questions.</p>
      )}
    </div>
  );
};

export default QuestionViewer;
