import React from "react";
import MultiSelectionInput from "../MultiSelectionInput";

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
