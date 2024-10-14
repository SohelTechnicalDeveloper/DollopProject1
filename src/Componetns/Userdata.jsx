import axios from "axios";
import React, { useEffect, useState } from "react";
import MainLayout from "../MainLayout";
import userImage from "../images/SM596414 (1).jpg";
import "../Styles/Userdata.css";
import { useNavigate } from "react-router-dom";

const Userdata = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const auth = JSON.parse(localStorage.getItem("user"));

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/user/getUser`, {
        headers: {
          Authorization: `bearer ${auth.token}`,
        },
      });
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
