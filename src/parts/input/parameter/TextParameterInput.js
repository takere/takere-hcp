import React from "react";
import RawTextInput from "../RawTextInput";

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
