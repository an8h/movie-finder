/* eslint-disable react/jsx-fragments */
import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './redux/Store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Routes from './routes/Routes';

const App = () => {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Fragment>
          <Route component={Routes} />
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
