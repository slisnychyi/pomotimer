import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import './Wrapper.css';


function Wrapper() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>);
}

export default Wrapper;
