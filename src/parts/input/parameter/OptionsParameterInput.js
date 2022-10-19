import React from "react";
import OptionInputBuilder from "../OptionInputBuilder";

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

