import React from 'react'
import {useUser} from '../context/UserContext';
import {Table, Container, Spinner} from 'react-bootstrap';
import productsData from '../data/products.json';
import ItemImage from '../components/ItemImage';
import {Link} from 'react-router-dom';
import formatDate from '../utilities/formatDate';

function PurchaseHistory() {
    const {fetchOrderHistory} = useUser();
    const [orderHistory, setOrderHistory] = React.useState([]);
    const [isLoading, setLoadig] = React.useState(false);
    
    React.useEffect(() => {
        setLoadig(true);
        async function getOrderHistory(){
            try{
                const data = await fetchOrderHistory();
                setOrderHistory(data.orders);
                setLoadig(false);
            }
            catch(e){
                console.error(e);
            }
        }
        getOrderHistory();
    },[fetchOrderHistory])

  return (
    <Container style={{width: '90vw'}}>
      <h3 align="left"className="mb-5">Purchase History</h3>
      {isLoading ? 
                <Spinner className='mt-5' animation='border' />
            : 
            orderHistory.length < 1 ?
            <p className='text-muted' style={{fontSize: '15px'}}>
                        There are no orders associated with this account that were placed in the past
            </p> //no order history found
            :
            <Table style={{verticalAlign: 'middle', textAlign: 'start'}}>
                <thead>
                    <tr className='table-secondary'>
                        <th>Purchase date</th>
                        <th>Purchase number</th>
                        <th>Purchase items</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    orderHistory.map((order) => (
                      <tr key={order._id}>
                          <td className='vertical-align-center'>{formatDate(order.created)}</td>
                          <td><Link to=
                                      {{
                                          pathname: '/account/purchase-details', 
                                          search: `?purchaseNumber=${order.purchaseNumber}`
                                      }}
                                      state ={{...order}}
                              >{order.purchaseNumber}
                              </Link>
                          </td>
                          <td>
                              {
                                  order.items.slice(0, 3).map(item => {
                                  const foundProduct = productsData.find(data => data.id === item.id);
                                  return foundProduct ? <ItemImage key={foundProduct.id} width="60px" url={foundProduct.imgUrls[0]} /> : '';
                                  })}
                              {
                                  order.items.length > 3 && 
                                  (<Link className='ms-1'
                                      to={{pathname: '/account/purchase-details', search: `?purchaseNumber=${order.purchaseNumber}`}}
                                      state={{...order}}
                                  >+{order.items.length - 3}&nbsp;more
                                  </Link>)
                              }
                          </td>
                      </tr>
                    ))
                  }
                </tbody>
            </Table>
      }

      {/* <Container align="left" style={{ width: "80vw" }}>
        
        <Row
          className="mb-3"
          style={{ backgroundColor: "#f6f1ae", padding: "20px 0" }}
        >
          <Col xs={4}>
            <strong>Purchase date</strong>
          </Col>
          <Col xs={4}>
            <strong>Purchase number</strong>
          </Col>
          <Col xs={4}>
            <strong>Purchased items</strong>
          </Col>
        </Row>
        {isLoading ? (
          <Spinner animation="border" />
        ) : orderHistory.length >= 1 ? (
          orderHistory.map((order) => (
            <Row className="mb-2 align-items-center justify-content-start">
              <Col xs={4}>{formatDate(order.created)}</Col>
              <Col xs={4}>
                <Link
                  to={{
                    pathname: "/account/purchase-details",
                    search: `?purchaseNumber=${order.purchaseNumber}`,
                  }}
                  state={{ ...order }} //created: order.created, status: order.status, total: order.total, items: order.items
                >
                  {order.purchaseNumber}
                </Link>
              </Col>

              <Col className="d-flex align-items-center" xs={4}>
                {order.items.slice(0, 3).map((item) => {
                  const foundProduct = productsData.find(
                    (product) => product.id === item.id
                  );
                  if (foundProduct) {
                    return (
                      <div className="me-2">
                        <ItemImage width="60px" url={foundProduct.imgUrls[0]} />
                      </div>
                    );
                  }
                })}
                {order.items.length > 3 && (
                  <div>+{order.items.length - 3} more</div>
                )}
              </Col>
            </Row>
          ))
        ) : (
          <p>No purchases found</p>
        )}
      </Container> */}
    </Container>
  );
}

export default PurchaseHistory

