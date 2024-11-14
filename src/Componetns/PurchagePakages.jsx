import React, { useEffect, useState } from "react";
import MainLayout from "../MainLayout";
import userImage from "../images/SM596414 (1).jpg";
import { Link } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import "../Styles/Purchasepack.css";
import axios from "axios";

const PurchagePakages = () => {
    const[allData,setAllData] = useState([])
    console.log(allData);
    const IPAddress = 'http://192.168.0.22:5003/uploads/'
    

    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjcyYTAwMGU5ZWVhMDZhNzg5OWY0NWQ4IiwiaWF0IjoxNzMxNTYyMTM2LCJleHAiOjE3MzE2NDg1MzZ9.rWEVlFkpCuK9mNxTup6gQkMUkwvmeu3YBpmIoj93rd8`;

   const getAllData  = async ()=>{
    try {
        
        const response = await axios.get(`http://192.168.0.22:5003/package/getAll`,{
            headers:{
                Authorization:`Bearer ${token}`
            },
            params:{
                offset:0,
                limit:9
            }
        })
        if(response.status===200)
        {
            setAllData(response.data.packages)            
        }
    } catch (error) 
    {

        
    }
   }
   useEffect(()=>{
          getAllData()
   },[])

  return (
    <div>
      <MainLayout>
        <div className="text-black fw-bold m-3  fs-3">Packages</div>
        <div className="row mt-4 mx-3">
         { 
           allData.map((item,index)=>{
            return <div className="col-md-4 col-lg-3  col-sm-6 p-2 mb-4">
             <div className="card  border-0">
              <img
                src={`http://192.168.0.22:5003/uploads/`+item.mainImage}
                className="card-img-top card-style"
                style={{ objectFit: 'cover', height: '200px' }}
                alt="Exam Image"
              />
              <div className="card-body">
                <h6 className="card-title fw-bold mb-3  text-truncate" data-toggle="tooltip" data-placement="right" title={item.packageName}>
                 {item.packageName}
                </h6>
                <p className="card-text text-end">
                  {" "}
                  <Link className="text-decoration-none fw-bold" style={{color:"#e68a00"}}>
                    Package Details <MdArrowForwardIos className="fw-bold" />
                  </Link>
                </p>
                <hr />
                <p className="card-price mt-3">
                  ₹ {item.discountedPrice}{" "}
                  <del className="text-secondary mx-3" style={{ fontSize: "15px" }}>
                    ₹ {item.actualPrice}
                  </del>
                </p>
                <button
                  type="button"
                  className="btn  w-100 text-white px-4 py-2 fw-bold fw-bold"
                  style={{ borderRadius: "10px", backgroundColor: "#F6790B" }}
                >
                  Add To Cart
                </button>{" "}
              </div>
            </div>
          </div>
         })   
        }
          <div className="col-md-4 col-lg-3 col-sm-6 p-2 mb-4">
            <div className="card h-100  border-0">
              <img
                src={userImage}
                className="card-img-top  card-style"
                alt="Exam Image"
              />
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3"  data-toggle="tooltip" data-placement="right" title="Edit">
                  BHARAT SAT EXAM & 3 Mock Test
                </h5>
                <p className="card-text text-end">
                  {" "}
                  <Link className="text-decoration-none  fw-bold"  style={{color:"#e68a00"}}>
                    Package Details <MdArrowForwardIos className="fw-bold" />
                  </Link>
                </p>
                <hr />
                <p className="card-price mt-3">
                  ₹ 1359{" "}
                  <del className="text-secondary" style={{ fontSize: "15px" }}>
                    ₹ 1599
                  </del>
                </p>
                <button
                  type="button"
                  className="btn  w-100 text-white px-4 py-2 fw-bold fw-bold"
                  style={{ borderRadius: "10px", backgroundColor: "#F6790B" }}
                >
                  Add To Cart
                </button>{" "}
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-3 col-sm-6 p-2 mb-4">
            <div className="card h-100  border-0">
              <img
                src={userImage}
                className="card-img-top card-style"
                alt="Exam Image"
              />
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">
                  BHARAT SAT EXAM & 3 Mock Test
                </h5>
                <p className="card-text text-end">
                  {" "}
                  <Link className="text-decoration-none  fw-bold"  style={{color:"#e68a00"}}>
                    Package Details <MdArrowForwardIos className="fw-bold" />
                  </Link>
                </p>
                <hr />
                <p className="card-price mt-3">
                  ₹ 1359{" "}
                  <del className="text-secondary" style={{ fontSize: "15px" }}>
                    ₹ 1599
                  </del>
                </p>
                <button
                  type="button"
                  className="btn  w-100 text-white px-4 py-2 fw-bold fw-bold"
                  style={{ borderRadius: "10px", backgroundColor: "#F6790B" }}
                >
                  Add To Cart
                </button>{" "}
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-3 col-sm-6 p-2 mb-4">
            <div className="card h-100  border-0">
              <img
                src={userImage}
                className="card-img-top card-style"
                alt="Exam Image"
              />
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">
                  BHARAT SAT EXAM & 3 Mock Test
                </h5>
                <p className="card-text text-end">
                  {" "}
                  <Link className="text-decoration-none  fw-bold"  style={{color:"#e68a00"}}>
                    Package Details <MdArrowForwardIos className="fw-bold" />
                  </Link>
                </p>
                <hr />
                <p className="card-price mt-3">
                  ₹ 1359{" "}
                  <del className="text-secondary" style={{ fontSize: "15px" }}>
                    ₹ 1599
                  </del>
                </p>
                <button
                  type="button"
                  className="btn  w-100 text-white px-4 py-2 fw-bold fw-bold"
                  style={{ borderRadius: "10px", backgroundColor: "#F6790B" }}
                >
                  Add To Cart
                </button>{" "}
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-3 col-sm-6 p-2 mb-4">
            <div className="card h-100  border-0">
              <img
                src={userImage}
                className="card-img-top card-style"
                alt="Exam Image"
              />
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">
                  BHARAT SAT EXAM & 3 Mock Test
                </h5>
                <p className="card-text text-end">
                  {" "}
                  <Link className="text-decoration-none  fw-bold"  style={{color:"#e68a00"}}>
                    Package Details <MdArrowForwardIos className="fw-bold" />
                  </Link>
                </p>
                <hr />
                <p className="card-price mt-3">
                  ₹ 1359{" "}
                  <del className="text-secondary" style={{ fontSize: "15px" }}>
                    ₹ 1599
                  </del>
                </p>
                <button
                  type="button"
                  className="btn  w-100 text-white px-4 py-2 fw-bold fw-bold"
                  style={{ borderRadius: "10px", backgroundColor: "#F6790B" }}
                >
                  Add To Cart
                </button>{" "}
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-3 col-sm-6 p-2 mb-4">
            <div className="card h-100  border-0">
              <img
                src={userImage}
                className="card-img-top card-style"
                alt="Exam Image"
              />
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">
                  BHARAT SAT EXAM & 3 Mock Test
                </h5>
                <p className="card-text text-end">
                  {" "}
                  <Link className="text-decoration-none  fw-bold"  style={{color:"#e68a00"}}>
                    Package Details <MdArrowForwardIos className="fw-bold" />
                  </Link>
                </p>
                <hr />
                <p className="card-price mt-3">
                  ₹ 1359{" "}
                  <del className="text-secondary" style={{ fontSize: "15px" }}>
                    ₹ 1599
                  </del>
                </p>
                <button
                  type="button"
                  className="btn  w-100 text-white px-4 py-2 fw-bold fw-bold"
                  style={{ borderRadius: "10px", backgroundColor: "#F6790B" }}
                >
                  Add To Cart
                </button>{" "}
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-3 col-sm-6 p-2 mb-4">
            <div className="card h-100  border-0">
              <img
                src={userImage}
                className="card-img-top card-style"
                alt="Exam Image"
              />
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">
                  BHARAT SAT EXAM & 3 Mock Test
                </h5>
                <p className="card-text text-end">
                  {" "}
                  <Link className="text-decoration-none  fw-bold"  style={{color:"#e68a00"}}>
                    Package Details <MdArrowForwardIos className="fw-bold" />
                  </Link>
                </p>
                <hr />
                <p className="card-price mt-3">
                  ₹ 1359{" "}
                  <del className="text-secondary" style={{ fontSize: "15px" }}>
                    ₹ 1599
                  </del>
                </p>
                <button
                  type="button"
                  className="btn  w-100 text-white px-4 py-2 fw-bold fw-bold"
                  style={{ borderRadius: "10px", backgroundColor: "#F6790B" }}
                >
                  Add To Cart
                </button>{" "}
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-3 col-sm-6 p-2 mb-4">
            <div className="card h-100  border-0">
              <img
                src={userImage}
                className="card-img-top card-style"
                alt="Exam Image"
              />
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">
                  BHARAT SAT EXAM & 3 Mock Test
                </h5>
                <p className="card-text text-end">
                  {" "}
                  <Link className="text-decoration-none  fw-bold"  style={{color:"#e68a00"}}>
                    Package Details <MdArrowForwardIos className="fw-bold" />
                  </Link>
                </p>
                <hr />
                <p className="card-price mt-3">
                  ₹ 1359{" "}
                  <del className="text-secondary" style={{ fontSize: "15px" }}>
                    ₹ 1599
                  </del>
                </p>
                <button
                  type="button"
                  className="btn  w-100 text-white px-4 py-2 fw-bold fw-bold"
                  style={{ borderRadius: "10px", backgroundColor: "#F6790B" }}
                >
                  Add To Cart
                </button>{" "}
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-3 col-sm-6 p-2 mb-4">
            <div className="card h-100  border-0">
              <img
                src={userImage}
                className="card-img-top card-style"
                alt="Exam Image"
              />
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">
                  BHARAT SAT EXAM & 3 Mock Test
                </h5>
                <p className="card-text text-end">
                  {" "}
                  <Link className="text-decoration-none  fw-bold"  style={{color:"#e68a00"}}>
                    Package Details <MdArrowForwardIos className="fw-bold" />
                  </Link>
                </p>
                <hr />
                <p className="card-price mt-3">
                  ₹ 1359{" "}
                  <del className="text-secondary" style={{ fontSize: "15px" }}>
                    ₹ 1599
                  </del>
                </p>
                <button
                  type="button"
                  className="btn  w-100 text-white px-4 py-2 fw-bold fw-bold"
                  style={{ borderRadius: "10px", backgroundColor: "#F6790B" }}
                >
                  Add To Cart
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default PurchagePakages;
