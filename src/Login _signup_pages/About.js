import React from 'react'
import {useNavigate } from 'react-router-dom'
export const About = () => {
  const name = 'SHOP NOW';
  const navigate = useNavigate();
  const clickHandler=()=>{
    navigate('/products');
  }
  return (
    <div className="container-home">
    <div className="left-container" data-aos="zoom-in-right" data-aos-duration="1000">
      <p className='intro-data'>Welcome to</p>
      <h1 className='heading' >Elegance</h1>
      <p className='main-content'>Welcome to our About section, where we introduce our brand ethos and values. Committed to excellence, we curate a diverse range of high-quality products tailored to meet diverse tastes. With a focus on integrity, innovation, and sustainability, we foster a community where individuals can express themselves authentically. Join us on our journey as we strive to exceed expectations and unlock endless possibilities.</p>
       <div onClick={clickHandler}>
        <button className='button'>shop Now</button>
        </div>
    </div>
    <div className="right-container" data-aos="zoom-in-up" data-aos-duration="1000">
      <img src="./top-img.svg" alt="shopping" />
    </div>
  </div>
  )
}
