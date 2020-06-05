/* 
Footer Component: 
It is shown at the bottom of the Home page.
Rendered UI:
div         : A coloured bar with a text on it
*/

import React from 'react';
import styles from './style.css';

const Footer = () => (
  <footer>
    <div className={styles.text}>Powered by Anthoula Alipasali</div>
  </footer>
);

export default Footer;
