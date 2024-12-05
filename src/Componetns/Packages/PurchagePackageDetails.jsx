import React, { useEffect, useState } from 'react'
import MainLayout from '../../MainLayout'
import { IoChevronBackSharp } from 'react-icons/io5'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const PurchagePackageDetails = () => {
        
  const[details,setDetails] = useState([])
  const { id } = useParams();
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjcyYTAwMGU5ZWVhMDZhNzg5OWY0NWQ4IiwiaWF0IjoxNzMxOTMyOTM3LCJleHAiOjE3MzIwMTkzMzd9.EAo0TmsjzVx-XIJr9NX8_OTU9PZPpGCsK5yi6AL7nzs`;
   const navigate = useNavigate()


   const getPackageDetailsById = async ()=>{

      try {
        
          const response = await axios.get(`http://192.168.0.27:5003/package/getDetailById/`,{
            headers:{
              Authorization:`Bearer ${token}`
          },
            params:{
              package_id:id
            }
          })
          if(response.status===200)
          {
            setDetails(response.data.packageDetails)
          }
      } catch (error) 
      {
        
        toast.error(error.response.data.error)
      }
   }

   useEffect(()=>{
    getPackageDetailsById()
   },[])

  return (
    <div>
      <MainLayout>
        
          
          <div className="container mt-5">
      <div className="text-end">
        <Link href="#" className="text-decoration-none fw-bold" style={{color:"#F6790B",fontSize:"18px"}} onClick={()=>navigate('/package')}>
          Back  <span className='text-black'> &gt;</span>
        </Link>
      </div>

      <div className="mt-3">
        <h1 className="fw-bold " style={{color:"#F6790B"}}>
         {details.packageName}
        </h1>
        <div className="d-flex justify-content-between  mt-3">
          <h3 className="text-primary fw-bold me-3">₹ {details.discountedPrice}  &nbsp;
              <del className=" fs-4 text-muted">₹ {details.actualPrice}</del>
          </h3>
        <button className="btn px-4 py-2 fw-bold" style={{backgroundColor:"#F6790B",color:"#fff"}}>
          Add To Cart
        </button>
        </div>
      </div>
      <hr />

      <div className="mt-4">
      <img
              src={
                `http://192.168.0.27:5003/uploads/` + details.mainImage
              }
              className="img-fluid mb-4"
              style={{ maxWidth: "50%" }}
            />
        <p>
          {details.details ?.replace(/<[^>]*>/g, "")
                .replace(/&nbsp;/g, "")}
        </p>
        {/* <p className="text-muted">
          <i>*Bharat SAT Scholarship Examination</i>
        </p>
        <p>
          Pay your fees to register and unlock your potential with Bharat SAT! A
          nationwide examination designed to identify and nurture young talent,
          Bharat SAT offers a unique opportunity for students in classes 5 to
          10 to showcase their abilities and earn scholarships.
        </p>
        <h5>Key features:</h5>
        <ul>
          <li>
            <strong>Comprehensive assessment:</strong> Evaluate your
            understanding of various subjects and identify your strengths and
            weaknesses.
          </li>
          <li>
            <strong>Generous scholarships:</strong> Receive monthly financial
            support to help you achieve your educational goals.
          </li>
          <li>
            <strong>Expert guidance:</strong> Benefit from personalized feedback
            and recommendations to improve your performance.
          </li>
        </ul>
        <p>
          Competitive platform: Compete with students from across India and
          inspire your peers. Join the Bharat SAT movement and discover your
          true potential!
        </p> */}
      </div>

      {/* Add to Cart Button */}
    
    </div>
      </MainLayout>  
      
    </div>
  )
}


export default PurchagePackageDetails
