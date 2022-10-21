/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Parameter from "./parameter.model";


interface DateParameter {
  parameter: Parameter
  value: string | Date, 
  onChange: (newValue: string | undefined | null) => void, 
}

export default DateParameter;
