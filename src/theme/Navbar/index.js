import React from 'react';
import DefaultNavbar from '@theme-original/Navbar';
import Banner from '../../components/Banner';

export default function Navbar(props) {
  return (
    <>
      <Banner />
      <DefaultNavbar {...props} />
    </>
  );
} 