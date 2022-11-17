import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import CreatePage from './DCA/Create/CreatePage';
import DashboardPage from './DCA/Dashboard/DashboardPage';

function AppRoutes(): React.ReactElement {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={CreatePage} />
        <Route path="/positions" component={DashboardPage} />
      </Switch>
    </HashRouter>
  );
}

export default AppRoutes;
