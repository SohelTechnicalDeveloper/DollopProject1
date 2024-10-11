import React, { useEffect, useState } from 'react'
import MainLayout from '../MainLayout'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { RxCross1 } from 'react-icons/rx';
import { FaEye } from "react-icons/fa";
import '../Styles/Agency.css'
import {  toast, ToastContainer } from 'react-toastify';
import Pdf from '../Resume/SohelFinalResume.59787e8e065e9c9dfc2c.pdf'

const AgencyRoom = () => {
  const[userData,setUserData]= useState([])
  const[btnshow,setBtnShow] = useState(false)
  const [error,setError]=useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const[inputSearch,setInputSearch] = useState('')
  const[userId,setUserId] = useState(null)
  const [status, setStatus] = useState(-1);

  
  
  const handleShow = (id) => 
    {
      setUserId(id)
      console.log(id);
      setBtnShow(true);
      getUserById(id)
      
    }
  const handleClose = () => setBtnShow(false);

  const auth = JSON.parse(localStorage.getItem('user'))

  const getUser = async ()=>{
    try {
        
          const response = await axios.get(`http://localhost:8000/user/getUser`,{
            headers:{
              Authorization:`bearer ${auth.token}`
            }
          })
          
           if(response.status===200)
           {
              setUserData(response.data.data)

           }
           
    } catch (error) {
        
    }
  }
const getUserById = async (id)=>{
          
          try {
               const response = await axios.get(`http://localhost:8000/user/getUserById/${id}`)
               if(response.status===200)
               {
                 setName(response.data.data.name)
                 setEmail(response.data.data.email)
                 setAddress(response.data.data.address)
                 setPhone(response.data.data.phone)       
                   
               }
          } catch (error) {
            
          }
}
  useEffect(()=>{
        getUser()
  },[status])

  const deleteUser = async (id)=>{

           try {
            
              const response = await axios.delete(`http://localhost:8000/user/deleteUser/${id}`)

               if(response.status===200)
               {
                  toast.success("Deleted")
               }
             
           } catch (error) {
                   toast.error(error)
           }
        finally{
           getUser()
        }
  }

   const updateData = async ()=>{

       try {
              setError(!error)
        if(name !== "" && email !== "" && address !== "" && phone !== "" )  
          {
            const response = await axios.patch(`http://localhost:8000/user/updateUserById/${userId}`,{
                 name,
                 email,
                 address,
                 phone
             })
          if(response.status===200)
          {
            handleClose()
             toast.success('User Update Successfully')
             getUser()

          }
        }            

       } 
       catch (error) {
        
          toast.error('User not updated')
       }
   }
 

const searchUser = async (e)=>{
  try {
      const key = e.target.value
        if(key)
        {
          const response = await axios.get(`http://localhost:8000/user/findUserbyName/${key}`)
           if(response.status===200)
           {
              setUserData(response.data.data)
           }

        }
        else{
            getUser()
        }
        
    } catch (error) {
      
    }
}

function OnResumeClick() {
  
  window.open(Pdf);
}

const updateStatusByAdmin = async (id,status) =>{
  setStatus(!status)
     try {
       
          const response = await axios.patch(`http://localhost:8000/user/updateUserStatus/${id}`,{
            status:!status
          })
          if(response.status===200)
          {
             toast.success('User Status Update Success')
          }
           
     } catch (error) {
      
     }
}
  return (
    <div>
      
      <MainLayout >

      <div className="container ">
      { btnshow && (
         <div className="modal show  " style={{ display: "block" }} id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel">
          <div className="modal-dialog modal-lg modal-dialog-centered" >
            <div className="modal-content">
              <div className="modal-header">
               <Link className='text-decoration-none' style={{color:"#07284B",borderBottom:"3px solid #07284B" }}> <h5 className="modal-title">Add Agency</h5></Link>
               <hr />

               <RxCross1 style={{color:"black",fontSize:"25px"}} onClick={handleClose} />
              </div>
              <div className="modal-body">
                <form>
                  {/* Agency Name */}
                  <div className="form-group mb-4 d-flex">
                    <label className='w-25 label-name'> Name</label>
                    <div className=" w-50">
                    <input type="text" value={name} className=" form-control input-color" placeholder="Name" onChange={(e)=>setName(e.target.value)} />
                    { error && !name ? <label className="form-label text-danger fw-bolder" style={{position:'absolute'}} > Field can't be empty! </label> :"" }         
                    </  div>

                  </div>

                  {/* Email */}
                  <div className="form-group d-flex mb-4">
                    <label className=' w-25 label-name'>Email</label>
                    <div className="validation w-50">
                    <input type="email" value={email} className="form-control input-color"  placeholder="E-mail" onChange={(e)=>setEmail(e.target.value)} />
                      { error && !email ? <label className="form-label text-danger fw-bolder " style={{position:'absolute'}} > Field can't be empty! </label> :"" }         
                  </div>
                  </  div>


                  {/* Contact Number */}
                  <div className="form-group d-flex mb-4 d-flex">
                    <label className=' w-25 label-name'>Contact No.</label>
                    <div className="validation w-50">
                    <input type="tel" value={phone} className="form-control input-color" placeholder="Contact no." onChange={(e)=>setPhone(e.target.value)} />
                    { error && !phone ? <label className="form-label text-danger fw-bolder " style={{position:'absolute'}} > Field can't be empty! </label> :"" }         
                    </  div>
                  </div>

                  {/* Address */}
                  <div className="form-group d-flex mb-4">
                    <label className=' w-25 label-name'>Address</label>
                    <div className="validation w-50">
                      <input type="text" value={address} className="form-control input-color"  placeholder="Address" onChange={(e)=>setAddress(e.target.value)} />
                      { error && !address ? <label className="form-label text-danger fw-bolder " style={{position:'absolute'}} > Field can't be empty! </label> :"" }         
                    </  div>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-light" onClick={handleClose}  > Cancel </button>
                <button type="submit" className="btn " style={{backgroundColor:"#21b7b5"}} onClick={updateData}> Done  </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <div className="modal-backdrop fade show" style={{ position: "fixed" }} ></div> */}
    </div>
         
              <h2 style={{color:"#07284B",marginLeft:"25px"}}>Users</h2>
                
            <div className="form-group d-flex justify-content-end mx-5 mt-4" style={{fontFamily:"Gill Sans, sans-serif"}}>
                    <div className="mx-4">
                         <input type="text" className="form-control input-color"   placeholder="Search" onChange={(e)=>searchUser(e)} />
                    </div>
                     <button className="btn" style={{backgroundColor:"#21b7b5",color:"#fff",fontSize:"18px"}}> <span className='fs-5'>+</span>Add Users</button>
              </div>

      <div className="container mt-5" >

      <table className="table  table-bordered p-3">
        <thead className="table-success" >
          <tr>
            <th scope="col">User Name</th>
            <th scope="col">Email Address</th>
            <th scope="col">Contact No.</th>
            <th scope="col">Address</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className='mx-3'>
        { userData.map((info,index)=>{
         return <>
         <tr>
            {/* <th scope='row'>{index+1}</th> */}
                 <td className='fw-bold'>{info.name}</td>
                 <td>{info.email}</td>
                 <td>{info.phone}</td>
                 <td>{info.address}</td>
                 <td>
                  <div className=" form-switch  d-flex justify-content-center align-content-center align-items-center">
                    <input className="form-check-input " type="checkbox" onClick={()=>{updateStatusByAdmin(info._id,info.status)}}    checked={info.status} />
                    {/* {isChecked ? "Checked" : "Unchecked"} */}
                  </div>
               </td>
            <td >
              <div className="action-btn fs-3">
                <FaEye  style={{backgroundColor:"#A7B2C3",color:"#000",borderRadius:"3px",padding:"3px", cursor:"pointer"}} onClick={()=>OnResumeClick()} /> &nbsp;
                <BiEditAlt  style={{backgroundColor:"#d3eae9",color:"#24A1A7",borderRadius:"3px",padding:"3px",cursor:"pointer"}} onClick={()=>handleShow(info._id)} /> &nbsp;
                <MdDeleteOutline  style={{backgroundColor:"#efd7da",color:"#e82e44",borderRadius:"3px",padding:"3px",cursor:"pointer"}} onClick={()=>deleteUser(info._id)} />
              </div>
            </td>
          </tr> </>
        })}
        </tbody>
      </table>
    </div>
        <ToastContainer/>

      </MainLayout>
    </div>
  )
}

export default AgencyRoom
