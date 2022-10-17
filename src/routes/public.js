/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Login } from "../pages/login/login";


//-----------------------------------------------------------------------------
//        Constants
//-----------------------------------------------------------------------------
const publicRoutes = [
  { path: '/login', exact: true, component: Login }
];

export default publicRoutes;
