import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MainLayout from '../MainLayout'
import userImage from '../images/SM596414 (1).jpg'
import '../Styles/Userdata.css'

const Userdata = () => {
  const[data,setData] = useState([])
  
  const getUser = async ()=>{
    try {
        
          const response = await axios.get(`http://localhost:8000/user/getUser`)
           console.log(response.data.data);
           if(response.status===200)
           {
              setData(response.data.data)

           }
           
    } catch (error) {
        
    }
  }
  useEffect(()=>{
    getUser()
  },[])

  return (
    <div >
        <MainLayout>

      <div className="row mt-5 mx-3" >
         {
            data.map((item)=>{
                return <div className="col-md-4 p-2">
                  <div className="card d-flex justify-content-center align-items-center " >
                       <img className="card-img-top p-3 "  alt='userImage' src={userImage} />
                     <div className="card-body  justify-content-center align-items-center align-content-center">
                          <h5 class="card-title mx-5">{item.name}</h5>
                         <p class="card-text">Mern Stack Development</p>

                     </div>
                </div>
        </div>
            })

            
        }
       
      </div>
      </MainLayout>

    </div>
  )
}

export default Userdata
