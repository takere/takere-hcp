/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import ParameterImputer from "../../models/parameter-imputer.model";
import InputFactoryException from "../exception/input-factory.exception";
import parameters from "./parameter";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const ParameterInput = ({ parameter, value, onChange }: ParameterImputer) => {

  const normalizedType = normalizeParameterType(parameter.type);

  if (parameters[normalizedType as keyof typeof parameters] === undefined) {
    throw new InputFactoryException(`There is no support for parameter ${parameter.type}`);
  }

  return React.createElement(
    parameters[normalizedType as keyof typeof parameters], 
    { parameter, value, onChange }
  );
}

export default ParameterInput;


// ----------------------------------------------------------------------------
//         Functions
// ----------------------------------------------------------------------------
function normalizeParameterType(type: string): string {
  return type
    .replace("|", "_or_")
    .replace("&", "_and_")
    .toUpperCase();
}
