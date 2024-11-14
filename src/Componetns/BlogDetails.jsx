import React, { useState } from "react";
import MainLayout from "../MainLayout";
import userImage from "../images/SM596414 (1).jpg";
import { FaRegUser } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { Link } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import '../Styles/Blogdetails.css'

const BlogDetails = () => {
   const[activeLink,setactiveLink] = useState('General')

   const handleClick = (link) => {
    setactiveLink(link);
  };
 
   return (
    <div>
      <MainLayout>
        <div className="d-flex justify-content-center mt-5 ">
          <ul className="nav mb-4 nav-list">
            <li className="nav-item">
              <Link className={`nav-link blog-list ${activeLink === "GENERAL" ? "active" : "text-black"}`} href="#" onClick={() => handleClick("GENERAL")}>
                GENERAL
              </Link>
            </li>
          </ul>
          <ul className="nav mb-4 nav-list">
            <li className="nav-item">
              <Link className={`nav-link blog-list ${activeLink === "EDUCATION" ? "active" : "text-black"}`} href="#"  onClick={() => handleClick("EDUCATION")} >
                EDUCATION
              </Link>
            </li>
          </ul>{" "}
          <ul className="nav mb-4 nav-list">
            <li className="nav-item">
              <Link className="nav-link  blog-list  text-black" href="#"  >
                BHARAT SAT
              </Link>
            </li>
          </ul>{" "}
          <ul className="nav mb-4 nav-list">
            <li className="nav-item">
              <Link className="nav-link  blog-list  text-black" href="#"  >
                COURSES
              </Link>
            </li>
          </ul>
          <ul className="nav mb-4 nav-list">
            <li className="nav-item">
              <Link className="nav-link  blog-list  text-black" href="#"  >
                QUESTION BANK
              </Link>
            </li>
          </ul>
        </div>

        <div className="row mt-4 mx-3">
          <div className="col-md-4 col-lg-3  col-sm-6 p-2 mb-4">
            <div className="card  border-0">
              <img
                src={userImage}
                className="card-img-top card-style rounded-5"
                style={{ objectFit: "cover", height: "200px" }}
                alt="Exam Image"
              />
              <div className="card-body">
                <div className="d-flex justify-content-around">
                  <p>
                    <FaRegUser /> Sohel Khan
                  </p>
                  <p>
                    <CiCalendarDate /> July 8, 2024
                  </p>
                </div>
                <h6
                  className="card-title fw-bold mb-3 "
                  style={{ color: "#07284B",fontSize:"18px" }}
                >
                  Empowering Students with Free E-learning Services..
                </h6>
                <p className="truncate text-black "  data-toggle="tooltip" data-placement="right" title="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Labore sunt at obcaecati soluta beatae, laborum vero qui
                  inventore unde omnis!">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Labore sunt at obcaecati soluta beatae, laborum vero qui
                  inventore unde omnis!
                </p>
                <p className="card-text text-end">
                  <Link className=" text-decoration-none text-black fw-bold">
                    Read More <MdArrowForwardIos className="fw-bold" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-3  col-sm-6 p-2 mb-4">
            <div className="card  border-0">
              <img
                src={userImage}
                className="card-img-top card-style rounded-5"
                style={{ objectFit: "cover", height: "200px" }}
                alt="Exam Image"
              />
              <div className="card-body">
                <div className="d-flex justify-content-around">
                  <p>
                    <FaRegUser /> Sohel Khan
                  </p>
                  <p>
                    <CiCalendarDate /> July 8, 2024
                  </p>
                </div>
                <h6
                  className="card-title fw-bold mb-3 "
                  style={{ color: "#07284B",fontSize:"18px" }}
                >
                  Empowering Students with Free E-learning Services..
                </h6>
                <p className="truncate text-black ">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Labore sunt at obcaecati soluta beatae, laborum vero qui
                  inventore unde omnis!
                </p>
                <p className="card-text text-end">
                  <Link className=" text-decoration-none text-black fw-bold">
                    Read More <MdArrowForwardIos className="fw-bold" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-3  col-sm-6 p-2 mb-4">
            <div className="card  border-0">
              <img
                src={userImage}
                className="card-img-top card-style rounded-5"
                style={{ objectFit: "cover", height: "200px" }}
                alt="Exam Image"
              />
              <div className="card-body">
                <div className="d-flex justify-content-around">
                  <p>
                    <FaRegUser /> Sohel Khan
                  </p>
                  <p>
                    <CiCalendarDate /> July 8, 2024
                  </p>
                </div>
                <h6
                  className="card-title fw-bold mb-3 "
                  style={{ color: "#07284B",fontSize:"18px" }}
                >
                  Empowering Students with Free E-learning Services..
                </h6>
                <p className="truncate text-black">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Labore sunt at obcaecati soluta beatae, laborum vero qui
                  inventore unde omnis!
                </p>
                <p className="card-text text-end">
                  <Link className=" text-decoration-none text-black fw-bold">
                    Read More <MdArrowForwardIos className="fw-bold" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-3  col-sm-6 p-2 mb-4">
            <div className="card  border-0">
              <img
                src={userImage}
                className="card-img-top card-style rounded-5"
                style={{ objectFit: "cover", height: "200px" }}
                alt="Exam Image"
              />
              <div className="card-body">
                <div className="d-flex justify-content-around">
                  <p>
                    <FaRegUser /> Sohel Khan
                  </p>
                  <p>
                    <CiCalendarDate /> July 8, 2024
                  </p>
                </div>
                <h6
                  className="card-title fw-bold mb-3 "
                  style={{ color: "#07284B",fontSize:"18px" }}
                >
                  Empowering Students with Free E-learning Services..
                </h6>
                <p className="truncate text-black">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Labore sunt at obcaecati soluta beatae, laborum vero qui
                  inventore unde omnis!
                </p>
                <p className="card-text text-end">
                  <Link className=" text-decoration-none text-black fw-bold">
                    Read More <MdArrowForwardIos className="fw-bold" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-3  col-sm-6 p-2 mb-4">
            <div className="card  border-0">
              <img
                src={userImage}
                className="card-img-top card-style rounded-5"
                style={{ objectFit: "cover", height: "200px" }}
                alt="Exam Image"
              />
              <div className="card-body">
                <div className="d-flex justify-content-around">
                  <p>
                    <FaRegUser /> Sohel Khan
                  </p>
                  <p>
                    <CiCalendarDate /> July 8, 2024
                  </p>
                </div>
                <h6
                  className="card-title fw-bold mb-3 "
                  style={{ color: "#07284B",fontSize:"18px" }}
                >
                  Empowering Students with Free E-learning Services..
                </h6>
                <p className="truncate text-black">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Labore sunt at obcaecati soluta beatae, laborum vero qui
                  inventore unde omnis!
                </p>
                <p className="card-text text-end">
                  <Link className=" text-decoration-none text-black fw-bold">
                    Read More <MdArrowForwardIos className="fw-bold" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-3  col-sm-6 p-2 mb-4">
            <div className="card  border-0">
              <img
                src={userImage}
                className="card-img-top card-style rounded-5"
                style={{ objectFit: "cover", height: "200px" }}
                alt="Exam Image"
              />
              <div className="card-body">
                <div className="d-flex justify-content-around">
                  <p>
                    <FaRegUser /> Sohel Khan
                  </p>
                  <p>
                    <CiCalendarDate /> July 8, 2024
                  </p>
                </div>
                <h6
                  className="card-title fw-bold mb-3 "
                  style={{ color: "#07284B",fontSize:"18px" }}
                >
                  Empowering Students with Free E-learning Services..
                </h6>
                <p className="truncate text-black">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Labore sunt at obcaecati soluta beatae, laborum vero qui
                  inventore unde omnis!
                </p>
                <p className="card-text text-end">
                  <Link className=" text-decoration-none text-black fw-bold">
                    Read More <MdArrowForwardIos className="fw-bold" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-3  col-sm-6 p-2 mb-4">
            <div className="card  border-0">
              <img
                src={userImage}
                className="card-img-top card-style rounded-5"
                style={{ objectFit: "cover", height: "200px" }}
                alt="Exam Image"
              />
              <div className="card-body">
                <div className="d-flex justify-content-around">
                  <p>
                    <FaRegUser /> Sohel Khan
                  </p>
                  <p>
                    <CiCalendarDate /> July 8, 2024
                  </p>
                </div>
                <h6
                  className="card-title fw-bold mb-3 "
                  style={{ color: "#07284B",fontSize:"18px" }}
                >
                  Empowering Students with Free E-learning Services..
                </h6>
                <p className="truncate text-black">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Labore sunt at obcaecati soluta beatae, laborum vero qui
                  inventore unde omnis!
                </p>
                <p className="card-text text-end">
                  <Link className=" text-decoration-none text-black fw-bold">
                    Read More <MdArrowForwardIos className="fw-bold" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-3  col-sm-6 p-2 mb-4">
            <div className="card  border-0">
              <img
                src={userImage}
                className="card-img-top card-style rounded-5"
                style={{ objectFit: "cover", height: "200px" }}
                alt="Exam Image"
              />
              <div className="card-body">
                <div className="d-flex justify-content-around">
                  <p>
                    <FaRegUser /> Sohel Khan
                  </p>
                  <p>
                    <CiCalendarDate /> July 8, 2024
                  </p>
                </div>
                <h6
                  className="card-title fw-bold mb-3 "
                  style={{ color: "#07284B",fontSize:"18px" }}
                >
                  Empowering Students with Free E-learning Services..
                </h6>
                <p className="truncate text-black">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Labore sunt at obcaecati soluta beatae, laborum vero qui
                  inventore unde omnis!
                </p>
                <p className="card-text text-end">
                  <Link className=" text-decoration-none text-black fw-bold">
                    Read More <MdArrowForwardIos className="fw-bold" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default BlogDetails;
