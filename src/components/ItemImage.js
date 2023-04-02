import React from 'react'

function ItemImage({width, url}) {
  return (
      <img
        style={{
          height: "auto",
          width: width,
          objectPosition: "center",
          objectFit: "cover",
        }}
        src={url}
      />
  );
}

export default ItemImage
