/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import OptionsParameter from "../../../models/options-parameter.model";
import Options from "../../../models/options.model";
import OptionInputBuilder from "../OptionInputBuilder";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const OptionsParameterInput = ({ value, onChange }: OptionsParameter) => {

  const handleFieldChange = (newOption: Options, index: number) => {
    const updatedFields =  [ ...value ];

    updatedFields[index] = newOption;

    onChange(updatedFields);
  }

  const handleNewField = () => {
    const updatedFields =  [ ...value ];

    updatedFields.push();

    onChange(updatedFields);
  }

  const handleRemoveField = (fieldIndex: number) => {
    const updatedFields =  value.filter((_: any, index: number) => index !== fieldIndex);

    onChange(updatedFields);
  }

  return (
    <OptionInputBuilder
      options={value}
      onValueChange={handleFieldChange}
      handleRemoveOption={handleRemoveField}
      handleNewOption={handleNewField}
    />
  );
}

export default OptionsParameterInput;

