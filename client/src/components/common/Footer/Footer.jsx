import React from 'react';
import './Footer.css';
import { APP_NAME } from '../../../constans';

const Footer = () => {
  return (
    <footer className="text-center app-footer">
      &copy; {(new Date()).getFullYear()} - {APP_NAME}
    </footer>
  )
}

export default Footer;
