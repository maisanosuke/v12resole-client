import React from 'react'
import {useShoppingCart} from '../context/ShoppingCartContext';
import {useUser} from '../context/UserContext'
import productsData from '../data/products.json';
import ItemInBasket from '../components/ItemInBasket';
import formatCurrency from '../utilities/formatCurrency';
import { Container, Stack } from 'react-bootstrap';
import {sendPostOrder} from '../api';
import {useNavigate} from 'react-router-dom';

function OrderComplete() {
    const navigate = useNavigate();
    const {cartItems, addOrderHistory} = useShoppingCart();
    //const {sessionId} = useUser();
    const [orderPlaced, setOrderPlaced] = React.useState([]);
    const [orderTotal, setOrderTotal] = React.useState();
    
    React.useEffect(()=>
    {
      // async function sendOrder(){
      //   //create order and save in mongodb orders for order history
      //   const res = await sendPostOrder({id: sessionId, items: cartItems});
      // }
      // sendOrder();
      async function sendOrder(){
        await addOrderHistory();
      }
      if(cartItems.length){
        console.log('useeffect was called');
        setOrderPlaced(cartItems);
        setOrderTotal(cartItems.reduce((total, item) => total + productsData.find(product => product.id === item.id).price, 0));
        sendOrder();
      }else{
        navigate('/account/purchase-history');
      }
    },[])

  return (
    <Container className='mt-5 justify-content-center'>
    <h1>Thank you for your order!</h1>
    <h4>Items Ordered</h4>
    <Stack gap={3}>
    { 
        orderPlaced.length &&
        orderPlaced.map(item => {
                  const foundProduct = productsData.find(data => data.id === item.id);
                  if(foundProduct){
                      return <ItemInBasket key={item.id} item={foundProduct} count={item.count} />
                  }
        })
    }
    </Stack>
    <h4>Order Total: {formatCurrency(orderTotal)}</h4>
    </Container>
  )
}

export default OrderComplete
