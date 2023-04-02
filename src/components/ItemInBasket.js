import React from 'react'
import formatCurrency from '../utilities/formatCurrency';
import ItemImage from './ItemImage';

function ItemInBasket({item, count}) {
  return (
    <div style={{width: "100%"}} className='d-flex flex-row'>
      <ItemImage width={"150px"} url={item.imgUrls[0]} />
      {/* <img
        style={{
          height: "auto",
          width: "150px",
          objectPosition: "center",
          objectFit: "cover",
        }}
        src={item.imgUrls[0]}
      /> */}
      <div className="d-flex flex-column justify-content-center ms-3">
        <p className="mb-1">
          {item.name}
          <span className="text-muted" style={{ fontSize: "0.8em" }}>
            &nbsp;x{count}
          </span>
        </p>
        <p className="text-muted">{formatCurrency(item.price)}</p>
      </div>
    </div>
  );
}

export default ItemInBasket
