import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "../Styles/Login.css";
import Layout from "../Layout";
import { CirclesWithBar } from "react-loader-spinner";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  // const regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const baseUrl = process.env.REACT_AaaAPP_BASE_URL
  

  const userLogin = async (e) => {

    e.preventDefault();
    try {
      setError(!error);
      if (email !== "" && password !== "") {
        const response = await axios.post(`http://192.168.0.139:8000/user/login`, {
          email: email,
          password: password,
        });

        if (response.status === 200) {
          setLoader(false);
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.data, response.data.token)
          );

          toast.success("Login Success");

          setTimeout(() => {
            setLoader(true);
            navigate("/userdata");
          }, 2000);
        }
        else{
             toast.error(response.data.error);
        }
      }
    } catch (error) {
      toast.error(error.response.data.status);
    }
  };

  return (
    <Layout>
     <div className="container-fluid d-flex flex-column vh-100">
  <div className="row flex-grow-1">
    {/* Left side (empty on small screens) */}
    <div className="col-12 col-md-6 d-none d-md-block"></div>

    {/* Right side (login form) */}
    <div className="col-12 col-md-6 d-flex align-items-center justify-content-end p-5  ">
      <div className="p-3 p-md-5" style={{ backgroundColor: "#07284B", maxWidth: "100%" }}>
        <form className="px-4 py-5" onSubmit={userLogin}>
          <p className="text-white fw-bold" style={{ fontSize: "4vh" }}>
            Login to your account
          </p>
          <p className="text-white" style={{ fontSize: "1.0rem" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            dolores voluptatibus culpa laborum officia velit.
          </p>

          {/* Email input */}
          <div className="form-outline mb-4">
            <input
              type="text"
              id="form3Example3"
              onChange={(e) => setEmail(e.target.value)}
              className="form-control input-color rounded-0"
              placeholder="Email"
            />
            {error && !email ? (
              <label className="form-label text-danger  position-absolute">
                Field can't be empty!
              </label>
            ) : null}
          </div>

          {/* Password input */}
          <div className="form-outline mb-4">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="form3Example4"
              className="form-control input-color rounded-0"
              placeholder="Password"
            />
            {error && !password ? (
              <label className="form-label text-danger position-absolute">
                Field can't be empty!
              </label>
            ) : null}

            <div className="text-end mt-2">
              <Link
                to="/authentication"
                style={{ color: "#067D83" }}
                className="text-decoration-none"
              >
                Forget Password
              </Link>
            </div>
          </div>

          {/* Submit button / Loader */}
          {loader ? (
            <button
              type="submit"
              className="btn rounded-0 "
              style={{ backgroundColor: "#49a8bf", color: "#fff" }}
            >
              Sign In
            </button>
          ) : (
            <div className="d-flex justify-content-center">
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
              
            </div>
          )}

          {/* Toast notifications */}
          <ToastContainer />
        </form>
      </div>
    </div>
  </div>
</div>

    </Layout>
  );
};

export default Home;
