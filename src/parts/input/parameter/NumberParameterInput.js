import React from "react";
import NumberInput from "../NumberInput";

const NumberParameterInput = ({ parameter, value, onChange }) => {
  
  return (
    <NumberInput
      label={parameter.name}
      helperText={parameter.description}
      value={value}
      onChange={onChange}
    />
  );
}

export default NumberParameterInput;
