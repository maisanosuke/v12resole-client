import React from 'react'
import {useLocation} from 'react-router-dom';
import {Table, Row, Col, Container, Stack} from 'react-bootstrap';
import productsData from '../data/products.json';
import ItemInBasket from '../components/ItemInBasket';
import formatDate from '../utilities/formatDate';
import formatCurrency from '../utilities/formatCurrency';

function PurchaseDetails() {
    const location = useLocation();
    console.log(location);
    const {created, items, paymentInfo, purchaseNumber, status, subTotal, tax, total, shippingFee} = location.state;
    const {line1, line2, city, postal_code, state, country} = paymentInfo.billingAddress;

  return (
      <div align='left' style={{width: '90vw'}}>
      <h3>Purchase # {purchaseNumber}</h3>
      <p className='mb-5'>{formatDate(created)}</p>

      <Table responsive style={{textAlign: 'start'}}>
          <thead>
            <tr className='table-secondary'>
                <th colSpan={3}>Shipment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td><strong>Status:</strong> {status}</td>
                <td colSpan={2}><strong>Tracking:</strong></td>
            </tr>
            <tr>
                <td><strong>Ship to:</strong><p>{line1} {line2} {city}, {state} {postal_code} {country}</p></td>
                <td colSpan={2}>
                    <Stack gap={2}>{items.map(item => {
                        const foundProduct = productsData.find(product => product.id === item.id);
                        return foundProduct && <ItemInBasket item={foundProduct} count={item.count}/>
                        })}
                    </Stack>
                </td>
            </tr>
          </tbody>
      </Table>

      <Table responsive>
          <thead>            
            <tr className='table-secondary'>
                <th colSpan={3}>Payment details</th>
            </tr>
        </thead>  
            <tr>
                <td colSpan={2}><strong>Billing Address</strong><p>{line1} {line2} {city}, {state} {postal_code} {country}</p></td>
                <td>
                    <Stack >
                    <div><strong>Purchase summary</strong></div>
                    <div className='d-flex justify-content-between'><span>SubTotal</span><span>{formatCurrency(subTotal/100)}</span></div>
                    <div className='d-flex justify-content-between'><span>Shipping</span><span>{formatCurrency(shippingFee/100)}</span></div>
                    <div className='d-flex justify-content-between'><span>Tax</span><span>{formatCurrency(tax/100)}</span></div>
                    <div><strong className='d-flex justify-content-between'><span>Order total</span><span>{formatCurrency(total/100)}</span></strong></div>
                    </Stack>
                </td>
            </tr>
      </Table>
      
    
    {/* <Stack gap={3} className='mb-5'>
    <h5 style={{backgroundColor: "#f6f1ae", padding: '20px 0'}} xs={12}>Shipment</h5>
    <Row>
        <Col xs={4}><strong>Status:</strong> {status}</Col>
        <Col xs={8}><strong>Tracking:</strong></Col>
    </Row>
    <Row>
        <Col xs={4}><strong>Ship to:</strong> {paymentInfo?.billingAddress?.postal_code}</Col>
        <Col className='gap-2' xs={8}>
            <strong>Items:</strong>
            <Stack gap={2}>{items.map(item => {
            const foundProduct = productsData.find(product => product.id === item.id);
            return foundProduct && <ItemInBasket item={foundProduct} count={item.count}/>
            })}
            </Stack>
        </Col>
    </Row>
    
    <h5 style={{backgroundColor: "#f6f1ae", padding: '20px 0'}} xs={12}>Payment Details</h5>
    <Row>
        <Col xs={4}><strong>Billing address</strong>
            <p>{line1} {line2} {city}, {state} {postal_code} {country}</p>
        </Col>
        <Col xs={{span: 4, offset: 4}}>
            <Stack>
                <div><strong>Purchase summary</strong></div>
                <div className='d-flex justify-content-between'><span>SubTotal</span><span align='right'>{formatCurrency(subTotal/100)}</span></div>
                <div className='d-flex justify-content-between'><span>Shipping</span><span>{formatCurrency(shippingFee/100)}</span></div>
                <div className='d-flex justify-content-between'><span>Tax</span><span>{formatCurrency(tax/100)}</span></div>
                <div className='d-flex justify-content-between'><strong>Order total</strong><strong>{formatCurrency(total/100)}</strong></div>
            </Stack>
        </Col>
    </Row>
    </Stack> */}

    </div>
  )
}

export default PurchaseDetails
