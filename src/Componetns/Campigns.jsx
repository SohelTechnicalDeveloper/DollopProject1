import React, { useEffect, useState } from "react";
import MainLayout from "../MainLayout";
import { Link } from "react-router-dom";
import "../Styles/Campigns.css";
import Pagination from "react-bootstrap/Pagination";
import { format } from "date-fns";
import { FaLongArrowAltRight } from "react-icons/fa";
import axios from "axios";
import * as XLSX from "xlsx";
import { toast, ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Campigns = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState();
  const[startDate,setStartDate] = useState()
  const[endDate,setEndDate] = useState()
  const [showUser, setShowUser] = useState(false);
  const [coordinatorData, setCoordinatorData] = useState([]);
  const [withdrawData, setWithdrawData] = useState([]);
  const [payoutHistory, setPayoutHistory] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPayment, setTotalPayment] = useState(1);
  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [error, setError] = useState(true);

  const coordinatorId = "66d6dd8425461a1c1a7761e2";
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY3MjA5NDQ0OWVlYTA2YTc4OTlmMDU1NSIsImVtYWlsIjoiZG9sbG9wLnlhc2hAZ21haWwuY29tIiwiaWF0IjoxNzMxNTY1NzQxLCJleHAiOjE3MzE2NTIxNDF9.Dzggy1-1WY5wZELnfaxmduZ9PcvmFfWGUFZYwhlbDFA`;

  //this function is download payment history excel sheet

  const downloadPaymentHistory = () => {
    const worksheet = XLSX.utils.json_to_sheet(payoutHistory);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Payment History");

    // Convert workbook to binary and trigger the download
    XLSX.writeFile(workbook, "Payment_His tory.xlsx");
  };

  const withdrawRequest = async () => {
    try {
      setError(false);

      const response = await axios.post(
        `http://192.168.0.22:5003/coordinator/approve-withdraw-request`,
        {
          paidAmount: amount,
          modeOfPayment: paymentMode,
          requestId: "6731958d3a90d8280836368d",
          transactionId: transactionId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Withdraw request Approved");
        handleClose();
        setTransactionId(" ");
        setPaymentMode(" ");
        setAmount(" ");
      }
    } catch (error) {
      toast.error("Please try again");
    }
  };

  //get transaction history data

  const getPayouthistoryData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.22:5003/coordinator/transaction-history/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            coordinatorId,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data.data);

        setPayoutHistory(response.data.data);
        setTotalPayment(response.data.length);
        // console.log(totalPayment);
      }
    } catch (error) {}
  };

  //get payment withdraw request data

  const getwithdrawRequest = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.22:5003/coordinator/withdraw-requests/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            coordinatorId,
          },
        }
      );
      if (response.status === 200) {
        setWithdrawData(response.data.data);
      }
    } catch (error) {}
  };
  const getdetails = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.22:5003/coordinator/getRequestDetailApi/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            coordinatorId,
          },
        }
      );
      if (response.status === 200) {
        setCoordinatorData(response.data.data);
        setTotalPages(response.data.totalItems);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getdetails();
    getwithdrawRequest();
    getPayouthistoryData();
  }, []);

  const handleShow = () => {
    setShowUser(true);
  };
  const handleClose = () => {
    setShowUser(false);
  };
  
 

  return (
    <div className="bg-body-secondary ">
      <MainLayout>
        <div className="d-flex  justify-content-between p-3">
          <h4 className="fw-bold">PAYOUT</h4>
          <div className="d-flex">
            <p>Dashboard </p> -{" "}
            <Link className="text-decoration-none"> Coordinators</Link>
          </div>
        </div>
        <div className="coordinator-details p-4 bg-white m-4">
          <h5 className="card-title fs-4 fw-bold ">Coordinator Details</h5>{" "}
          <br />
          {/* Details section/ */}
          <div className="mb-5  p-2 rounded-2 shadow">
            <p className="p-1 m-0 fw-bold fs-3 mx-2">
              {coordinatorData.coordinatorName}
            </p>
            <div className="d-flex gap-5 card-text mx-3">
              <p className=" m-0 fw-bold " style={{ fontSize: "15px" }}>
                <strong> Email : </strong>{" "}
                <Link className=" text-decoration-none">
                  {coordinatorData.coordinatorEmail}
                </Link>
              </p>
              <p className=" m-0 fw-bold" style={{ fontSize: "15px" }}>
                <strong> Mobile : </strong>
                <Link className="text-decoration-none">
                  {coordinatorData.coordinatorMobile}
                </Link>
              </p>
            </div>
                    {" "}
          </div>
          <div className="row mb-4 ">
            <div className="col-md-3 col-lg-3 col-sm-6 mb-2">
              <div className="card  bg-light rounded-4">
                <div className="card-body">
                  <p className="text-black fw-bolder">Total Amount Earned</p>
                  <p className="fs-2 text-primary fw-bold">
                    ₹ {coordinatorData.totalAmtEarned}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-lg-3 col-sm-6  mb-2">
              <div className="card bg-light  rounded-4">
                <div className="card-body">
                  <p className="text-black fw-bolder">Payment Done</p>
                  <p className="fs-2 text-primary fw-bold">
                    ₹ {coordinatorData.paymentDone}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-lg-3 col-sm-6 ">
              <div className="card bg-light  rounded-4">
                <div className="card-body">
                  <p className="text-black fw-bolder">Balance</p>
                  <p className="fs-2 text-primary fw-bold">
                    ₹ {coordinatorData.balanceLeft}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Request List and payment status detai/ls */}
          <div className="card mb-4 border-0 ">
            <div className="card-body">
              <h5 className="card-title text-black fw-bold">Request List</h5>
              <div className="table-scroller">
                <table className="table  bg-success text-center">
                  <thead>
                    <tr>
                      <th scope="col" className="th-bg">
                        Sr No.
                      </th>
                      <th scope="col" className="th-bg">
                        Request Date
                      </th>
                      <th scope="col" className="th-bg">
                        Request Amount
                      </th>
                      <th scope="col" className="th-bg">
                        Status
                      </th>
                      <th scope="col" className="th-bg">
                        Payout
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>05 July 2005</td>
                      <td> 45655</td>
                      <td className="text-warning">Process</td>
                      <td>
                        <Link
                          className=" btn-primary btn-sm"
                          onClick={() => handleShow()}
                        >
                          Pay Now
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Pagination process  1 */}
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end text-black">
              <li className="page-item disabled">
                <Link className="page-link" tabindex="-1">
                  Previous
                </Link>
              </li>
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => {
                        setPage(page);
                      }}
                    >
                      {page}
                    </a>
                  </li>
                );
              })}
              <Pagination.Ellipsis />
              <li className="page-item">
                <Link className="page-link text-black page-hover">Next</Link>
              </li>
            </ul>
          </nav>
          <div className="card border-0  mb-1">
            <div className="">
              <div className="card-body ">
                <div className=" row d-flex justify-content-between">
                  <h5 className="card-title mt-4">Payout History</h5>
                  <div className=" d-flex gap-4  align-items-end text-center align-content-center ">
                    <p className="text-decoration-none fw-bold fs-5 m-0 p-1">
                      Date
                    </p>
                    <div className="col-md-4 col-lg-3 col-sm-6  ">
                      <label>From: </label>
                      <DatePicker
                        className="form-control"
                        selected={fromDate}
                        maxDate={new Date()}
                        placeholderText="Select From Date"
                        onChange={(fromDate)=>setFromDate(fromDate)}
                        dateFormat="dd//mm/yyyy"
                        
                      />
                     
                    </div>
                    <div className="col-md-4 col-lg-3 col-sm-6  ">
                      <label>To:</label>
                      <DatePicker
                        className="form-control"
                        selected={toDate}
                        placeholderText="Select To Date"
                        maxDate={new Date()}
                        onChange={(toDate)=>setToDate(toDate)}
                        dateFormat="dd//mm/yyyy"
                        
                      />
                     
                    </div>
                    <div className="col-md-4 col-lg-3 col-sm-6  ">
                      <select
                        name=""
                        className="form-control"
                        style={{ width: "10vw" }}
                        id=""
                      >
                        <option value="">Commission Earned</option>
                        <option value="">hello</option>
                        <option value="">hello</option>
                      </select>
                    </div>
                    <div className="">
                      <button
                        className="btn btn-primary border-0"
                        style={{ backgroundColor: "#07284B" }}
                        onClick={downloadPaymentHistory}
                      >
                        Export
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <div className="table-scroller">
                  <table className="table table-hover  table-responsive text-center ">
                    <thead style={{ backgroundColor: "#D3E3FD" }}>
                      <tr>
                        <th scope="col" className="th-bg">
                          Sr No.
                        </th>
                        <th scope="col" className="th-bg">
                          Request Date
                        </th>
                        <th scope="col" className="th-bg">
                          Request Amount
                        </th>
                        <th scope="col" className="th-bg">
                          Status
                        </th>
                        <th scope="col" className="th-bg">
                          Paid Date
                        </th>
                        <th scope="col" className="th-bg">
                          Mode of Payment
                        </th>
                        <th scope="col" className="th-bg">
                          Transaction ID
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {payoutHistory.map((item, index) => {
                        return (
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{item.requestCreateDate}</td>
                            <td>{item.amountRequested}</td>
                            <td
                              style={{ color: "#24e558", fontWeight: "bold" }}
                            >
                              {item.status}
                            </td>
                            <td>{item.paidDate}</td>
                            <td
                              style={{ color: "#24e558", fontWeight: "bold" }}
                            >
                              {item.modeOfPayment}
                            </td>
                            <td>{item.transactionId}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* Pagination process 2 */}
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end text-black">
              <li className="page-item disabled">
                <Link
                  className="page-link page-hover"
                  tabindex="-1"
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Link>
              </li>
              {[...Array(totalPayment)].map((_, index) => {
                const page = index + 1;
                return (
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => {
                        setPage(page);
                      }}
                    >
                      {page}
                    </a>
                  </li>
                );
              })}
              <Pagination.Ellipsis />
              <li className="page-item">
                <Link
                  className="page-link text-black page-hover"
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="container  ">
          {showUser && (
            <div
              className="modal show backdrop"
              style={{ display: "block", backdropFilter: "contrast(0.3)" }}
              id="exampleModalToggle"
              aria-hidden="true"
              aria-labelledby="myLargeModalLabel"
              tabindex="-1"
              role="dialog"
            >
              <div className="modal-dialog  modal-dialog-centered modal-md">
                <div className="modal-content">
                  <div className="modal-body ">
                    <div className="  d-flex">
                      <div className="" style={{ width: "100%" }}>
                        <label className=" label-name">
                          {" "}
                          Amount <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          className=" form-control input-color"
                          placeholder="Amount"
                          onChange={(e) => {
                            setAmount(e.target.value);
                          }}
                        />{" "}
                        {!error
                          ? !amount && (
                              <label
                                htmlFor=""
                                className="text-danger fw-bolder"
                              >
                                Fields Can't Empty
                              </label>
                            )
                          : ""}{" "}
                        <br />
                        <label className=" label-name">
                          {" "}
                          Transiction Id <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className=" form-control input-color"
                          placeholder=" Transiction Id"
                          onChange={(e) => {
                            setTransactionId(e.target.value);
                          }}
                        />{" "}
                        {!error
                          ? !transactionId && (
                              <label
                                htmlFor=""
                                className="text-danger fw-bolder"
                              >
                                Fields Can't Empty
                              </label>
                            )
                          : ""}{" "}
                        <br />
                        <label className=" label-name">
                          {" "}
                          Mode <span className="text-danger">*</span>
                        </label>
                        <select
                          type="text"
                          className=" form-control input-color"
                          placeholder="Mode "
                          onChange={(e) => setPaymentMode(e.target.value)}
                        >
                          <option value="">Select Payment Type</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                          <option value="Cash On">Cash On </option>
                        </select>
                        {!error
                          ? !paymentMode && (
                              <label
                                htmlFor=""
                                className="text-danger fw-bolder"
                              >
                                Fields Can't Empty
                              </label>
                            )
                          : ""}{" "}
                        <br />
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <ToastContainer />
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => {
                        withdrawRequest();
                      }}
                      style={{ backgroundColor: "#07284B ", color: "#fff" }}
                    >
                      {" "}
                      Submit <FaLongArrowAltRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </MainLayout>
    </div>
  );
};

export default Campigns;
