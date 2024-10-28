import React, { useEffect, useState } from "react";
import MainLayout from "../MainLayout";
import { Link } from "react-router-dom";
import axios from "axios";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { FaEye } from "react-icons/fa";
import "../Styles/Agency.css";
import CryptoJS from "crypto-js";


// import logo from "../images/dcb55e.jpg";
import { toast, ToastContainer } from "react-toastify";
  // import Pdf from "../Resume/SohelFinalResume.59787e8e065e9c9dfc2c.pdf";
import { CirclesWithBar } from "react-loader-spinner";

const AgencyRoom = () => {
  const [userData, setUserData] = useState([]);
  const [btnshow, setBtnShow] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [userId, setUserId] = useState(null);
  const [status, setStatus] = useState(-1);
  const [addBtn, setAddBtne] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [loader, setLoader] = useState(true);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  console.log([...Array(totalPages)]);
  const baseUrl = process.env.REACT_APP_BASE_URL
  // const secretKey = "your-secret-key"
  // const bytes = CryptoJS.AES.decrypt(userInfo.password, secretKey);
  // const decrypt = bytes.toString(CryptoJS.enc.Utf8);
  // console.log(decrypt+"decrypt password");
  

  const handleShow = (id) => {
    setShowUser(false);
    setUserId(id);
    console.log(id);
    setBtnShow(true);
    getUserById(id);
  };

  const addShowModel = (id) => {
    setAddBtne(true);
  };

  const showUserDetails = (info) => {
    setShowUser(true);
    setUserInfo(info);
  };
  const handleClose = () => {
    setBtnShow(false);
    setAddBtne(false);
    setShowUser(false);
  };

  const auth = JSON.parse(localStorage.getItem("user"));

  const getUser = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/getUser`, {
        headers: {
          Authorization: `bearer ${auth.token}`,
        },
        params: {
          limit: limit,
          page: page,
        },
      });

      if (response.status === 200) {
        setUserData(response.data.data);
        setTotalPages(response.data.totalItems);
        // console.log(response.data.totalItems);
      }
    } catch (error) {}
  };
  const getUserById = async (id) => {
    try {
      const response = await axios.get(
        `${baseUrl}/user/getUserById/${id}`
      );
      if (response.status === 200) {
        setName(response.data.data.name);
        setEmail(response.data.data.email);
        setAddress(response.data.data.address);
        setPhone(response.data.data.phone);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getUser();
  }, [page, limit, status]);

  const deleteUser = async (id) => {
    // window.confirm('Are sure want to delete this user')
    try {
      const response = await axios.delete(
        `${baseUrl}/user/deleteUser/${id}`
      );

      if (response.status === 200) {
        toast.success("Deleted");
      }
    } catch (error) {
      toast.error(error);
    } finally {
      getUser();
    }
  };

  const updateData = async () => {
    try {
      setError(!error);
      if (
        name !== "" &&
        email !== "" &&
        address !== "" &&
        phone !== "" &&
        image !== ""
      ) {
        const response = await axios.patch(
          `http://localhost:8000/user/updateUserById/${userId}`,
          {
            name,
            email,
            address,
            phone,
            image,
          }
        );
        if (response.status === 200) {
          handleClose();
          toast.success("User Update Successfully");
          getUser();
        }
      }
    } catch (error) {
      toast.error("User not updated");
    }
  };

  const searchUser = async (e) => {
    try {
      const key = e.target.value;
      if (key) {
        const response = await axios.get(
          `${baseUrl}/user/findUserbyName/${key}`
        );
        if (response.status === 200) {
          setUserData(response.data.data);
        }
      } else {
        getUser();
      }
    } catch (error) {}
  };

  const updateStatusByAdmin = async (id, status) => {
    setStatus(!status);

    try {
      const response = await axios.patch(
        `${baseUrl}/user/updateUserStatus/${id}`,
        {
          status: !status,
        }
      );
      console.log(response);

      if (response.status === 200) {
        if (status === false) {
          toast.success("User Status Unblocked By Admin");
        } else {
          toast.success("User Status Blocked By Admin");
        }
      }
    } catch (error) {}
  };

  const addUsers = async () => {
    setError(!error);
    try {
      if (
        name !== "" &&
        email !== "" &&
        address !== "" &&
        phone !== "" &&
        password !== "" &&
        image !== ""
      ) {
        const response = await axios.post(
          `http://127.0.0.1:8000/user/register`,
          {
            name: name,
            email: email,
            address: address,
            password: password,
            phone: phone,
            image: image,
          }
        );
        if (response.status === 201) {
          setLoader(false);
          handleClose();
          toast.success("Add User Succesfully");
          getUser();
        }
      }
    } catch (error) {
      // toast.error('fields are required')
    } finally {
      setLoader(true);
    }
  };
  const handleUpdateImage = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    let response = await fetch(`${baseUrl}/user/uploadImage`, {
      method: "post",
      body: formData,
      dataType: "jsonp",
    });
    response = await response.json();
    console.log(response);

    setImage(response.data);
  };
  return (
    <div>
      <MainLayout>
        <div className="container ">
          {btnshow && (
            <div
              className="modal show backdrop"
              style={{ display: "block", backdropFilter: "contrast(0.3)" }}
              id="exampleModalToggle"
              aria-hidden="true"
              aria-labelledby="myLargeModalLabel"
              tabindex="-1"
              role="dialog"
            >
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <Link
                      className="text-decoration-none"
                      style={{
                        color: "#07284B",
                        borderBottom: "3px solid #07284B",
                      }}
                    >
                      {" "}
                      <h5 className="modal-title" onClick={() => handleShow()}>
                        Update User
                      </h5>
                    </Link>
                    <hr />
                    <RxCross1
                      style={{ color: "black", fontSize: "25px" }}
                      onClick={handleClose}
                    />
                  </div>
                  <div className="modal-body">
                    <form>
                      {/* Agency Name */}
                      <div className="form-group mb-4 d-flex">
                        <label className="w-25 label-name"> Name</label>
                        <div className=" w-50">
                          <input
                            type="text"
                            value={name}
                            className=" form-control input-color"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                          />
                          {error && !name ? (
                            <label
                              className="form-label text-danger fw-bolder"
                              style={{ position: "absolute" }}
                            >
                              {" "}
                              Field can't be empty!{" "}
                            </label>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="form-group mb-4 d-flex">
                        <label className="w-25 label-name"> Image</label>
                        <div className=" w-50">
                          <input
                            type="file"
                            className=" form-control input-color"
                            placeholder="Name"
                            onChange={handleUpdateImage}
                          />
                          {error && !image ? (
                            <label
                              className="form-label text-danger fw-bolder"
                              style={{ position: "absolute" }}
                            >
                              {" "}
                              Field can't be empty!{" "}
                            </label>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div className="form-group d-flex mb-4">
                        <label className=" w-25 label-name">Email</label>
                        <div className="validation w-50">
                          <input
                            type="email"
                            value={email}
                            className="form-control input-color"
                            placeholder="E-mail"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          {error && !email ? (
                            <label
                              className="form-label text-danger fw-bolder "
                              style={{ position: "absolute" }}
                            >
                              {" "}
                              Field can't be empty!{" "}
                            </label>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      {/* Contact Number */}
                      <div className="form-group d-flex mb-4 d-flex">
                        <label className=" w-25 label-name">Contact No.</label>
                        <div className="validation w-50">
                          <input
                            type="tel"
                            value={phone}
                            className="form-control input-color"
                            placeholder="Contact no."
                            onChange={(e) => setPhone(e.target.value)}
                          />
                          {error && !phone ? (
                            <label
                              className="form-label text-danger fw-bolder "
                              style={{ position: "absolute" }}
                            >
                              {" "}
                              Field can't be empty!{" "}
                            </label>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      {/* Address */}
                      <div className="form-group d-flex mb-4">
                        <label className=" w-25 label-name">Address</label>
                        <div className="validation w-50">
                          <input
                            type="text"
                            value={address}
                            className="form-control input-color"
                            placeholder="Address"
                            onChange={(e) => setAddress(e.target.value)}
                          />
                          {error && !address ? (
                            <label
                              className="form-label text-danger fw-bolder "
                              style={{ position: "absolute" }}
                            >
                              {" "}
                              Field can't be empty!{" "}
                            </label>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={handleClose}
                    >
                      {" "}
                      Cancel{" "}
                    </button>
                    <button
                      type="submit"
                      className="btn "
                      style={{ backgroundColor: "#21b7b5" }}
                      onClick={updateData}
                    >
                      {" "}
                      Done{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>


        <div className="m-4 ">
              <h2>User Data</h2>

              <div className=" d-flex gap-3 justify-content-end text-center align-items-center">
                <div>
                  <input
                    id="input1"
                    type="search"
                    className="form-control w-100"
                    onChange={(e) => {
                      searchUser(e);
                    }}
                    placeholder="Search User"
                  />
                </div>
                <button
                  id="btn"
                  className="btn btn-primary my-3 text-truncate"
                  onClick={() => addShowModel()}
                 
                >
                 <span className="fs-5">+</span>Add Users
                </button>

               
              </div>
            </div>
       

        <div className=" mt-5 p-3 overflow-y-scroll">
          <table
            border={1}
            cellPadding={10}
            className="table  table-bordered p-3"
          >
            <thead className="table-success text-center">
              <tr>
                <th scope="col">User Image</th>
                <th scope="col">User Name</th>
                <th scope="col">Email Address</th>
                <th scope="col">Contact No.</th>
                <th scope="col">Address</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className="mx-3 text-center">
              {userData.length ? (
                userData.map((info, index) => {
                  return (
                    <>
                      <tr>
                        {/* <th scope='row'>{index+1}</th> */}

                        <td>
                          <div className="d-flex justify-content-center">
                            <img
                              src={info.image}
                              width={75}
                              height={80}
                              alt="can't found"
                            />
                          </div>
                        </td>
                        <td className="fw-bold">{info.name}</td>
                        <td>{info.email}</td>
                        <td>{info.phone}</td>
                        <td>{info.address}</td>
                        <td>
                          <div className=" form-switch  d-flex justify-content-center align-content-center align-items-center">
                            <input
                              className="form-check-input "
                              type="checkbox"
                              onClick={() => {
                                updateStatusByAdmin(info._id, info.status);
                              }}
                              checked={info.status}
                            />
                            {/* {isChecked ? "Checked" : "Unchecked"} */}
                                      
                          </div>
                        </td>
                        <td>
                          <div className="action-btn fs-3 d-flex justify-content-center">
                            <FaEye
                              style={{
                                backgroundColor: "#A7B2C3",
                                color: "#000",
                                borderRadius: "3px",
                                padding: "3px",
                                cursor: "pointer",
                              }}
                              onClick={() => showUserDetails(info)}
                            />{" "}
                            &nbsp;
                            <BiEditAlt
                              style={{
                                backgroundColor: "#d3eae9",
                                color: "#24A1A7",
                                borderRadius: "3px",
                                padding: "3px",
                                cursor: "pointer",
                              }}
                              onClick={() => handleShow(info._id)}
                            />{" "}
                            &nbsp;
                            <MdDeleteOutline
                              style={{
                                backgroundColor: "#efd7da",
                                color: "#e82e44",
                                borderRadius: "3px",
                                padding: "3px",
                                cursor: "pointer",
                              }}
                              onClick={() => deleteUser(info._id)}
                            />
                          </div>
                        </td>
                      </tr>{" "}
                    </>
                  );
                })
              ) : (
                <div className="d-flex fs-2 justify-content-center align-items-center">
                  " User not found"
                </div>
              )}
            </tbody>
          </table>
        </div>

        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center mt-4">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true" onClick={() => setPage(page - 1)}>
                  &laquo; Previous
                </span>
              </a>
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

            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true" onClick={() => setPage(page + 1)}>
                  Next &raquo;
                </span>
              </a>
            </li>
          </ul>
        </nav>
        <ToastContainer />

        {/* add user */}

        <div className="container ">
          {addBtn && (
            <div
              className="modal show  "
              style={{ display: "block", backdropFilter: "contrast(0.3)" }}
              id="exampleModalToggle"
              aria-hidden="true"
              aria-labelledby="exampleModalToggleLabel"
            >
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <Link
                      className="text-decoration-none"
                      style={{
                        color: "#07284B",
                        borderBottom: "3px solid #07284B",
                      }}
                    >
                      {" "}
                      <h5 className="modal-title">Add User</h5>
                    </Link>
                    <hr />
                    <RxCross1
                      style={{ color: "black", fontSize: "25px" }}
                      onClick={handleClose}
                    />
                  </div>
                  <div className="modal-body">
                    <form>
                      {/* Agency Name */}
                      <div className="form-group mb-4 d-flex">
                        <label className="w-25 label-name"> Name</label>
                        <div className=" w-50">
                          <input
                            type="text"
                            className=" form-control input-color"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                          />
                          {error && !name ? (
                            <label
                              className="form-label text-danger fw-bolder"
                              style={{ position: "absolute" }}
                            >
                              {" "}
                              Field can't be empty!{" "}
                            </label>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="form-group mb-4 d-flex">
                        <label className="w-25 label-name"> Image</label>
                        <div className=" w-50">
                          <input
                            type="file"
                            className=" form-control input-color"
                            placeholder="Name"
                            onChange={handleUpdateImage}
                          />
                          {error && !image ? (
                            <label
                              className="form-label text-danger fw-bolder"
                              style={{ position: "absolute" }}
                            >
                              {" "}
                              Field can't be empty!{" "}
                            </label>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div className="form-group d-flex mb-4">
                        <label className=" w-25 label-name">Email</label>
                        <div className="validation w-50">
                          <input
                            type="email"
                            className="form-control input-color"
                            placeholder="E-mail"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          {error && !email ? (
                            <label
                              className="form-label text-danger fw-bolder "
                              style={{ position: "absolute" }}
                            >
                              {" "}
                              Field can't be empty!{" "}
                            </label>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      {/* Contact Number */}
                      <div className="form-group d-flex mb-4 d-flex">
                        <label className=" w-25 label-name">Contact No.</label>
                        <div className="validation w-50">
                          <input
                            type="tel"
                            className="form-control input-color"
                            placeholder="Contact no."
                            onChange={(e) => setPhone(e.target.value)}
                          />
                          {error && !phone ? (
                            <label
                              className="form-label text-danger fw-bolder "
                              style={{ position: "absolute" }}
                            >
                              {" "}
                              Field can't be empty!{" "}
                            </label>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      {/* Address */}
                      <div className="form-group d-flex mb-4">
                        <label className=" w-25 label-name">Address</label>
                        <div className="validation w-50">
                          <input
                            type="text"
                            className="form-control input-color"
                            placeholder="Address"
                            onChange={(e) => setAddress(e.target.value)}
                          />
                          {error && !address ? (
                            <label
                              className="form-label text-danger fw-bolder "
                              style={{ position: "absolute" }}
                            >
                              {" "}
                              Field can't be empty!{" "}
                            </label>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      {/* password */}
                      <div className="form-group d-flex mb-4">
                        <label className=" w-25 label-name">Password</label>
                        <div className="validation w-50">
                          <input
                            type="password"
                            className="form-control input-color"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          {error && !password ? (
                            <label
                              className="form-label text-danger fw-bolder "
                              style={{ position: "absolute" }}
                            >
                              {" "}
                              Field can't be empty!{" "}
                            </label>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={handleClose}
                    >
                      {" "}
                      Cancel{" "}
                    </button>
                    {loader ? (
                      <button
                        type="submit"
                        className="btn "
                        style={{ backgroundColor: "#21b7b5" }}
                        onClick={addUsers}
                      >
                        {" "}
                        Add User{" "}
                      </button>
                    ) : (
                      <CirclesWithBar
                        height="40"
                        width="90"
                        color="#4fa94d"
                        outerCircleColor="#4fa94d"
                        innerCircleColor="#4fa94d"
                        barColor="#4fa94d"
                        ariaLabel="circles-with-bar-loading"
                        wrapperStyle={{}}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* <div className="modal-backdrop fade show" style={{ position: "fixed" }} ></div> */}
        </div>

        {/* show user details */}

        <div className="container ">
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
              <div className="modal-dialog  modal-dialog-centered modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <div className="d-flex justify-content-between w-100">
                      <div className="d-flex align-items-center">
                        <img
                          width={78}
                          height={80}
                          src={userInfo.image}
                          alt="Profile"
                        />
                        <div className="ms-2 d-flex">
                          <h5>{userInfo.name}</h5>
                          {userInfo.status === true ? (
                            <ul>
                              <li className="text-success">Active</li>
                            </ul>
                          ) : (
                            <ul>
                              <li className="text-danger">D-Active</li>
                            </ul>
                          )}
                          {/* <p>Team Member</p> */}
                        </div>
                      </div>
                      <div className="fs-3">
                        <FaEye
                          style={{
                            backgroundColor: "#A7B2C3",
                            color: "#000",
                            borderRadius: "3px",
                            padding: "3px",
                            cursor: "pointer",
                          }}
                        />{" "}
                        &nbsp;
                        <BiEditAlt
                          style={{
                            backgroundColor: "#d3eae9",
                            color: "#24A1A7",
                            borderRadius: "3px",
                            padding: "3px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleShow(userInfo._id)}
                        />{" "}
                        &nbsp;
                        <MdDeleteOutline
                          style={{
                            backgroundColor: "#efd7da",
                            color: "#e82e44",
                            borderRadius: "3px",
                            padding: "3px",
                            cursor: "pointer",
                          }}
                          onClick={() => deleteUser(userInfo._id)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-6">
                        <p>
                          Email : <strong>{userInfo.email}</strong>
                        </p>
                        <p className="text-truncate">
                          Password: <strong>{userInfo.password}</strong>
                        </p>
                      </div>
                      <div className="col-6">
                        <p>
                          Contact: <strong>{userInfo.phone}</strong>
                        </p>
                        <p>
                          Last login date:{" "}
                          <strong>
                            {new Date(userInfo.updatedAt).toLocaleDateString(
                              "en-GB"
                            )}
                          </strong>
                        </p>{" "}
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={handleClose}
                    >
                      {" "}
                      Cancel{" "}
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

export default AgencyRoom;
