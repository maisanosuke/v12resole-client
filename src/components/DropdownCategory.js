import React from 'react'
import {Dropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function CategoryDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle className='w-100' variant="secondary" id="dropdown-basic">
        Browse by Category
      </Dropdown.Toggle>
      <Dropdown.Menu className='w-100' variant="dark">
        <Dropdown.Item as={Link} to="/shop?category=repair">Repair Services</Dropdown.Item>
        <Dropdown.Item as={Link} to="/shop?category=chalkbags">Chalk Bags</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default CategoryDropdown
