import React from 'react'
import { useShoppingCart } from '../context/ShoppingCartContext'
import formatCurrency from '../utilities/formatCurrency';
import {Button,Row, Col} from 'react-bootstrap';

function ItemInSummary({item}) {
    const {id, name, price, imgUrls} = item;
    const {itemQty, increaseCartQty, decreaseCartQty} = useShoppingCart();

    const handleDecrease = () => {
        decreaseCartQty(id);
    }
    const handleIncrease = () => {
        increaseCartQty(id, 1);
    }

  return (
      <Row className='mb-3 align-items-center'>
          <Col xs={3}>
             <img
                style={{
                    height: "auto",
                    width: "150px",
                    objectPosition: "center",
                    objectFit: "cover",
                }} src={imgUrls[0]}
                />
          </Col>
          <Col xs={4}> 
            <p className="mb-1">{name}</p>
            <p className="text-muted">{formatCurrency(price)}</p>
          </Col>
          <Col xs={3}> 
            <Button onClick={handleDecrease} variant='outline-secondary' size='sm'>-</Button>
                <b className='fs-5'>&nbsp;&nbsp;&nbsp;{itemQty(id)}&nbsp;&nbsp;&nbsp;</b>
            <Button onClick={handleIncrease} size='sm' variant='outline-secondary'>+</Button>
          </Col>
          <Col xs={2}> 
            <b>{formatCurrency(price*itemQty(id))}</b>
          </Col>
    </Row>

//     <div className='d-flex flex-row align-items-center justify-content-between mb-3' style={{width: "100%"}} >
//     <img
//       style={{
//         height: "auto",
//         width: "150px",
//         objectPosition: "center",
//         objectFit: "cover",
//       }}
//       src={imgUrls[0]}
//     />
//     <div className="d-flex flex-column justify-content-center">
//       <p className="mb-1">{name}</p>
//       <p className="text-muted">{formatCurrency(price)}</p>
//     </div>
//     <div>
//         <Button onClick={handleDecrease} variant='outline-secondary' size='md'>-</Button>
//                     <b className='fs-5'>&nbsp;&nbsp;&nbsp;{itemQty(id)}&nbsp;&nbsp;&nbsp;</b>
//         <Button onClick={handleIncrease} size='md' variant='outline-secondary'>+</Button>
//     </div>
//     <div>
//         <b>{formatCurrency(price*itemQty(id))}</b>
//     </div>
//   </div>
  )
}

export default ItemInSummary
