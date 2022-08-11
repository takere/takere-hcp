import React from 'react';
import BooleanInput from "./BooleanInput";
import DateInput from "./DateInput";
import MultiSelectionInput from "./MultiSelectionInput";
import NumberInput from "./NumberInput";
import RawTextInput from "./RawTextInput";
import RichTextInput from "./RichTextInput";

const mapping = {
  BOOLEAN_INPUT: BooleanInput,
  DATE_INPUT: DateInput,
  MULTI_SELECTION_INPUT: MultiSelectionInput,
  MULTI_SELECT: MultiSelectionInput,
  NUMBER_INPUT: NumberInput,
  RAW_TEXT_INPUT: RawTextInput,
  RICH_TEXT_INPUT: RichTextInput
};

export default mapping;

export function inputFactory(type, data) {
  
  if (mapping[type] === undefined) {
    return (<RawTextInput { ...data } />);  
  }

  return React.createElement(mapping[type], { ...data });
}
