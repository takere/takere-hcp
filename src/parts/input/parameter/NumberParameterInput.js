/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import NumberInput from "../NumberInput";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const NumberParameterInput = ({ parameter, value, onChange }) => {
  
  return (
    <NumberInput
      label={parameter.name}
      helperText={parameter.description}
      value={value}
      onChange={onChange}
    />
  );
}

export default NumberParameterInput;
