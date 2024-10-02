import React from 'react'
import Sidebar from './Componetns/Sidebar'
import Navbar from './Componetns/Navbar'
import '../src/Styles/MainLayout.css'
const MainLayout = ({children}) => {
  return (
    <div>
            <Navbar />
        <div className="d-flex">
           <div className='mainlayout-sidebar'>
              <Sidebar/>  
           </div>

        <div className="contain" >
          {children}  

      </div>
        </div>
      
    </div>
  )
}

export default MainLayout
