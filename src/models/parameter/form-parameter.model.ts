/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Parameter from "./parameter.model";
import Options from "../options.model";


interface FormParameter {
  parameter: Parameter, 
  value: Options[], 
  onChange: (newOption: Options) => void
}

export default FormParameter;
