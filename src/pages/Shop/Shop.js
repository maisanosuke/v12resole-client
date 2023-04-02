import React from 'react'
import productsData from '../../data/products.json';
import {Row, Col, Container} from 'react-bootstrap';
import StoreItem from '../../components/StoreItem';
import SidebarCategory from '../../components/SidebarCategory';
import DropdownCategory from '../../components/DropdownCategory';
import {useLocation} from 'react-router-dom';
import './Shop.css';

function Shop() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [products, setProducts] = React.useState(productsData);
  const [category, setCategory] = React.useState('Shop All');

  React.useEffect(()=>{
    if(searchParams.has('category')){
      if(searchParams.get('category')==='repair'){
        setProducts(productsData.filter(productData => productData.category === 'Repair Service'));
        setCategory('Repair Service');
      }
      else {
        setProducts(productsData.filter(productData => productData.category === 'Chalk Bags'))
        setCategory('Chalk Bags');
      }
    }
    else {
      setProducts(productsData)
      setCategory('Shop All');
    }
  }, [searchParams])

  return (
    //className='d-flex flex-col style={{display: "none"}}' 
    <Container className='shopContainer'>
      <div className='sidebarCategory'><SidebarCategory /></div>
      <div className='dropdownCategory' style={{marginTop: "2em"}}><DropdownCategory /></div>
      <div>
        <h4 style={{margin: "2em 0"}}><b>{category}</b></h4>
        <Row>
        {
          products && products.map(product =>
                                            <Col　key={product.id} xs={6} lg={4}>
                                              <StoreItem {...product}/>
                                            </Col>
                                          
          )
        }
        </Row>
      </div>
    </Container>
  )
}

export default Shop
