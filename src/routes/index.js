/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Protected, { protectedRoutes } from "./protected";
import Public, { publicRoutes } from "./public";


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const Routes = () => (
  <Router>
    <Switch>
      { buildPublicRoutes() }
      { buildProtectedRoutes() }
    </Switch>
  </Router>
);

export default Routes;


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function buildPublicRoutes() {
  const routeSwitch = [];

  publicRoutes.forEach((route, index) => {
    routeSwitch.push(<Public key={index} { ...route } />);
  })

  return routeSwitch;
}

function buildProtectedRoutes() {
  const routeSwitch = [];

  protectedRoutes.forEach((route, index) => {
    routeSwitch.push(<Protected key={index} { ...route } />);
  })

  return routeSwitch;
}
