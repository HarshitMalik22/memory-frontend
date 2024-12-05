import React, { useState, useEffect } from 'react';

// bring in props
const CardItem = ({ id, imageId, shownCards, cardClicked, source }) => {
  // set state
  const [show, setShow] = useState(false);

  // check if cardItem should be displayed, display if so
  useEffect(() => {
    let buff = shownCards.includes(id);
    setShow(buff);
    // eslint-disable-next-line
  }, [shownCards]);

  // call cardClicked with card div
  const onClick = (e) => {
    cardClicked(e.target);
  };

  // Function to dynamically load the candy images
  const getCandyImage = (imageId) => {
    return `/images/candy-${imageId}.png`;  // Use imageId to construct the image path
  };

  return (
    // materializeCSS card
    <div
      id={id}
      imgid={imageId}
      className='mem-card'
      // show card img and disable click if necessary
      style={{
        backgroundColor: show ? '#D3D3D3' : null,
        pointerEvents: show ? 'none' : 'auto',
      }}
      onClick={onClick}
    >
      <img
        id={id}
        imgid={imageId}
        alt='card-figure'
        // Dynamically get image from the local images folder
        src={getCandyImage(imageId)}
        // hide image if necessary
        style={{ visibility: !show ? 'hidden' : 'visible' }}
      ></img>
    </div>
  );
};

export default CardItem;
