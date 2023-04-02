import React from 'react';
import { useNavigate } from 'react-router-dom'
import MultiCarousel from '../../components/MultiCarousel';
import Button from '../../components/Button/Button';
import EmailSignup from '../../components/EmailSignup/EmailSignup';
import ContactUs from '../../components/ContactUs/ContactUs';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  return (
    <>
    <div className='hero_image'>
          <div className='heading_container'>
            <strong className='heading'>REVIVE.</strong>
            <strong className='heading'>RESOLE.</strong>
          </div>
          <p className='sub_heading'>Coming Soon in Spring!</p>
          <Button text='Shop now' onClickFunc={()=>navigate('shop')} />
          {/* <button onClick={()=>navigate('/shop')} className='shop_now_button' >Shop now</button> */}
    </div>

    <div className='top-service-container'>
      <h3 className='top-service-heading'>Repair Services</h3>
      <MultiCarousel />
    </div>

    <ContactUs /> 

    <EmailSignup />

    {/* <div >
        <img className='home_image' src='/imgs/climbingCover.jpg'/>
        <div className='home_container'>
          <div className='heading_container'>
            <strong className='heading'>REVIVE.</strong>
            <strong className='heading'>RESOLE.</strong>
          </div>
          <p className='sub_heading'>Coming Soon in Spring!</p>
          <button className='shop_now_button' >Shop now</button>
        </div>
        
    </div> */}
    </>
  )
}

export default Home
