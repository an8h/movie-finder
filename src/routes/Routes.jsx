import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../components/Home/index';
import DetailPage from '../components/DetailPage/index';
import WatchVideo from '../components/WatchVideo/index';
import PageNotFound from '../components/PageNotFound/index';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/detail" component={DetailPage} />
    <Route path="/watchVideo" component={WatchVideo} />
    <Route component={PageNotFound} />
  </Switch>
);

export default Routes;
