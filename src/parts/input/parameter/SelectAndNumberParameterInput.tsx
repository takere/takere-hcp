/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Parameter from "../../../models/parameter/parameter.model";
import SelectAndNumberContainer from "../../../models/select-and-number-container.model";
import SelectAndNumberParameter from "../../../models/select-and-number-parameter.model";
import MultiSelectionInput from "../MultiSelectionInput";
import NumberInput from "../NumberInput";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const SelectAndNumberParameterInput = ({ 
  parameter, 
  value, 
  onChange 
}: SelectAndNumberParameter) => {

  const selectedNumber = loadSelectNumber(parameter, value);

  if (!value && parameter.options) {
    onChange({ select: parameter.options[0].value, number: selectedNumber });
  }

  return (
    <>
      <MultiSelectionInput
        label={parameter.name}
        helperText={parameter.description}
        value={value.select}
        onChange={(newValue: string) => onChange({ select: newValue, number: value.number })}
        options={parameter.options ?? []}
      />
      {shouldRequestInput(parameter, value) &&
        <NumberInput
          label={''}
          helperText={''}
          value={value.number}
          onChange={(newValue: number) => onChange({ select: value.select, number: newValue})}
        />
      }
    </>
  );
}

export default SelectAndNumberParameterInput;


// ----------------------------------------------------------------------------
//         Functions
// ----------------------------------------------------------------------------
function loadSelectNumber(parameter: Parameter, value: SelectAndNumberContainer) {
  if (!value || value.number === undefined || parameter.type !== 'select&number') {
    return 0;
  }

  return value.number;
}

function shouldRequestInput(parameter: Parameter, value: SelectAndNumberContainer) {
  return parameter.options
    && parameter.options[parseInt(value.select)] 
    && parameter.options[parseInt(value.select)]['request_input']
}
