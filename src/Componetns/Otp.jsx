import axios from "axios";
import React, { useState } from "react";
import { Link,  useLocation,  useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../Layout";
import { IoIosArrowBack } from "react-icons/io";
import OtpInput from "react-otp-input";
import { CirclesWithBar } from "react-loader-spinner";


const Otp = () => {
  const [OTP, setOTP] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const[loader,setLoader] = useState(true)
  const [error,setError]=useState(false);

  const sendOTP = async (e) => {
    e.preventDefault();

    setError(true)
    try {
       if(OTP !== "")
        {
          const response = await axios.post( `http://localhost:8000/user/submitOtp`,{
            otp: OTP,
            email:email
          }
         );
      console.log(response);

      if (response.status === 200) {
        setLoader(false)
        toast.success("OTP Varification Successfully ");

        setTimeout(() => {
          setLoader(true)
          navigate(`/newPassword`,{state:{
            email:email
          }
          });
        }, 2000);
      }
    }
  }

    catch (error) {
      toast.error("Invalid OTP");
    }
  };

  return (
    <div>
      <Layout>
        <div className="row  container">
          <div className="col-md-6 d-xs-none d-block"></div>

          <div className=" col-md-6 d-flex justify-content-end">
            
            <div className="p-2" style={{ backgroundColor: "#07284B" }} >  
            <div className='mx-4 p-2 mt-2'>
                        <Link to="/authentication"> <IoIosArrowBack style={{ color: "#49a8bf" }} className="fs-1 " /> </Link>
                   </div> 
                <form className="p-5" onSubmit={sendOTP}>
                  <p className="text-white fw-bold " style={{ fontSize: "4vh" }}  >
                       Verify OTP
                  </p>
                  <p className="text-white" style={{ fontSize: "1.0rem" }}>
                  Enter the Varification Code Send on 
                  <br />{email}   &nbsp;&nbsp; 
                   <Link to="/authentication" style={{ color: "#49a8bf" }}>Edit here</Link>{" "}
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                  
                  <div className="form-outline mb-4">
                  <OtpInput  className="form-control border border-0" inputStyle={{ width: "2.5rem", height: "5vh",border:"0px" }}
             value={OTP}
             onChange={setOTP}
             numInputs={4}
             renderSeparator={<span> -- </span>}
             renderInput={(props) => <input {...props} />}
             />
          { error && !OTP ?   <label className="form-label text-danger" style={{position:'absolute'}} > OTP Is Required </label> : " "}

                  </div>
                 { loader  ? <button
                    type="submit"
                    className="btn rounded-0 "
                    style={{ backgroundColor: "#49a8bf", color: "#fff" }}
                  >
                     Verify
                  </button>
                  :
                  <CirclesWithBar height="40" width="90" color="#4fa94d" outerCircleColor="#4fa94d" innerCircleColor="#4fa94d"
  barColor="#4fa94d"
  ariaLabel="circles-with-bar-loading"
  wrapperStyle={{}}
 
  />}
                  <ToastContainer />
                </form>
             
            </div>
          </div>
        </div>
      </Layout>
{/*       
       <Layout>
        <div className="row container ">
          <div className="col-md-6 d-xs-none d-block"></div>

          <div className=" col-md-6  d-flex  justify-content-start"  style={{ backgroundColor: "#07284B"}}>
                   <div className='p-2 mt-2'>
                        <Link to="/authentication"> <IoIosArrowBack style={{ color: "#49a8bf" }} className="fs-1 " /> </Link>
                   </div> 
                 
                <form className="p-5" onSubmit={sendOTP}>

                  <p className="text-white fw-bold " style={{ fontSize: "4vh" }} >
                     Verify OTP
                  </p>
                  <p className="text-white" style={{ fontSize: "1.0rem" }}>
                  Enter the Varification Code Send on 
                 <br />{email}   &nbsp;    <Link to="/authentication" style={{ color: "#49a8bf" }}>Edit here</Link>{" "}
                  </p> <br />
                  <div className="form-outline mb-4">
                    
                  <OtpInput  className="form-control border border-0" inputStyle={{ width: "2.5rem", height: "5vh",border:"0px" }}
             value={OTP}
             onChange={setOTP}
             numInputs={4}
             renderSeparator={<span> -- </span>}
             renderInput={(props) => <input {...props} />}
             />
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          { error && !OTP ?   <label className="form-label text-danger" style={{position:'absolute'}} > OTP Is Required </label> : " "}

                  </div>
                { loader ?
                  <button type="submit" className="btn rounded-0 "  style={{ backgroundColor: "#49a8bf", color: "#fff" }} >
                     Verify
                  </button> :   <CirclesWithBar height="40" width="90" color="#4fa94d" outerCircleColor="#4fa94d" innerCircleColor="#4fa94d"
  barColor="#4fa94d"
  ariaLabel="circles-with-bar-loading"
  wrapperStyle={{}}
 
  />}
                  <ToastContainer />
                </form>
             
            </div>
        </div>
      </Layout> */}

   
    </div>
  );
};

export default Otp;