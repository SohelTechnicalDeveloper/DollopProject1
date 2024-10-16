import axios from "axios";
import React, { useEffect, useState } from "react";
import MainLayout from "../MainLayout";
import userImage from "../images/SM596414 (1).jpg";
import "../Styles/Userdata.css";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

const Userdata = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL
console.log(baseUrl);


  const auth = JSON.parse(localStorage.getItem("user"));
 
  const getUser = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/getUser`, {
        headers: {
          Authorization: `bearer ${auth.token}`,
        },
      });
      console.log(response,"hello");
      
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (auth) {
      getUser();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <MainLayout>
      <div
          id="carouselExampleDark"
          className="carousel carousel-dark slide"
          data-bs-ride="carousel"
        >
          {/* <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={0}
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={1}
              aria-label="Slide 2"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={2}
              aria-label="Slide 3"
            />
          </div> */}
           <div className="carousel-inner h-50">
          <div className="carousel-item active" data-bs-interval={15000}>
            <img height={500}  src="https://s3.ap-south-1.amazonaws.com/awsimages.imagesbazaar.com/1200x1800-new/11164/SM351615.jpg" className="carousel-image d-block w-100" alt="..." />
          </div>
          <div className="carousel-item" data-bs-interval={15000}>
            <img height={500} src="https://s3.ap-south-1.amazonaws.com/awsimages.imagesbazaar.com/900x600/2595/20-SM98724.jpg" className="carousel-image d-block w-100" alt="..." />
          </div>
          <div className="carousel-item" data-bs-interval={15000}> 
            <img height={500} src="https://s3.ap-south-1.amazonaws.com/awsimages.imagesbazaar.com/900x600/5940/20-SM150261.jpg" className="carousel-image d-block w-100" alt="..." />
          </div>
        </div>
        
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" style={{color:"#000",fontSize:"18rem"}} aria-hidden="true" />
            <span className="visually-hidden" >Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* //User Data card */}
      <div className="row mt-5 mx-3">
          {data.map((item) => {
            return (
              <div className="col-md-4 col-lg-3 col-sm-6 p-2">
                <div className="card d-flex justify-content-center align-items-center card-style"   >
                  <img
                    className="card-img-top p-3 "
                    alt="userImage"
                    src={userImage}
                  />
                  <div className="card-body  justify-content-center align-content-center text-center" >
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text text-center">Female</p>
                    <p
                      className="card-text text-center"
                      style={{ fontSize: "12px" }}
                    >
                      {item.email}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </MainLayout>
    </div>
  );
};

export default Userdata;
