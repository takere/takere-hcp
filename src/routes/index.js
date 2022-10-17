/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { 
  BrowserRouter as Router, 
  Switch, 
  Redirect, 
  Route 
} from "react-router-dom";
import protectedRoutes from "./protected";
import publicRoutes from "./public";


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

const PublicRoute = ({ component: Component, ...restOfProps }) => (
  <Route
    { ...restOfProps }
    render={(props) => !isAuthenticated() 
      ? <Component { ...props } /> 
      : <Redirect to="/" />
    }
  />
);

const ProtectedRoute = ({ component: Component, ...restOfProps }) => (
  <Route
    { ...restOfProps }
    render={(props) => hasAuthenticationToken() 
      ? <Component { ...props } /> 
      : <Redirect to="/login" />
    }
  />
);


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function buildPublicRoutes() {
  const routeSwitch = [];

  publicRoutes.forEach((route, index) => {
    routeSwitch.push(<PublicRoute key={index} { ...route } />);
  })

  return routeSwitch;
}

function buildProtectedRoutes() {
  const routeSwitch = [];

  protectedRoutes.forEach((route, index) => {
    routeSwitch.push(<ProtectedRoute key={index} { ...route } />);
  })

  return routeSwitch;
}

function isAuthenticated() {
  return localStorage.getItem("isAuthenticated");
}

function hasAuthenticationToken() {
  return localStorage.getItem("x_auth_token");
}
