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
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);

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

  const onTotalPagesChange = (rawValue) => {
    let newTotalPages = parseInt(rawValue);

    if (newTotalPages <= 0) {
      return;
    }

    const newPages = updatePagesBasedOnTotalPages(newTotalPages, totalPages, pages);

    setTotalPages(newTotalPages);
    setCurrentPage(1);
    setPages(newPages);
    setEditorState(pages[0]);
    onChange(convertPagesToHtml(newPages));
  };

  const onChangeCurrentPage = (rawValue) => {
    let newCurrentPage = parseInt(rawValue);

    if (isPageNumberOutOfBounds(newCurrentPage, totalPages)) {
      return;
    }

    setCurrentPage(newCurrentPage);
    setEditorState(pages[newCurrentPage - 1]);
  };

  const onChangeEditorState = (newState) => {
    setEditorState(newState);

    const updatedPages = pages;

    updatedPages[currentPage - 1] = newState;

    setPages(updatedPages);

    onChange(convertPagesToHtml(updatedPages));
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
      case "book":
        return (
          <>
            <NumberInput
              label="Total pages"
              helperText="Explanation total pages"
              value={totalPages}
              onChange={onTotalPagesChange}
            />
            <NumberInput
              label="Current page"
              helperText="Page to be edited"
              value={currentPage}
              onChange={onChangeCurrentPage}
            />
            <RichTextInput
              label={parameter.name}
              value={editorState}
              onChange={onChangeEditorState}
            />
          </>
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

function convertPagesToHtml(pages) {
  const parsedPages = [];

  pages.forEach((page) => {
    parsedPages.push(convertToHTML(page.getCurrentContent()));
  });

  return parsedPages;
}


function updatePagesBasedOnTotalPages(newTotalPages, oldTotalPages, pages) {
  let updatedPages = pages;

  if (newTotalPages > oldTotalPages) {
    let totalNewPages = newTotalPages - oldTotalPages;

    for (let i = 0; i < totalNewPages; i++) {
      updatedPages.push(EditorState.createWithContent(ContentState.createFromText("")));
    }
  } else if (newTotalPages > 1) {
    updatedPages = updatedPages.slice(0, newTotalPages);
  }

  return updatedPages;
}

function isPageNumberOutOfBounds(value, total) {
  return value <= 0 || value > total;
}