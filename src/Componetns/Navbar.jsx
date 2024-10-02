import React, { useState } from 'react'
import logo from '../images/team.jpg'
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import '../Styles/Navbar.css'
import { IoMdLogOut } from "react-icons/io";
import Button from 'react-bootstrap/Button';



const Navbar = () => {
  return (
    
      <div className="navbar-container   bg-body-secondary p-2 ">
             {/* <h2 className="text-white " style={{fontSize:"1.25rem"}}>e Candidate</h2> */}
      <nav className="d-flex align-items-center justify-content-end  gap-4 mx-5 ">
       
              <img src={logo} width="30" height="30" alt=""/> 
          <span  className='fw-bold' style={{fontSize:"1rem"}}>Sohel Khan</span>
           <FaRegUser className=' user-profile fs-4'   />
           <IoIosArrowDown  className='dropdown-toggle   arrow-profile' data-bs-toggle="dropdown" />

  <Link className="nav-link drop-down " href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           <IoMdLogOut className='user-logout  fs-4 nav-link ' />
  </Link>
  <ul className="dropdown-menu drop-down" aria-labelledby="navbarDropdown">
    <li><a className="dropdown-item" href="#">Service 1</a></li>
    <li><a className="dropdown-item" href="#">Service 2</a></li>
    <li><a className="dropdown-item" href="#">Service 3</a></li>
  </ul>
{/* 
           <ul className="dropdown-menu dropend mt-3 " aria-labelledby="navbarDropdownMenuLink">
           <li><Link className="dropdown-item" href="#">Profile</Link></li>
          <li><Link className="dropdown-item" href="#">Settings</Link></li>
          <li><Link className="dropdown-item" href="#">Logout</Link></li>
      </ul> */}
        
  </nav>
    </div>
  )
}

export default Navbar
