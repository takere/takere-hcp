/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from "./routes";


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const App = () => (
  <>
    <ToastContainer position="top-right" />
    <Routes />
  </>
);

export default App;
