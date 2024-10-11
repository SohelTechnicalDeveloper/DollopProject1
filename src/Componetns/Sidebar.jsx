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
import { RxCross1 } from "react-icons/rx";




const Sidebar = () => {
  const [Open, setOpen] = useState(false);


  return (
    <div>
        

              
   <IoListOutline className="navbar-opencross"  style={{position:"fixed",top:"2px",zIndex:"-1",left:"30px",fontSize:"2rem",color:"#07284B" }} onClick={()=>setOpen(!Open)} /> 
        <div className={`navbar-togglercross ${Open?'open':''} `} >
          <div className="min-vh-100" style={{backgroundColor:"#07284B"}}>
          <Offcanvas.Title className='fs-3 mx-5 p-4 text-white'>e Candidate</Offcanvas.Title>

          <RxCross1 className="btn-sidebar" onClick={()=>setOpen(!Open)} />

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
                  <Link className='text-decoration-none text-white nav-link active' to='/agencyRoom'>  
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
                  <Link className='text-decoration-none text-white nav-link active' to='/userdata'>  
                    <FaUsers className='fs-2 me-3 fa'  />
                     <span className=''>User</span>
                  </Link>

                </li>
              </ul>
          
          
          </div>
        </div>
        
      </div>
      
  )
}

export default Sidebar