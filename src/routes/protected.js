/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Dashboard } from "../pages/dashboard/dashboard";
import { Home } from "../pages/home/home";
import { Patients } from "../pages/patients";
import { Patient } from "../pages/patients/patient";
import { Profile } from "../pages/profile/profile";


//-----------------------------------------------------------------------------
//        Constants
//-----------------------------------------------------------------------------
export const protectedRoutes = [
  { path: '/', exact: true, component: Home },
  { path: '/dash/flow/:id', component: Dashboard },
  { path: '/dash', component: Dashboard },
  { path: '/profile', component: Profile },
  { path: '/patients/:id', component: Patient },
  { path: '/patients', component: Patients },
];


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const Protected = ({ component: Component, ...restOfProps }) => (
  <Route
    { ...restOfProps }
    render={(props) => isAuthenticated() 
      ? <Component { ...props } /> 
      : <Redirect to="/login" />
    }
  />
);

export default Protected;


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function isAuthenticated() {
  return localStorage.getItem("x_auth_token");
}
