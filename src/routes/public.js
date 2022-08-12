/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Login } from "../pages/login/login";


//-----------------------------------------------------------------------------
//        Constants
//-----------------------------------------------------------------------------
export const publicRoutes = [
  { path: '/login', exact: true, component: Login }
];


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const Public = ({ component: Component, ...restOfProps }) => (
  <Route
    { ...restOfProps }
    render={(props) => !isAuthenticated() 
      ? <Component { ...props } /> 
      : <Redirect to="/" />
    }
  />
);

export default Public;


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function isAuthenticated() {
  return localStorage.getItem("isAuthenticated");
}
