import React from "react";
import MultiSelectionInput from "../MultiSelectionInput";
import NumberInput from "../NumberInput";
import RawTextInput from "../RawTextInput";

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
