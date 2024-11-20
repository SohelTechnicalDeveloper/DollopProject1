import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../MainLayout";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import userImage from "../images/SM596414 (1).jpg";
import { FaBackward, FaRegUser } from "react-icons/fa";
import { IoChevronBackSharp } from "react-icons/io5";
import { CiCalendar, CiCalendarDate, CiUser } from "react-icons/ci";
import { MdArrowForwardIos } from "react-icons/md";
import parse from "html-react-parser";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../Styles/BlogById.css";
import moment from "moment-timezone";

const BlogById = () => {
  const [blogDetails, setBlogDetails] = useState([]);
  const [relateBlogs, setRelatedBlogs] = useState([]);
  const location = useLocation(); // Get passed state data
  const { allBlog } = location.state || {}; // Destructure blog data
  const scrollRef = useRef(null); // Create a reference to the element you want to scroll to

const string = 'sohelkhan'
  const { id } = useParams();

  const navigate = useNavigate();

  const allBlogDetailsById = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.27:5003/blog/getBlogDetailsById/`,
        {
          params: {
            blog_id: id,
          },
        }
      );
      if (response.status === 200) {
        setBlogDetails(response.data?.data?.blogCategoryData);
        setRelatedBlogs(response.data?.data?.relatedBlogs);
      }
    } catch (error) {
      toast.error(error.response.data?.error);
    }
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  useEffect(() => {
    allBlogDetailsById();
    if (scrollRef.current) {
      // Scroll the element into view
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // window.scrollTo(0, 0);
  }, [id]);

  const options = {
    replace: (domNode) => {
      // Handle <img> tags
      if (domNode.name === "img") {
        const { src } = domNode.attribs;
        return (
          <img
            src={src}
            width={500}
            height={400}
            className="img-fluid"
            alt="Content Image"
          />
        );
      }
      // Handle <oembed> for videos
      if (domNode.name === "oembed") {
        const videoUrl = domNode.attribs.url;
        const embedUrl = videoUrl.replace("youtu.be/", "youtube.com/embed/");
        return (
          <iframe
            className="emded"
            src={embedUrl}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        );
      }
    },
  };

  return (
    <div>
      <MainLayout>
        <div className="p-3" ref={scrollRef}>
          <div className="" style={{ color: "#07284B", fontSize: "35px" }}>
            <IoChevronBackSharp
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/blogdetails")}
            />
          </div>
          <div className="container mt-4 mx-0 mb-3">
            <h2 style={{ color: "#07284B" }}>{blogDetails.title}</h2>
            <div className="d-flex justify-content-start gap-4 text-muted">
              <span style={{ color: "#F6790B" }}> {allBlog} </span>
              <span>
                <FaRegUser />
                &nbsp; {blogDetails.name}
              </span>{" "}
              |
              <span>
                {" "}
                <CiCalendarDate /> &nbsp;{" "}
                {moment(blogDetails.date).format("YYYY-MM-DD")}
              </span>
            </div>
            <p className="mt-3">{blogDetails.briefIntro}</p>

            <div className="text-start my-4">
              <div className="d-flex justify-content-start">
                <img
                  src={
                    `http://192.168.0.27:5003/uploads/` + blogDetails.mainImage
                  }
                  className="img-fluid"
                  height={200}
                  style={{ maxWidth: "40%" }}
                />
              </div>
            </div>
            <p>
              {blogDetails.length !== 0
                ? parse(blogDetails.details, options)
                : ""}
            </p>

            <img
              src={
                `http://192.168.0.27:5003/uploads/` + blogDetails.featuredImage
              }
              className="img-fluid mb-3"
              style={{ maxWidth: "30%" }}
            />
          </div>

          {/* carousel for related blogs item */}
        </div>

        <div className="bg-body-secondary p-2 ">
          <h2
            className="text-start mb-4 mt-2 mx-3"
            style={{ color: "#07284B" }}
          >
            Related Blogs
          </h2>
          <Carousel
            showDots={true}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            customTransition="all 1.2s ease"
            transitionDuration={500}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
          >
            {relateBlogs.map((item) => (
              <div key={item._id} className="p-2 mb-4 rounded-5">
                <div className="card border-0 mx-4 rounded-5 ">
                  <img
                    src={`http://192.168.0.27:5003/uploads/${item.mainImage}`}
                    className="card-img-top card-style rounded-5 mb-0"
                    height={250}
                    width={300}
                    alt="Blog Image"
                  />
                  <div className="card-body rounded-bottom-5 rounded-top-2 ">
                    <div className="d-flex justify-content-between text-muted small">
                      <p>
                        <FaRegUser /> &nbsp; {item.name}
                      </p>
                      <p>
                        <CiCalendarDate />{" "}
                        {moment(item.date).format("YYYY-MM-DD")}
                      </p>
                    </div>
                    <h6
                      className="card-title truncate fw-bold mb-2"
                      title={item.title}
                      style={{ color: "#07284B", fontSize: "18px" }}
                    >
                      {item.title}
                    </h6>
                    <p
                      className="truncate text-black small"
                      title={item.briefIntro}
                    >
                      {item.briefIntro}
                    </p>
                    <p className="card-text text-end">
                      <Link
                        to={`/BlogDetailsById/${item.blog_id}`}
                        className="text-decoration-none text-black fw-bold"
                      >
                        Read More <MdArrowForwardIos className="fw-bold" />
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </MainLayout>
    </div>
  );
};

export default BlogById;
