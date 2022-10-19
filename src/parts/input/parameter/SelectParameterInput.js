/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import MultiSelectionInput from "../MultiSelectionInput";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const SelectParameterInput = ({ parameter, value, onChange }) => {
  
  if (!value) {
    onChange(parameter.options[0].value);
  }
  return (
    <MultiSelectionInput
      label={parameter.name}
      helperText={parameter.description}
      value={value}
      onChange={onChange}
      options={parameter.options}
    />
  );
}

export default SelectParameterInput;
