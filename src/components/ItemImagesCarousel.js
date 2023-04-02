import React from 'react'
import {Carousel} from 'react-bootstrap';

function ItemImagesCarousel({imgUrls}) {
  return (
        <Carousel variant="dark">
        {
            imgUrls.map(img => 
            <Carousel.Item>
            <img
                className="d-block w-100"
                style={{objectPosition: "center", objectFit: "cover"}}
                src={img}
            />
            </Carousel.Item>)
        }
        </Carousel>
  
  )
}

export default ItemImagesCarousel
