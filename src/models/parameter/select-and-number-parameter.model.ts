/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Parameter from "./parameter.model";
import SelectAndNumberContainer from "../select-and-number-container.model";


interface SelectAndNumberParameter {
  parameter: Parameter
  value: SelectAndNumberContainer, 
  onChange: (newValue: SelectAndNumberContainer) => void, 
}

export default SelectAndNumberParameter;
