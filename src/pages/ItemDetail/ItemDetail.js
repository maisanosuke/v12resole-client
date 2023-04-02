import React from 'react'
import { useParams } from 'react-router-dom'
import formatCurrency from '../../utilities/formatCurrency'
import productsData from '../../data/products.json';
import {Container, Button} from 'react-bootstrap';
import {useShoppingCart} from '../../context/ShoppingCartContext';
import ItemImagesCarousel from '../../components/ItemImagesCarousel';
import './ItemDetail.css'


function ItemDetail() {
    const id = Number(useParams().id);

    const item = productsData.find(product => product.id === id);
    const [count, setCount] = React.useState(1);
    const {increaseCartQty, openCart} = useShoppingCart();

    const addToBasket = () => {
        increaseCartQty(id, count);
        openCart();
    }

  return (
    <Container>
    {item && 
    <div className='item_container mt-5'>
        <div className='w-100' >
            <ItemImagesCarousel imgUrls={item.imgUrls}/>
            {/* <img style={{height: 'auto', maxWidth: '100%'}} src={item.imgUrls[0]}/> */}
        </div>
        <div className='item_detail_container'>
            <h2 className='mb-3'><b>{item.name}</b></h2>
            <h4 className='mb-3'>{formatCurrency(item.price)}</h4>
            <div className='mb-3'>
            <Button onClick={()=>setCount(prevCount => prevCount <= 1 ? 1 : prevCount-1)} disabled={count<=1} variant='outline-secondary' size='lg'>-</Button>
                <b className='fs-5'>&nbsp;&nbsp;&nbsp;{count}&nbsp;&nbsp;&nbsp;</b>
            <Button onClick={()=>setCount(prevCount => prevCount + 1)} size='lg' variant='outline-secondary'>+</Button></div>
            <p>{item.detail}</p>
            <Button onClick={addToBasket} variant='secondary' size='lg' className='add_to_cart_button mb-3'>&nbsp;&nbsp;Add To Bag&nbsp;&nbsp;</Button>
            
        </div>
    </div>
    }
    </Container>
  )
}

export default ItemDetail
