import React from 'react'
import Carousel from 'react-multi-carousel';
import ItemCard from './ItemCard';
import 'react-multi-carousel/lib/styles.css';
import productsData from '../data/products.json';
import formatCurrency from '../utilities/formatCurrency';

function MultiCarousel() {
    const responsive = {
        monitor: {
        breakpoint: {
            max: 3000,
            min: 1300,
            },
            items: 4,
            partialVisibilityGutter: 30
        },

        desktop: {
          breakpoint: {
            max: 1300,
            min: 991,
          },
          items: 3,
          partialVisibilityGutter: 40
        },
        mobile: {
          breakpoint: {
            max: 500,
            min: 0
          },
          items: 1,
          partialVisibilityGutter: 40
        },
        tablet: {
          breakpoint: {
            max: 991,
            min: 500
          },
          items: 2,
          partialVisibilityGutter: 30
        }
      }

  return (
    <div>
        <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        className=""
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        partialVisible
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={responsive}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
        >

        {productsData.map(product => {
            if(product.category === "Repair Service"){
                return <ItemCard
                            key={product.id}
                            id={product.id}
                            description={formatCurrency(product.price)}
                            productName={product.name}
                            image={product.imgUrls[0]}
                            />
            }})
        }

        </Carousel>
    </div>
  )
}

export default MultiCarousel
