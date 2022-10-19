/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import RawTextInput from "../RawTextInput";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const TextParameterInput = ({ parameter, value, onChange }) => {
  
  return (
    <RawTextInput
      label={parameter.name}
      helperText={parameter.description}
      value={value}
      onChange={onChange}
    />
  );
}

export default TextParameterInput;
