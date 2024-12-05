import React from "react";
import MainLayout from "../../MainLayout";
import '../../Styles/Dashboard.css'
const Dashboard = () => {
  return (
    <div>
      <MainLayout>
      <div
          id="carouselExampleDark"
          className="carousel carousel-dark slide"
          data-bs-ride="carousel"
        >
          {/* <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={0}
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={1}
              aria-label="Slide 2"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={2}
              aria-label="Slide 3"
            />
          </div> */}
           <div className="carousel-inner h-50">
          <div className="carousel-item active" data-bs-interval={15000}>
            <img height={500}  src="https://s3.ap-south-1.amazonaws.com/awsimages.imagesbazaar.com/1200x1800-new/11164/SM351615.jpg" className="carousel-image d-block w-100" alt="..." />
          </div>
          <div className="carousel-item" data-bs-interval={15000}>
            <img height={500} src="https://s3.ap-south-1.amazonaws.com/awsimages.imagesbazaar.com/900x600/2595/20-SM98724.jpg" className="carousel-image d-block w-100" alt="..." />
          </div>
          <div className="carousel-item" data-bs-interval={15000}> 
            <img height={500} src="https://s3.ap-south-1.amazonaws.com/awsimages.imagesbazaar.com/900x600/5940/20-SM150261.jpg" className="carousel-image d-block w-100" alt="..." />
          </div>
        </div>
        
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" style={{color:"#000",fontSize:"18rem"}} aria-hidden="true" />
            <span className="visually-hidden" >Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>

      </MainLayout>
    </div>
  );
};

export default Dashboard;
