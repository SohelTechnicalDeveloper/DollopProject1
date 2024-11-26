import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../MainLayout";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";




const Blog = () => {
  const [editorData, setEditiorData] = useState("");
  const [allAuthor, setAllAuthor] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [authorId, setAuthorId] = useState(null);
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [briefIntro, setBriefIntro] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [mainImage, SetMainImage] = useState("");
  const [error, setError] = useState(true);
  
  const inputFeatureImageRef = useRef(null)
  const inputMainImageRef = useRef(null)

  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY3MjA5NDQ0OWVlYTA2YTc4OTlmMDU1NSIsImVtYWlsIjoiZG9sbG9wLnlhc2hAZ21haWwuY29tIiwiaWF0IjoxNzMyMDkzNTIyLCJleHAiOjE3MzIxNzk5MjJ9.R46sOwJMWhpuu7YjT0GwbfF6bVgCnbV_NiMH_UYBrX4`;

  const getAllCateory = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.27:5003/blogCategory/get-all-blog-category`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setAllCategory(response.data.data);
      }
    } catch (error) {}
  };
  const getAllAuthor = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.27:5003/author/get-all-author`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setAllAuthor(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setData = async () => {
    setError(false);
    let errorMessage = "";

    if (!categoryId) 
    {
      errorMessage = "Category ID is required";
    } else if (!authorId) {
      errorMessage = "Author ID is required";
    } else if (!date) {
      errorMessage = "Date is required";
    } else if (!title) {
      errorMessage = "Title is required";
    } else if (!featuredImage) {
      errorMessage = "Featured Image is required";
    } else if (!mainImage) {
      errorMessage = "Main Image is required";
    } else if (!briefIntro) {
      errorMessage = "Brief Intro is required";
    } else if (!editorData) {
      errorMessage = "Editor Data is required";
    }

    if (errorMessage) 
     {
      toast.error(errorMessage);
      return;
    } else {
      const formData = new FormData();
      formData.append("blog_id", "");
      formData.append("category_id", categoryId);
      formData.append("author_id", authorId);
      formData.append("featuredImage", featuredImage);
      formData.append("mainImage", mainImage);
      formData.append("briefIntro", briefIntro);
      formData.append("date", date);
      formData.append("title", title);
      formData.append("details", editorData);
      try {
        const response = await axios.post(
          `http://192.168.0.27:5003/blog/add-blog`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("Data Add Success");
          setAuthorId(" ");
          setCategoryId(" ");
          setTitle(" ");
          setDate(" ");
          setBriefIntro(" ");
          setEditiorData("  ");
          setFeaturedImage(" ");
          SetMainImage(" ");
          inputFeatureImageRef.current.value = '';
          inputMainImageRef.current.value = '';

        }
      } catch (error) {
        toast.error(error.response);
      }
    }
    };

  useEffect(() => {
    getAllAuthor();
    getAllCateory();
  },);

  function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return {
        upload: () => {
          return loader.file.then((file) => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                const base64String = reader.result;
                const imageElement = `<img src="${base64String}" alt="Uploaded Image" />`;

                setEditiorData((prevDetails) => prevDetails + imageElement);

                resolve({
                  default: base64String,
                });
              };
              reader.onerror = (error) => reject(error);
              reader.readAsDataURL(file);
            });
          });
        },
        abort: () => {},
      };
    };
  }
  const handleEditorData = (event, editor) => {
    setEditiorData(editor.getData());
  };
  return (
    <div className="bg-body-secondary">
      <MainLayout>
        <div className="d-flex justify-content-between p-3">
          <div className="fw-bold">BLOG PAGE</div>
          <div className="">
            <span className="fw-bold">Dashborad</span> - <Link className="text-decoration-none">Blog Page</Link>
          </div>
        </div>

        <div className="p-4 rounded-1 m-4 " style={{ backgroundColor: "#fff" }}>
          <div className="fw-bold fs-3">Blog</div>
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="m-1">
                <label className="form-label text-black fw-bold">
                  Select Category <span className="text-danger">*</span>
                </label>
                <select
                  value={categoryId}
                  className="form-select"
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select</option>

                  {allCategory.map((item, index) => {
                    return (
                      <option key={index} value={item._id}>
                        {item.categoryName}
                      </option>
                    );
                  })}
                </select>
                {!error
                  ? !categoryId && (
                      <label
                        htmlFor=""
                        className=" position-absolute  mb-1 text-danger fw-bolder"
                      >
                        Fields Can't Select
                      </label>
                    )
                  : ""}
              </div>
            </div>
            <div className="col-md-6">
              <div className="m-1">
                <label className="form-label text-black fw-bold">
                  Author Name <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  value={authorId}
                  onChange={(e) => setAuthorId(e.target.value)}
                >
                  <option value="">Select</option>
                  {allAuthor.map((item, index) => {
                    return (
                      <option key={index} value={item._id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                {!error
                  ? !authorId && (
                      <label htmlFor="" className="text-danger fw-bolder">
                        Fields Can't Select
                      </label>
                    )
                  : ""}
              </div>
             
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="m-1">
                <label className="form-label text-black fw-bold">
                  Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                {!error
                  ? !date && (
                      <label htmlFor="" className="text-danger fw-bolder">
                        Fields Can't Empty
                      </label>
                    )
                  : ""}
              </div>
            </div>
            <div className="col-md-6">
              <div className="m-1">
                <label className="form-label text-black fw-bold">
                  Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  className="form-control"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                {!error
                  ? !title && (
                      <label htmlFor="" className="text-danger fw-bolder">
                        Fields Can't Empty
                      </label>
                    )
                  : ""}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="m-1">
                <label className="form-label text-black fw-bold">
                  Featured Image{" "}
                  <span className="text-danger">
                    *(Extenstion:jpg.jpeg.webp)
                  </span>
                </label>
                <input
                  type="file"
                  ref={inputFeatureImageRef}
                  onChange={(e) => setFeaturedImage(e.target.files[0])}
                  className="form-control"
                  accept="image/jpeg, image/jpg, image/webp"
                />
                {!error
                  ? !featuredImage && (
                      <label htmlFor="" className="text-danger fw-bolder">
                        Fields Can't Select
                      </label>
                    )
                  : ""}
              </div>
            </div>
            <div className="col-md-6">
              <div className="m-1">
                <label className="form-label text-black fw-bold">
                  Main Image{" "}
                  <span className="text-danger">
                    *(Extenstion:jpg.jpeg.webp)
                  </span>
                </label>
                <input
                  type="file"
                  ref={inputMainImageRef}
                  onChange={(e) => SetMainImage(e.target.files[0])}
                  className="form-control"
                  accept="image/jpeg, image/jpg, image/webp"

                />
                {!error
                  ? !mainImage && (
                      <label htmlFor="" className="text-danger fw-bolder">
                        Fields Can't Select
                      </label>
                    )
                  : ""}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <label className="form-label text-black fw-bold">
                Intro <span className="text-danger">*</span>
              </label>
              <textarea
                value={briefIntro}
                className="reply-textarea textarea"
                style={{ height: "25vh" }}
                placeholder="File Name"
                onChange={(e) => setBriefIntro(e.target.value)}
              ></textarea>
              {!error
                ? !briefIntro && (
                    <label htmlFor="" className="text-danger fw-bolder">
                      Fields Can't Empty
                    </label>
                  )
                : ""}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <label className="form-label text-black fw-bold">
                Details <span className="text-danger">*</span>
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={editorData}
                value={editorData}
                config={{
                  extraPlugins: [CustomUploadAdapterPlugin], // Register the plugin
                }}
                onChange={handleEditorData}
                
              />
              {!error
                ? !editorData && (
                    <label htmlFor="" className="text-danger fw-bolder">
                      Fields Can't Empty
                    </label>
                  )
                : ""}
            </div>
          </div>
          <ToastContainer />
          <div className="m-3 d-flex justify-content-end">
            <button className="btn d-flex p-0" onClick={() => setData()}>
              <span
                className="btn btn-primary d-flex align-items-center"
                style={{ backgroundColor: "#153D8F" }}
              >
                Submit
              </span>
              {/* <span
                className="btn btn-primary px-3 py-2 d-flex align-items-center"
                style={{ backgroundColor: "#1A73E8" }}
              >
                <FaCheck />
              </span> */}
            </button>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default Blog;
