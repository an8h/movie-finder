import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../components/Home/index';
import DetailPage from '../components/DetailPage/index';
import WatchVideo from '../components/WatchVideo/index';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/detail" component={DetailPage} />
    <Route path="/watchVideo" component={WatchVideo} />
  </Switch>
);

export default Routes;
