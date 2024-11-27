import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import MainLayout from "../MainLayout";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { BiEditAlt } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";

const CreateExam = () => {
  const [ExamData, setExamData] = useState([]);
  const [limit, setLimit] = useState(2);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [availableDataCount, setAvialeCount] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const[singleChecked,setSingleChecked] = useState('')

  const handleCheckboxChange = (e) => {

    setIsChecked(e.target.checked); // Update state with checkbox status
    setSingleChecked(e.target.checked ? ExamData.map(() => true) : ExamData.map(() => false));
  };

  const handleSingleCheckbox = (index) => {

    setSingleChecked(index); // Update state with checkbox status



    // const updatedChecks = [...singleChecked];
    // updatedChecks[index] = !updatedChecks[index];
    // setSingleChecked(updatedChecks);

    // // If all individual checkboxes are checked, check the master checkbox
    // const allChecked = updatedChecks.every((checked) => checked);
    // setIsChecked(allChecked);
  };
  
  
  console.log(isChecked);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY3MjA5NDQ0OWVlYTA2YTc4OTlmMDU1NSIsImVtYWlsIjoiZG9sbG9wLnlhc2hAZ21haWwuY29tIiwiaWF0IjoxNzMyNjg3Mzg2LCJleHAiOjE3MzI3NzM3ODZ9.K2cJmN3tkTrktbgm6aZakUFE9RU3DcH2Tc6WYfr_Y8U";

  const getAllExam = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.27:5003/bharatSat/list-all-exam`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            offset: page,
            limit: limit,
            searchQuery: search,
          },
        }
      );
      if (response.status === 200) {
        setExamData(response.data.data);
        setAvialeCount(response.data.availableDataCount);
        setTotalPages(Math.ceil(response.data.availableDataCount/limit))
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  
  const getClassName = () => {
    if (isChecked && singleChecked.length > 0) {
      return "checkedBtn";
    }
    if (isChecked && singleChecked.length === 0) {
      return "partiallyCheckedBtn";
    }
    return "UncheckedBtn";
  };
  
  useEffect(() => {
    getAllExam();
  }, [page, limit, search]);

  return (
    <div className="bg-body-secondary">
      <MainLayout>
        <div className="d-flex justify-content-between p-3">
          <div className="fw-bold">BHARAT SAT</div>
          <div className="text-center">
            <span className="fw-bold">Dashborad</span><MdKeyboardArrowRight />

            <Link className="text-decoration-none fw-bold">BHARAT SAT</Link>
          </div>
        </div>
        <div className="p-4 rounded-1 m-4 " style={{ backgroundColor: "#fff" }}>
          <div>
            <div className="fw-bold fs-4 mb-4 text-truncate" title="Create Bharat SAT Exam">Create Bharat SAT Exam</div>
            <div className=" d-flex gap-3 justify-content-between text-center ">
                <div>
                    <RiDeleteBinLine
                  className={getClassName()}
                    />
                </div>
              <div className="d-flex gap-4">
                <div>
                  <input
                    id="input1"
                    type="search"
                    className="form-control "
                    placeholder="Search User"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-end ">
                  <div className="btn-group ">
                    <button
                      type="submit"
                      className="btn "
                      style={{ backgroundColor: "#07284B", color: "#fff" }}
                    >
                      Submit
                    </button>
                    <button
                      type="submit"
                      className="btn rounded-end-3 bg-primary text-white"
                    >
                      <GoPlus style={{ fontSize: "18px" }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="table-responsive mt-2 "
            style={{ maxWidth: "150%", overflowX: "auto" }}
          >
            <table className="table p-3" style={{ minWidth: "1500px" }}>
              <thead className="table-primary text-center">
                <tr>
                  <th>
                    <input
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      type="checkbox"
                      style={{
                        width: "18px",
                        height: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </th>
                  <th>Sr No.</th>
                  <th>Bharat SAT Exam Name</th>
                  <th>Class</th>
                  <th>Medium</th>
                  <th>Exam Date</th>
                  <th>Exam Start Time</th>
                  <th>Exam End Time</th>
                  <th>View Question Paper</th>
                  <th>Generate E-Hall Ticket</th>
                  <th>Current Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {ExamData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        checked={singleChecked[item.bharatSatExamId]}
                        onChange={(e)=>handleSingleCheckbox(item.bharatSatExamId)}
                        type="checkbox"

                        style={{
                          width: "18px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                      />
                    </td>
                    <td>{page * limit + index + 1}</td>
                    <td>{item.bharatSatExamName}</td>
                    <td>{item.className}</td>
                    <td>{item.medium}</td>
                    <td>{item.bharatSatExamDate}</td>
                    <td>{item.examStartTime}</td>
                    <td>{item.examEndTime}</td>
                    <td>
                      <Link>View</Link>
                    </td>
                    <td>
                      <Link>Generate</Link>
                    </td>
                    <td>
                      <div className="form-switch d-flex justify-content-center">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={item.is_active}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="action-btn fs-3 d-flex justify-content-center">
                        &nbsp;
                        <BiEditAlt
                          style={{
                            backgroundColor: "#b3f3c966",
                            color: "#70FDA2",
                            borderRadius: "3px",
                            padding: "3px",
                            cursor: "pointer",
                          }}
                        />
                        &nbsp;
                        <RiDeleteBinLine
                          style={{
                            backgroundColor: " #efd7da",
                            color: "#e82e44",
                            borderRadius: "3px",
                            padding: "3px",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* pagination  data  */}

          <div className="d-flex justify-content-between">
            <div>
              <p className="text-muted">
                Showing 1 to 10 of {availableDataCount} entries
              </p>
            </div>
            <div>
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end mt-4">
                  <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                    <Link className="page-link" aria-label="Previous">
                      <span
                        aria-hidden="true"
                        onClick={() => setPage(page - 1)}
                      >
                        &laquo; Previous
                      </span>
                    </Link>
                  </li>

                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                      <li className="page-item">
                        <Link
                          className="page-link"
                          onClick={() => {
                            setPage(page-1);
                          }}
                        >
                          {page}
                        </Link>
                      </li>
                    );
                  })}

                  <li
                    className={`page-item ${
                      page === totalPages-1 ? "disabled" : ""
                    }`}
                  >
                    <Link className="page-link" aria-label="Next">
                      <span
                        aria-hidden="true"
                        onClick={() => setPage(page + 1)}
                      >
                        Next &raquo;
                      </span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <ToastContainer />
      </MainLayout>
    </div>
  );
};

export default CreateExam;
