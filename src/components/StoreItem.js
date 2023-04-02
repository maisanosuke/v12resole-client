import React from 'react'
import formatCurrency from '../utilities/formatCurrency'
import {useNavigate} from 'react-router-dom';
import ItemImagesCarousel from './ItemImagesCarousel';

function StoreItem({id, name, price, imgUrls}) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if(e.target.type !== 'button' && e.target.className !== 'carousel-control-next-icon' && e.target.className !== 'carousel-control-prev-icon'){
      navigate(`/shop/${id}`)
    }
  }

  return (
    <div style={{width: "100%"}} style={{cursor: 'pointer'}} onClick={handleClick}>
      <ItemImagesCarousel imgUrls={imgUrls} />
      {/* <Carousel interval={null} variant="dark">
      {
        imgUrls.map(img => 
        <Carousel.Item>
          <img
            style={{ height: "auto", width: "100%", objectPosition: "center", objectFit: "cover"}}
            src={img}
          />
        </Carousel.Item>)
      }
      </Carousel> */}
      <p className='mb-1'>{name}</p>
      <p>{formatCurrency(price)}</p>
    </div>
  );
}

export default StoreItem


{/* <img style={{height:'auto', maxWidth: '100%', objectFit:'cover'}} src={imgUrl}/>
      <p>{name}</p>
      <p>{formatCurrency(price)}</p> */}