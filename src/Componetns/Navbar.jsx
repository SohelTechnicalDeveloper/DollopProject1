import React, { useState } from 'react'
import logo from '../images/team.jpg'
import { IoIosArrowDown } from "react-icons/io";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import '../Styles/Navbar.css'
import { IoMdLogOut } from "react-icons/io";
import { RxCross1 } from 'react-icons/rx';




const Navbar = () => {
     const navigate = useNavigate()

      const auth = JSON.parse(localStorage.getItem('user'))
      
    const logout = () =>{
           localStorage.removeItem('user')
           navigate('/')
  
      
         
    }
      
  return (
    
      <div className="navbar-container   bg-white p-2 ">
      <nav className="d-flex align-items-center justify-content-end  gap-4 mx-5 ">
       
          <img src={logo} width="30" height="30" alt=""/> 
            <span  className='fw-bold' style={{fontSize:"1rem"}}>{auth?auth.result.name:" "}</span>
           <FaRegUser className='user-profile fs-4'   />
           <IoIosArrowDown  className='dropdown-toggle   arrow-profile' data-bs-toggle="dropdown" />

       <Link className="nav-link drop-down " href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" >
             <IoMdLogOut className='user-logout  fs-4 nav-link ' />
       </Link>
   
    <div className="dropdown-menu drop-down logout-btn mt-4 rounded-0" >
           <div className="modal-dialog">
              <div className="modal-content">
                 <div className="modal-header">
        <h5 className="modal-title" id="logoutModalLabel">Logout Confirmation</h5>
        <RxCross1 className="navbar-dropbtn mb-3"/>
      </div>
        <div className="modal-body">
           <p>Are you sure you want to logout?</p>
        </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={()=>logout()}>Yes</button> &nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" className="btn btn-danger" >No</button>
      </div>
    </div>
  </div>
</div>


           
  </nav>
    </div>
  )
}

export default Navbar
