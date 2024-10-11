import React, { useEffect } from 'react'
import Sidebar from './Componetns/Sidebar'
import Navbar from './Componetns/Navbar'
import '../src/Styles/MainLayout.css'
import { useNavigate } from 'react-router-dom'
const MainLayout = ({children}) => {
  const navigate = useNavigate()
  useEffect(()=>{
    const auth = JSON.parse(localStorage.getItem('user'))
    if(!auth)
    {
      navigate('/')
    }
 },[])
 
  return (
    <div>
        <div className="d-flex">
           <div className='mainlayout-sidebar'>
              <Sidebar/>  
           </div>

        <div className="contain" >
            <Navbar />
            <div className="mainlayout-children">
                 {children}  
            </div>

      </div>
        </div>
      
    </div>
  )
}

export default MainLayout
