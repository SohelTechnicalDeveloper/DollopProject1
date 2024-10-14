import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../Layout";
import { IoIosArrowBack } from "react-icons/io";
import "../Styles/Authentication.css";
import { CirclesWithBar } from "react-loader-spinner";
const Authentication = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);

  const changePassword = async (e) => {
    setLoader(false);

    if (email === "") {
      setEmail("email is required");
    }
    e.preventDefault();
    try {
      setError(!error);
      if (email !== "") {
        const response = await axios.post(
          `http://localhost:8000/user/sendOtp`,
          {
            email: email,
          }
        );

        if (response.status === 201) {
          toast.success("Send OTP Success");
          setTimeout(() => {
            navigate("/otpSend", {
              state: {
                email: email,
              },
            });
          }, 2000);
        }
      }
    } catch (error) {
      toast.error("Invalid User ID");
    } 
    finally {
      setLoader(true);
    }
  };

  return (
    <Layout>
        <div className="container-fluid d-flex flex-column vh-100">
        <div className="row flex-grow-1 ">
          <div className=" col-12 col-md-6 d-none d-md-block"></div>

          <div className=" col-12 col-md-6 d-flex align-items-center justify-content-end p-5  ">
            <div className="p-3 p-md-5" style={{ backgroundColor: "#07284B" }}>
              <div className="mx-4  mt-4">
                <Link to="/">
                  {" "}
                  <IoIosArrowBack
                    style={{ color: "#49a8bf" }}
                    className="fs-1 "
                  />{" "}
                </Link>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <form className="px-4 py-5" onSubmit={changePassword}>
                <p className="text-white fw-bold " style={{ fontSize: "4vh" }}>
                  Forgot Password
                </p>
                <p className="text-white" style={{ fontSize: "1.0rem" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                  dolores voluptatibus culpa laborum officia velit .
                </p>
                {/* Email input */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example3"
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control  input-color rounded-0"
                    placeholder="Email"
                  />
                  {/* <p className='text-danger'>{email}</p> */}
                  {error && !email ? (
                    <label
                      className="form-label text-danger "
                      style={{ position: "absolute" }}
                    >
                      {" "}
                      Email Is Required{" "}
                    </label>
                  ) : (
                    ""
                  )}{" "}
                  <br />
                </div>

                {loader ? (
                  <button
                    type="submit"
                    className="btn rounded-0 "
                    style={{ backgroundColor: "#49a8bf", color: "#fff" }}
                  >
                    Send OTP
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

export default Authentication;

// <Layout>
// <div className="row h-100 mx-5 ">
//   <div className="col-md-6">

//   </div>

//   <div className="col-md-6 m-auto">
//     <div className="" style={{height:"100%"}}>

//     <div className="card card-auth" style={{ backgroundColor: "#0f1e54",  }}>
//       <div className="card-body" style={{border:"1px solid red",padding:""}} >
//        <Link to="/"> <IoIosArrowBack style={{ color: "#49a8bf" }} className="fs-1" /> </Link>
//         <br /> <br />
//         <form onSubmit={changePassword}>
//           <p className="text-white" style={{fontSize:"4vh"}}>Forgot Password</p>
//           <p className="text-white" style={{fontSize:"2.5vh"}}>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
//             dolores voluptatibus culpa laborum officia velit .
//           </p>
//           {/* Email input */}
//           <div className="form-outline mb-4">
//             <input
//               type="email"
//               id="form3Example3"
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-control w-50"
//               placeholder='Enter Your Email'
//               required  />

//           </div>
//           {/* <div className="row"> */}
//            <button type="submit" style={{backgroundColor:"#49a8bf",borderRadius:"0px" }}   className="btn mb-4">
//              Send OTP
//            </button>
//            <ToastContainer/>
//                {/* </div> */}
//         </form>
//       </div>
//     </div>
//   </div>
// </div>
// </div>

// </Layout>
