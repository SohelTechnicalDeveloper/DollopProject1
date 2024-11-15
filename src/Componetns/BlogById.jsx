import React, { useEffect, useState } from "react";
import MainLayout from "../MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import userImage from "../images/SM596414 (1).jpg";
import { FaBackward, FaRegUser } from "react-icons/fa";
import { IoChevronBackSharp } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";

const BlogById = () => {
  const [blogDetails, setBlogDetails] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  const allBlogDetailsById = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.22:5003/blog/getBlogDetailsById/`,
        {
          params: {
            blog_id: id,
          },
        }
      );
      if (response.status === 200) {
        setBlogDetails(response.data?.data?.blogCategoryData);
      }
    } catch (error) {
      toast.error(error.response.data?.error);
    }
  };

  useEffect(() => {
    allBlogDetailsById();
  }, []);

  return (
    <div>
      <MainLayout>
        <div className="p-4">
          <div className="" style={{ color: "#07284B", fontSize: "35px" }}>
            <IoChevronBackSharp
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/blogdetails")}
            />
          </div>
          <div className="container mt-4">
            <h2 style={{ color: "#07284B" }}>{blogDetails.title}</h2>
            <div className="d-flex justify-content-start gap-4 text-muted">
              <span style={{ color: "#F6790B" }}> General </span>
              <span>
                <FaRegUser />
                &nbsp; {blogDetails.name}
              </span>{" "}
              |
              <span>
                {" "}
                <CiCalendarDate /> &nbsp;{blogDetails.date?.slice(0, 10)}
              </span>
            </div>
            <p className="mt-3">{blogDetails.briefIntro}</p>

            <div className="text-start my-4">
              <div className="d-flex justify-content-start">
                <img
                  src={
                    `http://192.168.0.22:5003/uploads/` + blogDetails.mainImage
                  }
                  className="img-fluid"
                  style={{ maxWidth: "40%" }}
                />
              </div>
            </div>
            <p>
              {blogDetails.details
                ?.replace(/<[^>]*>/g, "")
                .replace(/&nbsp;/g, "")}
            </p>
            <h4>AI Education</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            <img
              src={
                `http://192.168.0.22:5003/uploads/` + blogDetails.featuredImage
              }
              className="img-fluid mb-3"
              style={{ maxWidth: "30%" }}
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Quas saepe alias, dicta atque rem totam molestiae aut
              maxime, quae autem quod, consectetur reiciendis! Aliquid iste,
              repellendus ipsam quas qui temporibus..
            </p>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default BlogById;
