import React from 'react'

const Layout = ({children}) => {
  return (
    <div>
      <div className="layout-image d-flex justify-content-center align-items-center">

          {children}
      </div>
    
    </div>
  )
}

export default Layout
