/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import parameters from "./parameter";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const ParameterInput = ({ parameter, value, onChange }) => {

  const normalizedType = normalizeParameterType(parameter.type);

  if (parameters[normalizedType] === undefined) {
    throw new Error(`There is no support for parameter ${parameter.type}`);
  }

  return React.createElement(
    parameters[normalizedType], 
    { parameter, value, onChange }
  );
}

export default ParameterInput;


// ----------------------------------------------------------------------------
//         Functions
// ----------------------------------------------------------------------------
function normalizeParameterType(type) {
  return type
    .replace("|", "_or_")
    .replace("&", "_and_")
    .toUpperCase();
}
