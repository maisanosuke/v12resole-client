import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom';


function ItemCard({id, description, productName, image}) {
  const navigate = useNavigate();

  return (

    <Card border="light" bg="transparent" style={{ width: '15rem' }}>
      <Card.Img onClick={() => navigate(`/shop/${id}`)} style={{cursor: 'pointer'}} variant="top" src={image} />
      <Card.Body>
        {/* <Card.Title>{headline}</Card.Title> */}
        <Card.Text>
          <div>{productName}</div>
          <div>{description}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ItemCard;