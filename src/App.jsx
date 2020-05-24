/* eslint-disable react/jsx-fragments */
import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import Store from './redux/Store';
import './App.css';
import Home from './components/Home';
import Footer from './components/Footer';

const App = () => {
  return (
    <Provider store={Store}>
      <Fragment>
        <Home />
        <Footer />
      </Fragment>
    </Provider>
  );
};

export default App;
