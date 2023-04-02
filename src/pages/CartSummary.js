import React from 'react'
import productsData from '../data/products.json';
import {useShoppingCart} from '../context/ShoppingCartContext';
import { useUser } from '../context/UserContext';
import ItemInSummary from '../components/ItemInSummary';
import {Container, Row, Col, Button, Spinner} from 'react-bootstrap';
import formatCurrency from '../utilities/formatCurrency';

function CartSummary() {
    const {cartItems, cartQty, checkout} = useShoppingCart();
    const [loading, setLoading] = React.useState(false); 
    const subTotal = cartItems.reduce((total, item) => total + item.count * productsData.find(productData => productData.id === item.id).price, 0);
    const {setSessionId} = useUser();

    const handleCheckout = () => {
      setLoading(true);
      try{
        checkout();
        // setSessionId(data.session.id);
        // window.location = data.session.url;
      }catch(e){
        console.log(e);
      }
      // fetch("http://localhost:3001/checkout", {
      //   method: "POST",
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({items: cartItems}),
      // })
      // .then(res =>{
      //   if(!res.ok) return res.json.then(json => Promise.reject(json));//if res.ok === false, fail the promise so it can catch error
      //   else return res.json();
      // })
      // .then(jsonData => window.location.href = jsonData.url)
      // .catch(e => {
      //   console.log(e);
      // })
    }

  return (
    <Container className='mt-5'>
      { 
        loading ? 
        <div className='d-flex justify-content-center align-items-center'>
          <Spinner animation="border"/>
        </div>
        :
        cartItems.length ? 
      <>
        <Row>
          <h3 className='mb-3'>Your Shopping Cart
            <span className="text-muted" style={{ fontSize: "0.7em" }}>
              &nbsp;({cartQty} items)
            </span>
          </h3>
        </Row>
        <Row>
          <Col xs={8}>
          {
              cartItems.map(item => {
                  const foundProduct = productsData.find(data => data.id === item.id);
                  if(foundProduct){
                      return <ItemInSummary key={item.id} item={foundProduct}/>
                  }
              })
          }
          </Col >
          <Col xs={{span: 3, offset: 1}}>
            <p><b>Order Summary</b></p>
            <div className='d-flex flex-row justify-content-between'>
              <p>Subtotal</p>
              <p>{formatCurrency(subTotal)}</p>
            </div>
            <Button onClick={handleCheckout} className='w-100' variant='success'>Proceed to Checkout</Button>
          </Col>
        </Row>
        </>
        :
        <h3 className='mb-3'>Your Shopping Cart is Empty</h3>
       }
    </Container>
  )
}

export default CartSummary
