/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import RoutePath from "../models/route-path.model";
import Dashboard from "../pages/dashboard/dashboard";
import Home from "../pages/home/home";
import Patients from "../pages/patients";
import Patient from "../pages/patients/patient";
import Profile from "../pages/profile/profile";


// ----------------------------------------------------------------------------
//         Constants
// ----------------------------------------------------------------------------
const protectedRoutes: RoutePath[] = [
  { path: '/', exact: true, component: Home },
  { path: '/dash/flow/:id', component: Dashboard },
  { path: '/dash', component: Dashboard },
  { path: '/profile', component: Profile },
  { path: '/patients/:patientId/:flowId', component: Patient },
  { path: '/patients', component: Patients },
];

export default protectedRoutes;
