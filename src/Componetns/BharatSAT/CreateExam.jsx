import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import MainLayout from "../../MainLayout";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { BiEditAlt } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";
import generatePDF from "react-to-pdf";
import { jsPDF } from "jspdf"; // Importing jsPDF

const CreateExam = () => {
  const [ExamData, setExamData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [availableDataCount, setAvialeCount] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [singleChecked, setSingleChecked] = useState(
    new Array(ExamData.length).fill(false)
  );
  const [addBtn, setAddBtne] = useState(false);
  const [activeStatus, setactiveStatus] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [deleteIds, setDeleteIds] = useState([]);
  const [singleData, setSingleData] = useState({
    bharatSatExamId: "",
    is_active: "",
  });
  const [generateId, setGeneratorId] = useState({
    bharatSatExamId: "",
  });
  const [generateData, setGenerateData] = useState([]);
  const navigate = useNavigate();
  // const token = process.env.REACT_APP_TOKEN;
  // console.log('Token:', Token);
  

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY3MmI2MTNhYzQ2ZWEyN2EzNzBhYmVhMyIsImVtYWlsIjoiYW5raXRjaG91aGFuLmRvbGxvcEBnbWFpbC5jb20iLCJpYXQiOjE3MzMzNzc3OTgsImV4cCI6MTczMzQ2NDE5OH0.rVS3l4AavAP-Fl8JglrVfN1rJbN-N8nQHUCSyoJrUt4";

  //this functions is generate show and close

  const addShowModel = (item) => {
    setAddBtne(true);
    setGeneratorId(item);
  };
  const handleGenerate = () => {
    setAddBtne(false);
  };

  // this function is close all types of model

  const handleClose = () => {
    setAddBtne(false);
    setactiveStatus(false);
    setDeleteConfirm(false);
  };

  const showDeleteModal = (data) => {
    if(ExamData.length !==0)
    {
      setDeleteData(data);
      setDeleteConfirm(true);

    }
  };

  // this function is change status
  const handleConfirm = (data) => {
    setSingleData(data);
    setactiveStatus(true);
  };

  const handleCheckboxChange = (e) => {

    setDeleteIds(...deleteIds,ExamData.map((item)=>{
      return item.bharatSatExamId
    }))
    
    setIsChecked(e.target.checked); // Update state with checkbox status
    setSingleChecked(
      e.target.checked ? ExamData.map(() => true) : ExamData.map(() => false)
    );
  };

  const handleSingleCheckbox = (index, e, item) => {
    const checked = e.target.checked;
    console.log([...deleteIds, item.bharatSatExamId]);
    

    setDeleteIds((prevDeleteIds) => {
      if (checked) {
        return [...prevDeleteIds, item.bharatSatExamId];
      } else {
        // Remove the ID from the array if the checkbox is unchecked
        return prevDeleteIds.filter((id) => id !== item.bharatSatExamId);
      }
    });
    console.log(deleteIds, "deleteids");

    setSingleChecked(index); // Update state with checkbox status

    const updatedChecks = [...singleChecked];
    updatedChecks[index] = !updatedChecks[index];

    setSingleChecked(updatedChecks);
    // const allChecked = updatedChecks.every((checked) => checked);
    // console.log(allChecked,'allcheckd');
  };

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
        setTotalPages(Math.ceil(response.data.availableDataCount / limit));
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const ChangeStatus = async () => {
    try {
      const response = await axios.put(
        `http://192.168.0.27:5003/bharatSat/change-status`,
        {
          id: singleData.bharatSatExamId,
          is_active: !singleData.is_active,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message, {
          theme: "colored ",
        });
        getAllExam();

        setactiveStatus(false);
      }
    } catch (error) {
      toast.error("Failed to change status.", {
        theme: "colored ",
      });
    }
  };

  const deleteExamData = async () => {
    try {
      
      const response = await axios.post(
        `http://192.168.0.27:5003/bharatSat/delete-exam`,
        {
          id:deleteIds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Exam Delete Success");
        getAllExam();
        setDeleteConfirm(false);

      }
    } catch (error) {
      toast.error(error.response.error);
    }
  };

  const generateExamTicket = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.27:5003/bharatSat/generate-e-hall-ticket-bharatSat`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            bharatSatExamId: generateId.bharatSatExamId,
          },
          responseType: "blob",
        }
      );
      if (response.status === 200) {
          setGenerateData(response.data);
        toast.success("Ticket is generator");
        const pdfUrl = URL.createObjectURL(response.data); // Create a URL for the Blob
        const newWindow = window.open(pdfUrl);

        setAddBtne(false);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  // Handle button click to generate PDF

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
            <span className="fw-bold">Dashborad</span>
            <MdKeyboardArrowRight />

            <Link className="text-decoration-none fw-bold">BHARAT SAT</Link>
          </div>
        </div>
        <div className="p-4 rounded-1 m-4 " style={{ backgroundColor: "#fff" }}>
          <div>
            <div
              className="fw-bold fs-4 mb-4 text-truncate"
              title="Create Bharat SAT Exam"
            >
              Create Bharat SAT Exam
            </div>
            <div className=" d-flex gap-3 justify-content-between text-center ">
              <div>
                <RiDeleteBinLine
                  disabled={ExamData.length === 0}
                  className={getClassName()}
                  onClick={() => {
                    if (ExamData.length !== 0) {
                      showDeleteModal();
                    }
                  }}
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
            className="table-responsive mt-2"
            style={{
              maxWidth: "150%",
              height: "665px",
              overflowY: "auto",
              overflowX: "auto",
            }}
          >
            <table className="table p-3" style={{ minWidth: "1500px" }}>
              <thead className="table-primary text-center">
                <tr className="fw-bold">
                  <th>
                    <input
                      disabled={ExamData.length === 0}
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
                  <tr key={index} style={{ fontWeight: "500" }}>
                    <td>
                      <input
                        checked={singleChecked[index]}
                        onChange={(e) => handleSingleCheckbox(index, e, item)}
                        type="checkbox"
                        style={{
                          width: "18px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                      />
                    </td>
                    <td>{page * limit + index + 1}</td>
                    <td>
                      {item.bharatSatExamName.charAt(0).toUpperCase() +
                        item.bharatSatExamName.slice(1)}
                    </td>
                    <td>{item.className}</td>
                    <td>
                      {item.medium.charAt(0).toUpperCase() +
                        item.medium.slice(1)}
                    </td>
                    <td>{item.bharatSatExamDate}</td>
                    <td>{item.examStartTime}</td>
                    <td>{item.examEndTime}</td>
                    <td>
                      <Link
                        to={`/view-exam`}
                        state={{ classId: item.class_id }}
                      >
                        View
                      </Link>
                    </td>
                    <td>
                      <Link onClick={() => addShowModel(item)}>Generate</Link>
                    </td>
                    <td>
                      <div className="form-switch d-flex justify-content-center">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          style={{ cursor: "pointer" }}
                          checked={item.is_active}
                          onClick={() => {
                            handleConfirm(item);
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="action-btn fs-3 d-flex justify-content-center">
                        &nbsp;
                        <BiEditAlt
                          style={{
                            backgroundColor: "#b3f3c966",
                            color: "#4eb171",
                            borderRadius: "3px",
                            padding: "3px",
                            cursor: "pointer",
                          }}
                          onClick={() => navigate("/BharatSAT", { state: { Data: item } } )}
                        />
                        &nbsp;
                        <RiDeleteBinLine
                          style={{
                            backgroundColor: " #efd7da",
                            color: "#ef6d7c",
                            borderRadius: "3px",
                            padding: "3px",
                            cursor: "pointer",
                          }}
                          onClick={() => showDeleteModal(item)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* pagination  data  */}

          <div className="mt-3">
            <span className="text-muted">
              Showing 1 to 10 of {availableDataCount} entries
            </span>
          </div>
          <div className="d-flex justify-content-end mt-4">
            <nav aria-label="Page navigation example ">
              <ul className="pagination gap-2   list-unstyled">
                <li className={`page-item  ${page === 0 ? "disabled" : ""}`}>
                  <Link className="page-link  " aria-label="Previous">
                    <span aria-hidden="true" onClick={() => setPage(page - 1)}>
                      &laquo; Previous
                    </span>
                  </Link>
                </li>

                {[...Array(totalPages)].map((_, index) => {
                  const currentIndex = index + 1;
                  return (
                    <li
                      key={currentIndex}
                      className={`page-item  ${
                        page === currentIndex - 1 ? "sub-list active" : ""
                      }`}
                    >
                      <Link
                        className="page-link "
                        onClick={() => {
                          setPage(currentIndex - 1);
                        }}
                      >
                        {currentIndex}
                      </Link>
                    </li>
                  );
                })}

                <li
                  className={`page-item ${
                    page === totalPages - 1 ? "disabled" : ""
                  }`}
                >
                  <Link className="page-link" aria-label="Next">
                    <span aria-hidden="true" onClick={() => setPage(page + 1)}>
                      Next &raquo;
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* this modal for the status is  active */}

        <div className="container ">
          {addBtn && (
            <div
              className="modal show  "
              style={{ display: "block", backdropFilter: "contrast(0.3)" }}
              id="exampleModalToggle"
              aria-hidden="true"
              aria-labelledby="exampleModalToggleLabel"
            >
              <div className="modal-dialog  modal-dialog-centered  ">
                <div className="modal-content model-generate p-4 border-0 ">
                  <div className="p-4 text-center">
                    <div
                      className="d-flex position-absolute align-items-center circel-check  justify-content-center"
                      style={{
                        left: "50%",
                        top: "2%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <i className="fas fa-check-circle  "></i>
                    </div>
                  </div>
                  <div className="modal-body text-center">
                    <h4 className="mb-3 fw-bold">
                      Are you sure you want to generate E-hall ticket ?
                    </h4>
                    <div className="p-4 d-flex justify-content-center gap-4 align-items-center">
                      <button
                        className="btn btn-secondary  px-4 p-2 fw-bold fs-6"
                        onClick={handleClose}
                      >
                        No
                      </button>
                      <button
                        className="btn  px-4 p-2 text-white fw-bold"
                        style={{ backgroundColor: "#03AA11" }}
                        // onClick={() => {
                        //   generateExamTicket();
                        // }}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* <div className="modal-backdrop fade show" style={{ position: "fixed" }} ></div> */}
        </div>

        {/* this modal for the status is not active */}

        <div className="container ">
          {activeStatus && (
            <div
              className="modal show  "
              style={{ display: "block", backdropFilter: "contrast(0.3)" }}
              id="exampleModalToggle"
              aria-hidden="true"
              aria-labelledby="exampleModalToggleLabel"
            >
              <div className="modal-dialog  modal-dialog-centered  ">
                <div className="modal-content model-custom p-4 px-4 border-0 ">
                  <div className="p-3 text-center">
                    <div
                      className="d-flex position-absolute align-items-center check-status  justify-content-center"
                      style={{
                        left: "50%",
                        top: "2%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div className="icon-container">
                        <span>!</span>
                      </div>
                    </div>
                  </div>
                  <div className="modal-body text-center mt-3">
                    <h4 className="mb-3 fw-bold">
                      Are you sure want to change the status ?
                    </h4>
                    <div className="p-4 d-flex justify-content-center gap-4 align-items-center">
                      <button
                        className="btn btn-secondary  px-4 p-2 fw-bold fs-6"
                        onClick={handleClose}
                      >
                        No
                      </button>
                      <button
                        className="btn  px-4 p-2 text-white fw-bold"
                        style={{ backgroundColor: "red" }}
                        onClick={() => ChangeStatus()}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* <div className="modal-backdrop fade show" style={{ position: "fixed" }} ></div> */}
        </div>

        {/* this modal for the delete data by id  */}
        <div className="container ">
          {deleteConfirm && (
            <div
              className="modal show  "
              style={{ display: "block", backdropFilter: "contrast(0.3)" }}
              id="exampleModalToggle"
              aria-hidden="true"
              aria-labelledby="exampleModalToggleLabel"
            >
              <div className="modal-dialog  modal-dialog-centered  ">
                <div className="modal-content model-delete p-4 px-4 border-0 ">
                  <div className="p-3 text-center">
                    <div
                      className="d-flex position-absolute align-items-center check-deleteIcon  justify-content-center"
                      style={{
                        left: "50%",
                        top: "2%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {/* <div className="p-2"> */}
                      <RiDeleteBinLine
                        style={{ fontSize: "75px", padding: "15px" }}
                      />
                      {/* <span><i class="fa-regular fa-trash-can"></i></span> */}
                      {/* </div> */}
                    </div>
                  </div>
                  <div className="modal-body text-center mt-3">
                    <h4 className="mb-3 fw-bold">
                      Are you sure want to delete BharatSat Exam ?
                    </h4>
                    <div className="p-4 d-flex justify-content-center gap-4 align-items-center">
                      <button
                        className="btn btn-secondary  px-4 p-2 fw-bold fs-6"
                        onClick={handleClose}
                      >
                        No
                      </button>
                      <button
                        className="btn  px-4 p-2 text-white fw-bold"
                        style={{ backgroundColor: "#FF0033" }}
                        onClick={() => deleteExamData()}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* <div className="modal-backdrop fade show" style={{ position: "fixed" }} ></div> */}
        </div>

        <ToastContainer />
      </MainLayout>
    </div>
  );
};

export default CreateExam;
