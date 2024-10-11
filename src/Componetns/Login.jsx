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

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      setError(!error);
      if (email !== "" && password !== "") {
        const response = await axios.post(`http://localhost:8000/user/login`, {
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
      }
    } catch (error) {
      toast.error(error.response.data.status);
    }
  };

  return (
    <Layout>
      <div className="row  container">
        <div className="col-md-6 d-xs-none d-block"></div>

        <div className=" col-md-6 d-flex justify-content-end">
          <div className="p-2" style={{ backgroundColor: "#07284B" }}>
            <form className="p-5 " onSubmit={userLogin}>
              <p className="text-white fw-bold " style={{ fontSize: "4vh" }}>
                Login to your account
              </p>
              <p className="text-white" style={{ fontSize: "1.0rem" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                dolores voluptatibus culpa laborum officia velit .
              </p>
              {/* Email input */}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="form3Example3"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control  input-color rounded-0"
                  placeholder=" Email"
                />

                {error && !email ? (
                  <label
                    className="form-label text-danger "
                    style={{ position: "absolute" }}
                  >
                    {" "}
                    Field can't be empty!{" "}
                  </label>
                ) : (
                  ""
                )}
              </div>
              {/* Password input */}
              <div className="form-outline mb-4">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  id="form3Example4"
                  className="form-control  input-color rounded-0"
                  placeholder=" Password"
                />
                {error && !password ? (
                  <label
                    className="form-label text-danger"
                    style={{ position: "fixed" }}
                  >
                    Field can't be empty!{" "}
                  </label>
                ) : (
                  " "
                )}

                <div className="text-end">
                  <Link
                    to="/authentication"
                    style={{ color: "#067D83" }}
                    className="text-decoration-none mb-2 "
                  >
                    Forget Password
                  </Link>
                </div>
              </div>
              {loader ? (
                <button
                  type="submit"
                  className="btn rounded-0 "
                  style={{ backgroundColor: "#49a8bf", color: "#fff" }}
                >
                  Sign In
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
    </Layout>
  );
};

export default Home;
