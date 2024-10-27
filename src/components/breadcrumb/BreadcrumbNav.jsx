import React from 'react';
import { Breadcrumb } from 'antd';
import { FaHome } from 'react-icons/fa';

const BreadcrumbNav = ({ SecondElement, ThirdElement, FourthElement }) => {
  const items = [
    {
      title: (
        <span>
          <FaHome size={25} id='bcb-home-logo' className='me-1' />
          Home
        </span>
      ),
      href: '/',
    },
  ];

  if (SecondElement !== '') {
    items.push({
      title: SecondElement,
      href: SecondElement == 'category' ? '/all-categories' : null
    });
  }

  if (ThirdElement !== '') {
    items.push({
      title: ThirdElement,
    });
  }

  if (FourthElement !== '') {
    items.push({
      title: FourthElement,
      href: '',
    });
  }

  return (
    <Breadcrumb
      className='container breadcrumbWrapper'
      separator="|"
      items={items}
    />
  );
};

export default BreadcrumbNav;
