import React from 'react'
import {useShoppingCart} from '../context/ShoppingCartContext';
import {Offcanvas, Button} from 'react-bootstrap';
import ItemInBasket from './ItemInBasket';
import productsData from '../data/products.json';
import formatCurrency from '../utilities/formatCurrency';
import {useNavigate} from 'react-router-dom';

function ShoppingCart() {
    const navigate = useNavigate();
    const {show, closeCart, cartItems, cartQty} = useShoppingCart();
    const subtotal = cartItems.reduce((total, item) => total + productsData.find(product => product.id == item.id).price * item.count, 0);

  return (
    <div>
      <Offcanvas show={show} onHide={closeCart} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Added to Basket!</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {
              cartItems.map(item => {
                  const foundProduct = productsData.find(data => data.id === item.id);
                  if(foundProduct){
                      return <ItemInBasket key={item.id} item={foundProduct} count={item.count} />
                  }
              })
          }
          <p>Cart subtotal: <b>{formatCurrency(subtotal)}</b> ({cartQty} { cartQty>1 ? 'items' : 'item' })</p>
          <div className="d-flex flex-row justify-content-between mt-3">
            <Button onClick={()=>{navigate('/cart');closeCart();}} variant='secondary' className='w-100 me-2'>Cart & Checkout</Button>
            <Button onClick={()=>{navigate('/shop');closeCart();}} variant='outline-secondary' className='w-100'>Continue Shopping</Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default ShoppingCart
