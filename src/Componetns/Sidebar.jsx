import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineCursorClick } from "react-icons/hi";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FaRocketchat } from "react-icons/fa";
import { LuGitBranchPlus } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import '../Styles/Sidebar.css'
import { IoListOutline } from "react-icons/io5";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';



const Sidebar = () => {
  const [Open, setOpen] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(window.innerWidth > 750);


  return (
    <div>
        <IoListOutline className='navbar-btn' style={{position:"fixed",top:"5px",zIndex:"1",left:"10px",fontSize:"2rem" }} onClick={handleShow}/>
        <Offcanvas.Title className='navbar-logo' style={{position:"fixed",top:"-3px",zIndex:"1",left:"30px",fontSize:"2rem",color:"#07284B" }}>e Candidate</Offcanvas.Title>

      {/* <Offcanvas className="navbar-togglercross"  show={show} > */}
        <Offcanvas.Body className="min-vh-100 navbar-togglercross " show={show} onHide={handleClose} style={{backgroundColor:"#07284B"}}>
          <Offcanvas.Title className='fs-3 mx-5 text-white'>e Candidate</Offcanvas.Title>
        <Offcanvas.Header closeButton className='navbar-opencross'>
        </Offcanvas.Header>
        <ul className="nav mb-auto p-2 flex-column">
                <li className="nav-item">
                  <Link className='text-decoration-none text-white nav-link active'>  
                    <RxDashboard className='fs-2 fa me-2'  />
                     <span className=''>DashBoard</span>
                  </Link>

                </li>
              </ul>
              
              <ul className="nav mb-auto p-2  flex-column">
                <li className="nav-item ">
                  <Link className='text-decoration-none text-white nav-link active'>  
                    <HiOutlineCursorClick className='fs-2 fa me-2'  />
                     <span className=''>Campaigns</span>
                  </Link>

                </li>
              </ul>
              <ul className="nav mb-auto p-2  flex-column">
                <li className="nav-item ">
                  <Link className='text-decoration-none text-white nav-link active'>  
                    <FaHome className='fs-2 me-2 fa'  />
                     <span className=''>Tasks / Calender</span>
                  </Link>

                </li>
              </ul>
              <ul className="nav mb-auto p-2  flex-column">
                <li className="nav-item ">
                  <Link className='text-decoration-none text-white nav-link active'>  
                    <MdOutlineMarkEmailUnread className='fs-2 me-2 fa'  />
                     <span className=''>Email Functionality</span>
                  </Link>

                </li>
              </ul>
              <ul className="nav mb-auto p-2  flex-column">
                <li className="nav-item ">
                  <Link className='text-decoration-none text-white nav-link active'>  
                    <FaHome className='fs-2 me-2 fa'  />

                     <span className=''>Agency Room</span>
                  </Link>

                </li>
              </ul>
              <ul className="nav mb-auto p-2  flex-column">
                <li className="nav-item ">
                  <Link className='text-decoration-none text-white nav-link active'>  
                    <FaRocketchat className='fs-2 me-2 fa'  />
                     <span className=''>Chat</span>
                  </Link>

                </li>
              </ul>
              <ul className="nav mb-auto p-2  flex-column">
                <li className="nav-item ">
                  <Link className='text-decoration-none text-white nav-link active'>  
                    <LuGitBranchPlus className='fs-2 me-2 fa'  />
                     <span className=''>Branches</span>
                  </Link>

                </li>
              </ul>
              <ul className="nav mb-auto p-2  flex-column">
                <li className="nav-item ">
                  <Link className='text-decoration-none text-white nav-link active'>  
                    <FaUsers className='fs-2 me-2 fa'  />
                     <span className=''>User</span>
                  </Link>

                </li>
              </ul>
          
        </Offcanvas.Body>
      {/* </Offcanvas> */}

{/* 
            <ul className="nav mb-auto p-2 flex-column" >
 
                   <IoListOutline className="btn-close fa navbar-opencross text-white fs-3 mb-auto " onClick={()=>setOpen(!Open)} /> 
                  <button type="button" className="btn-close fa navbar-opencross text-white fs-3 mb-auto " onClick={()=>setOpen(!Open)} ></button>

              </ul>
              
        <div className={`sidebar-container ${Open?'open':''} `} >
          <div className="min-vh-100 " style={{backgroundColor:"#07284B"}}>
       
                  <button type="button" className="btn-close  navbar-togglercross fs-3 mt-5 " onClick={()=>setOpen(!Open)} ></button>
                
              <ul className="nav mb-auto p-2 flex-column">
                <li className="nav-item">
                  <Link className='text-decoration-none text-white nav-link active'>  
                    <RxDashboard className='fs-2 fa me-3'  />
                     <span className=''>DashBoard</span>
                  </Link>

                </li>
              </ul>

              <ul className="nav mb-auto p-2  flex-column">
                <li className="nav-item ">
                  <Link className='text-decoration-none text-white nav-link active'>  
                    <HiOutlineCursorClick className='fs-2 fa me-3'  />
                     <span className=''>Campaigns</span>
                  </Link>

                </li>
              </ul>
              <ul className="nav mb-auto p-2  flex-column">
                <li className="nav-item ">
                  <Link className='text-decoration-none text-white nav-link active'>  
                    <FaHome className='fs-2 me-3 fa'  />
                     <span className=''>Tasks / Calender</span>
                  </Link>

                </li>
              </ul>
              <ul className="nav mb-auto p-2  flex-column">
                <li className="nav-item ">
                  <Link className='text-decoration-none text-white nav-link active'>  
                    <MdOutlineMarkEmailUnread className='fs-2 me-3 fa'  />
                     <span className=''>Email Functionality</span>
                  </Link>

                </li>
              </ul>
              <ul className="nav mb-auto p-2  flex-column">
                <li className="nav-item ">
                  <Link className='text-decoration-none text-white nav-link active'>  
                    <FaHome className='fs-2 me-3 fa'  />

                     <span className=''>Agency Room</span>
                  </Link>

                </li>
              </ul>
              <ul className="nav mb-auto p-2  flex-column">
                <li className="nav-item ">
                  <Link className='text-decoration-none text-white nav-link active'>  
                    <FaRocketchat className='fs-2 me-3 fa'  />
                     <span className=''>Chat</span>
                  </Link>

                </li>
              </ul>
              <ul className="nav mb-auto p-2  flex-column">
                <li className="nav-item ">
                  <Link className='text-decoration-none text-white nav-link active'>  
                    <LuGitBranchPlus className='fs-2 me-3 fa'  />
                     <span className=''>Branches</span>
                  </Link>

                </li>
              </ul>
              <ul className="nav mb-auto p-2  flex-column">
                <li className="nav-item ">
                  <Link className='text-decoration-none text-white nav-link active'>  
                    <FaUsers className='fs-2 me-3 fa'  />
                     <span className=''>User</span>
                  </Link>

                </li>
              </ul>
          
          
          </div>
        </div>
         */}
      </div>
      
  )
}

export default Sidebar
