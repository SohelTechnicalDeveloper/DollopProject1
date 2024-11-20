import React, { useEffect, useState } from "react";
import MainLayout from "../MainLayout";
import userImage from "../images/SM596414 (1).jpg";
import { FaRegUser } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { Link } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import "../Styles/Blogdetails.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import BlogById from "./BlogById";

const BlogDetails = () => {
  const [activeLink, setactiveLink] = useState("Education");
  const [allBlog, setAllBlog] = useState([]);
  const [name, setName] = useState(null);
  const [blog_category_id, setblog_category_id] = useState(null);

  const AllBlog = async () => {
    try {
      const response = await axios.get(`http://192.168.0.27:5003/blog/getAll`, {
        params: {
          blog_Category_id: blog_category_id,
        },
      });
      if (response.status === 200) {
        setAllBlog(response.data.data);
        setName(name?name:response.data.data.blogCategoryData[0].categoryName)
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  const handleClickSubName = (sub) => {
    setactiveLink(sub.categoryName);
    setName(sub.categoryName)
    setblog_category_id(sub.blog_Category_id);
  };

  useEffect(() => {
    AllBlog();
  }, [blog_category_id]);
  return (
    <div>
      <MainLayout>
        <div className="d-flex justify-content-center mt-5  ">
          {allBlog.blogCategoryData?.map((item, index) => {
            return (
              <ul className="nav mb-4 nav-list">
                <li className="nav-item">
                  <Link
                    className={`nav-link  blog-list ${
                      activeLink === item.categoryName ? "active" : "text-black"
                    }`}
                    href="#"
                    onClick={() => handleClickSubName(item)}
                  >
                    {item.categoryName}
                  </Link>
                </li>
              </ul>
            );
          })}
        </div>

        <div className="row mt-4 mx-3">
          {allBlog.BlogData?.map((data) => {
            return (
              <div className="col-md-4 col-lg-3  col-sm-6 p-2 mb-4">
                <div className="card  border-0">
                  <img
                    src={`http://192.168.0.27:5003/uploads/` + data.mainImage}
                    className="card-img-top card-style rounded-5"
                    height={200}
                    alt="Exam Image"
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-around">
                      <p>
                        <FaRegUser /> &nbsp; {data.name}
                      </p>
                      <p>
                        <CiCalendarDate /> {data.date.slice(0, 10)}
                      </p>
                    </div>
                    <h6
                      className="card-title fw-bold mb-3  truncate "
                      title={data.title}
                      style={{ color: "#07284B", fontSize: "18px" }}
                    >
                      {data.title}
                    </h6>
                    <p
                      className="truncate text-black "
                      data-toggle="tooltip"
                      data-placement="right"
                      title="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Labore sunt at obcaecati soluta beatae, laborum vero qui
                  inventore unde omnis!"
                    >
                      {data.briefIntro}
                    </p>
                    <p className="card-text text-end">
                      <Link
                        className=" text-decoration-none text-black fw-bold"
                        onClick={() => {
                          handleClickSubName(data);
                        }}
                        to={`/BlogDetailsById/${data.blog_id}`}
                        state={{allBlog:name}}
                      >
                        Read More <MdArrowForwardIos className="fw-bold" />
                      </Link>
                      <ToastContainer />
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {/* <div className="col-md-4 col-lg-3  col-sm-6 p-2 mb-4">
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
                  style={{ color: "#07284B", fontSize: "18px" }}
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
                  style={{ color: "#07284B", fontSize: "18px" }}
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
                  style={{ color: "#07284B", fontSize: "18px" }}
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
                  style={{ color: "#07284B", fontSize: "18px" }}
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
                  style={{ color: "#07284B", fontSize: "18px" }}
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
                  style={{ color: "#07284B", fontSize: "18px" }}
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
                  style={{ color: "#07284B", fontSize: "18px" }}
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
          </div> */}
        </div>
      </MainLayout>
    </div>
  );
};

export default BlogDetails;
