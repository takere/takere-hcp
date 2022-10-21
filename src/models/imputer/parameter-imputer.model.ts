/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Parameter from "../parameter/parameter.model";


interface ParameterImputer {
  parameter: Parameter, 
  value: any, 
  onChange: (newValue: any) => void
}

export default ParameterImputer;
