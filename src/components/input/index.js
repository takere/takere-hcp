import React from 'react';
import BooleanInput from "./BooleanInput";
import DateInput from "./DateInput";
import MultiSelectionInput from "./MultiSelectionInput";
import NumberInput from "./NumberInput";
import RawTextInput from "./RawTextInput";
import RichTextInput from "./RichTextInput";

const mapping = {
  BooleanInput: BooleanInput,
  DateInput: DateInput,
  MultiSelectionInput: MultiSelectionInput,
  Multiselect: MultiSelectionInput,
  NumberInput: NumberInput,
  RawTextInput: RawTextInput,
  RichTextInput: RichTextInput
};

export default mapping;

export function inputFactory(type, data) {
  
  if (mapping[normalizeType(type)] === undefined) {
    return (<RawTextInput { ...data } />);  
  }

  return React.createElement(mapping[normalizeType(type)], { ...data });
}

function normalizeType(type) {
  return type
    .toLowerCase()
    .split("_")
    .map(term => capitalize(term))
    .join()
    .replaceAll(",", "")
}

function capitalize(str) {
  if (str.length === 0) {
    return str.toUpperCase();
  }

  return (str.charAt(0).toUpperCase() + str.slice(1));
}