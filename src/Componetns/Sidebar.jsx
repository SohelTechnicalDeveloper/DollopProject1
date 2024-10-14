import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineCursorClick } from "react-icons/hi";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FaRocketchat } from "react-icons/fa";
import { LuGitBranchPlus } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import "../Styles/Sidebar.css";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineViewList } from "react-icons/hi";

const Sidebar = () => {
  const [Open, setOpen] = useState(false);

  return (
   
    // <div className="mainlayout-sidebar">
    //   <IoListOutline
    //     className="navbar-opencross"
    //     style={{
    //       position: "fixed",
    //       top: "2px",
    //       zIndex: "100",
    //       left: "30px",
    //       fontSize: "2rem",
    //       color: "#fff",
    //     }}
    //     onClick={() => setOpen(!Open)}
    //   />
    //   <div className={`navbar-togglercross ${Open ? "open" : ""} `}>
    //     <div className="fs-3 mx-5 mt-3 p-4 text-white text-truncate">

    //     {/* <span className="fs-3 mx-5 mt-3 p-4 text-white"> */}
    //       e Candidate
    //     {/* </span> */}
    //     </div>

    //     <RxCross1 className="btn-side" onClick={() => setOpen(!Open)} />

    //     <ul className="nav mb-auto p-2 flex-column">
    //       <li className="nav-item">
    //         <Link className="text-decoration-none text-white nav-link active">
    //           <RxDashboard className="fs-2 fa me-3" />
    //           <span className="">DashBoard</span>
    //         </Link>
    //       </li>
    //     </ul>

    //     <ul className="nav mb-auto p-2  flex-column">
    //       <li className="nav-item ">
    //         <Link className="text-decoration-none text-white nav-link active">
    //           <HiOutlineCursorClick className="fs-2 fa me-3" />
    //           <span className="">Campaigns</span>
    //         </Link>
    //       </li>
    //     </ul>
    //     <ul className="nav mb-auto p-2  flex-column">
    //       <li className="nav-item ">
    //         <Link className="text-decoration-none text-white nav-link active">
    //           <FaHome className="fs-2 me-3 fa" />
    //           <span className="">Tasks / Calender</span>
    //         </Link>
    //       </li>
    //     </ul>
    //     <ul className="nav mb-auto p-2  flex-column">
    //       <li className="nav-item ">
    //         <Link
    //           className="text-decoration-none text-white nav-link active"
    //           to="/email"
    //         >
    //           <MdOutlineMarkEmailUnread className="fs-2 me-3 fa" />
    //           <span className="">Email Functionality</span>
    //         </Link>
    //       </li>
    //     </ul>
    //     <ul className="nav mb-auto p-2  flex-column">
    //       <li className="nav-item ">
    //         <Link
    //           className="text-decoration-none text-white nav-link active"
    //           to="/agencyRoom"
    //         >
    //           <FaHome className="fs-2 me-3 fa" />

    //           <span className="">Users Room</span>
    //         </Link>
    //       </li>
    //     </ul>
    //     <ul className="nav mb-auto p-2  flex-column">
    //       <li className="nav-item ">
    //         <Link className="text-decoration-none text-white nav-link active">
    //           <FaRocketchat className="fs-2 me-3 fa" />
    //           <span className="">Chat</span>
    //         </Link>
    //       </li>
    //     </ul>
    //     <ul className="nav mb-auto p-2  flex-column">
    //       <li className="nav-item ">
    //         <Link className="text-decoration-none text-white nav-link active">
    //           <LuGitBranchPlus className="fs-2 me-3 fa" />
    //           <span className="">Branches</span>
    //         </Link>
    //       </li>
    //     </ul>
    //     <ul className="nav mb-auto p-2  flex-column">
    //       <li className="nav-item ">
    //         <Link
    //           className="text-decoration-none text-white nav-link active"
    //           to="/userdata"
    //         >
    //           <FaUsers className="fs-2 me-3 fa" />
    //           <span className="">User</span>
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
    <div className="mainlayout-sidebar">
  <HiOutlineViewList
    className="navbar-opencross"
    style={{
      position: "fixed",
      top: "2px",
      zIndex: "100",
      left: "30px",
      fontSize: "2rem",
      color: "#fff",
    }}
    onClick={() => setOpen(!Open)}
  />
  <div className={`navbar-togglercross ${Open ? "open" : ""}`}>
    <div className="fs-3 mx-5 mt-3 p-4 text-white text-truncate">
      e Candidate
    </div>

<div className="btn-side px-3">
    <RxCross1 className="" onClick={() => setOpen(!Open)} />

</div>

    <ul className="nav mb-auto p-2 flex-column">
      <li className="nav-item">
        <Link className="text-decoration-none text-white nav-link active">
          <RxDashboard className="fs-2 fa me-3" />
          <span>DashBoard</span>
        </Link>
      </li>
    </ul>

    <ul className="nav mb-auto p-2 flex-column">
      <li className="nav-item">
        <Link className="text-decoration-none text-white nav-link active" to='/campaigns'>
          <HiOutlineCursorClick className="fs-2 fa me-3" />
          <span>Campaigns</span>
        </Link>
      </li>
    </ul>

    <ul className="nav mb-auto p-2 flex-column">
      <li className="nav-item">
        <Link className="text-decoration-none text-white nav-link active">
          <FaHome className="fs-2 me-3 fa" />
          <span>Tasks / Calender</span>
        </Link>
      </li>
    </ul>

    <ul className="nav mb-auto p-2 flex-column">
      <li className="nav-item">
        <Link className="text-decoration-none text-white nav-link active" to="/email">
          <MdOutlineMarkEmailUnread className="fs-2 me-3 fa" />
          <span>Email Functionality</span>
        </Link>
      </li>
    </ul>

    <ul className="nav mb-auto p-2 flex-column">
      <li className="nav-item">
        <Link className="text-decoration-none text-white nav-link active" to="/agencyRoom">
          <FaHome className="fs-2 me-3 fa" />
          <span>Users Room</span>
        </Link>
      </li>
    </ul>

    <ul className="nav mb-auto p-2 flex-column">
      <li className="nav-item">
        <Link className="text-decoration-none text-white nav-link active">
          <FaRocketchat className="fs-2 me-3 fa" />
          <span>Chat</span>
        </Link>
      </li>
    </ul>

    <ul className="nav mb-auto p-2 flex-column">
      <li className="nav-item">
        <Link className="text-decoration-none text-white nav-link active">
          <LuGitBranchPlus className="fs-2 me-3 fa" />
          <span>Branches</span>
        </Link>
      </li>
    </ul>

    <ul className="nav mb-auto p-2 flex-column">
      <li className="nav-item">
        <Link className="text-decoration-none text-white nav-link active" to="/userdata">
          <FaUsers className="fs-2 me-3 fa" />
          <span>User</span>
        </Link>
      </li>
    </ul>
  </div>
</div>

  );
};

export default Sidebar;
