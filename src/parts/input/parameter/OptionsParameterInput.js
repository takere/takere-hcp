/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import OptionInputBuilder from "../OptionInputBuilder";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const OptionsParameterInput = ({ value, onChange }) => {


  const handleFieldChange = (newValue, index) => {
    const updatedFields =  [ ...value ];

    updatedFields[index] = newValue;

    onChange(updatedFields);
  }

  const handleNewField = () => {
    const updatedFields =  [ ...value ];

    updatedFields.push('');

    onChange(updatedFields);
  }

  const handleRemoveField = (fieldIndex) => {
    const updatedFields =  value.filter((_, index) => index !== fieldIndex);

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

