import React, { useState } from "react";
import Layout from "../Layout";
import { toast, ToastContainer } from "react-toastify";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CirclesWithBar } from "react-loader-spinner";

const ForgetPass = () => {
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const location = useLocation();
  const { email } = location.state || {};
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL

  const updatePassword = async (e) => {

    e.preventDefault();

    try {
      setError(!error);
      if (password !== "" && confPassword !== "") {
        const response = await axios.patch(
          `${baseUrl}/user/updateUserPassword`,
          {
            email: email,
            password: password,
            confPassword: confPassword,
          }
        );
        console.log(response);

        if (response.status === 200) {
          setLoader(false);

          toast.success("Password Successfully Updated");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      }
    } catch (error) {
      toast.error("Password Not Matched");
    }
  };

  return (
    <Layout>
        <div className="container-fluid d-flex flex-column vh-100">
        <div className="row  flex-grow-1">
          <div className=" col-12 col-md-6 d-none d-md-block"></div>

          <div className=" col-12 col-md-6 d-flex align-items-center justify-content-end p-5">
            <div className="p-3 p-md-5" style={{ backgroundColor: "#07284B" }}>
              <div className="mx-4 p-2 mt-2 ">
                <Link to="/">
                  {" "}
                  <IoIosArrowBack
                    style={{ color: "#49a8bf" }}
                    className="fs-1 "
                  />{" "}
                </Link>
              </div>
              <form className="px-4 py-5" onSubmit={updatePassword}>
                <p className="text-white fw-bold " style={{ fontSize: "4vh" }}>
                  New Password
                </p>
                <p className="text-white" style={{ fontSize: "1.0rem" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                  dolores voluptatibus culpa laborum officia velit .
                </p>
                {/* Email input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form3Example3"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control  input-color rounded-0"
                    placeholder="New Password"
                  />
                  {error && !password ? (
                    <label
                      className="form-label text-danger "
                      style={{ position: "absolute" }}
                    >
                      {" "}
                      Field Is Required{" "}
                    </label>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form3Example3"
                    onChange={(e) => setConfPassword(e.target.value)}
                    className="form-control  input-color rounded-0"
                    placeholder="Confirm Password"
                  />
                  {error && !confPassword ? (
                    <label
                      className="form-label text-danger "
                      style={{ position: "absolute" }}
                    >
                      {" "}
                      Field Is Required{" "}
                    </label>
                  ) : (
                    ""
                  )}
                </div>

                {loader ? (
                  <button
                    type="submit"
                    className="btn rounded-0 "
                    style={{ backgroundColor: "#49a8bf", color: "#fff" }}
                  >
                    Set Password
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
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
    </div>
      </Layout>
  );
};

export default ForgetPass;
