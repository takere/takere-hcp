import React from "react";
import frequencyTypeOptions from './frequency.type.json';
import MultiSelectionInput from "../input/MultiSelectionInput";
import NumberInput from "../input/NumberInput";


//-----------------------------------------------------------------------------
//        Constants
//-----------------------------------------------------------------------------
const frequencyHelperText = {
  everyHours: 'Skip interval (in hours). Example: every 2 hours...',
  everyDays: 'Skip interval (in days). Example: every 2 days...',
};


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const FrequencyInput = ({ frequencyType, setFrequencyType, frequencyValue, setFrequencyValue }) => (
  <>
    <MultiSelectionInput
      label="Frequency"
      helperText="How often this treatment should be performed?"
      value={frequencyType}
      onChange={setFrequencyType}
      options={frequencyTypeOptions}
    />
    {hasFrequencyTypeSomeValue(frequencyType) &&
      <NumberInput 
        label="Frequency value"
        helperText={generateHelperTextForFrequency(frequencyType)}
        value={frequencyValue}
        onChange={(newValue) => onChangeFrequencyValue(newValue, setFrequencyValue)}
      />
    }
  </>
);

export default FrequencyInput


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function hasFrequencyTypeSomeValue(type) {
  return  (type === 'everyHours')
          || (type === 'everyDays');
}

function generateHelperTextForFrequency(type) {
  return frequencyHelperText[type] ?? '';
}

function onChangeFrequencyValue(newValue, setFrequencyValue) {
  if (newValue < 0) {
    return;
  }

  setFrequencyValue(newValue);
}
