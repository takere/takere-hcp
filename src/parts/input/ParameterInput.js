import React, { useState } from "react";
import BooleanInput from "./BooleanInput";
import DateInput from "./DateInput";
import RawTextInput from "./RawTextInput";
import { Spacing } from "./styled";
import AccentButton from "../../components/buttons/AccentButton";
import MultiSelectionInput from "./MultiSelectionInput";
import NumberInput from "./NumberInput";
import DangerButton from "../../components/buttons/DangerButton";
import RichTextInput from "./RichTextInput";
import { EditorState, ContentState } from "draft-js";
import { convertFromHTML, convertToHTML } from "draft-convert";

const ParameterInput = ({parameter, value, onChange}) => {
  
  const [undefinedValue, setUndefinedValue] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromText("")));

  const onChangeUndefinedValue = (newValue) => {
    setUndefinedValue(newValue);
    onChange(null);
  }

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

  const onChangeEditorState = (newState) => {
    setEditorState(newState);
    onChange(convertToHTML(newState.getCurrentContent()));
  };

    switch (parameter.type) {
      case "date":
        if (parameter.required) {
          return (
            <DateInput
              label={parameter.name}
              helperText={parameter.description}
              value={value}
              onChange={onChange}
            />
          );
        }
        else {
          return (
            <>
              {!undefinedValue &&
                <DateInput
                  label={parameter.name}
                  helperText={parameter.description}
                  value={value}
                  onChange={onChange}
                />
              }
              <BooleanInput
                label="Is undefined?"
                helperText="Sets parameter as undefined"
                value={undefinedValue}
                onChange={onChangeUndefinedValue}
              />
            </>  
          );
        }
      case "text":
        return (
          <RawTextInput 
            label={parameter.name}
            helperText={parameter.description}
            value={value}
            onChange={onChange}
          />
        );
      case "rich_text":
        return (
          <RichTextInput
            label={parameter.name}
            value={editorState}
            onChange={onChangeEditorState}
          />
        );
      case "select|text":
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
      case "number":
        return (
          <NumberInput
            label={parameter.name}
            helperText={parameter.description}
            value={value}
            onChange={onChange}
          />
        );
      case "select":
        return (
          <MultiSelectionInput
            label={parameter.name}
            helperText={parameter.description}
            value={value}
            onChange={onChange}
            options={parameter.options}
          />
        );
        case "checkbox":
        case "radio": 
        case "form":
          return (
            <OptionInputBuilder
              options={value}
              onValueChange={handleFieldChange}
              handleRemoveOption={handleRemoveField}
              handleNewOption={handleNewField}
            />
          );
    }
  }

export default ParameterInput;

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
    {options.map((option, index) => (
      <div key={index}>
        <div style={{display: "flex", flexDirection: "row", alignItems: 'center'}}>
          <RawTextInput
            label={`Option ${index+1}`}
            helperText=""
            value={option.label}
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