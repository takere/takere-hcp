/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import MultiSelectionInput from "../MultiSelectionInput";
import RawTextInput from "../RawTextInput";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const SelectOrTextParameterInput = ({ parameter, value, onChange }) => {
  
  if (parameter.options.length === 0) {
    return (
      <RawTextInput
        label={parameter.name}
        helperText={parameter.description}
        value={value}
        onChange={onChange}
      />
    );
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

export default SelectOrTextParameterInput;
