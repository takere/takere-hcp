/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState } from "react";
import MultiSelectionInput from "../MultiSelectionInput";
import NumberInput from "../NumberInput";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const SelectAndNumberParameterInput = ({ parameter, value, onChange }) => {

  const [selectNumber, setSelectNumber] = useState(loadSelectNumber(parameter, value));

  if (!value) {
    onChange({ select: parameter.options[0].value, number: selectNumber });
  }

  return (
    <>
      <MultiSelectionInput
        label={parameter.name}
        helperText={parameter.description}
        value={value.select}
        onChange={newValue => onChange({ select: newValue, number: value.number })}
        options={parameter.options}
      />
      {parameter.options[value.select] && parameter.options[value.select]['request_input'] &&
        <NumberInput
          label={''}
          helperText={''}
          value={value.number}
          onChange={newValue => onChange({ select: value.select, number: newValue})}
        />
      }
    </>
  );
}

export default SelectAndNumberParameterInput;


// ----------------------------------------------------------------------------
//         Functions
// ----------------------------------------------------------------------------
function loadSelectNumber(parameter, value) {
  if (!value || value.number === undefined || parameter.type !== 'select&number') {
    return 0;
  }

  return value.number;
}
