import React from "react";
import RawTextInput from "./RawTextInput";
import { Spacing } from "./styled";
import AccentButton from "../../components/buttons/AccentButton";
import DangerButton from "../../components/buttons/DangerButton";

const OptionInputBuilder = ({ 
  handleNewOption, 
  options, // option: {label, type, options}
  onValueChange, 
  handleRemoveOption 
}) => (
  <div>
    <AccentButton 
      iconName='add' 
      type='big'
      onClick={handleNewOption} 
      style={{
        width: '100%'
      }}
    />
    <Spacing />
    {options && options.map((option, index) => (
      <div key={index}>
        <div style={{display: "flex", flexDirection: "row", alignItems: 'center'}}>
          <RawTextInput
            label={`Option ${index+1}`}
            helperText=""
            value={option.label ?? option}
            style={{marginRight: 5}}
            onChange={(newValue) => onValueChange(newValue, index)}
          />
          <DangerButton 
            iconName='remove' 
            onClick={() => handleRemoveOption(index)} 
          />
        </div>
        <Spacing />
      </div>
    ))}
  </div>
);

export default OptionInputBuilder;
