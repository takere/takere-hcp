import React, { useEffect, useState } from "react";
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
  
  const [undefinedValue, setUndefinedValue] = useState(value === null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(loadPages(parameter, value));
  const [totalPages, setTotalPages] = useState(loadTotalPages(parameter, value));
  const [editorState, setEditorState] = useState(loadEditorContentFromLoadedPages(parameter, value));
  const [questions, setQuestions] = useState(loadQuestions(parameter, value));
  const [totalQuestions, setTotalQuestions] = useState(loadTotalQuestions(parameter, value));
  const [question, setQuestion] = useState(loadQuestion(parameter, value));
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answerType, setAnswerType] = useState(loadAnswerType(parameter, value));
  const [answerOptions, setAnswerOptions] = useState(loadAnswerOptions(parameter, value));
  const [selectNumber, setSelectNumber] = useState(loadSelectNumber(parameter, value));
  
  const onChangeUndefinedValue = (newValue) => {
    setUndefinedValue(newValue);
    onChange(newValue ? null : new Date().toISOString());
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
    setEditorState(pages[0].structure);
    onChange(convertPagesToHtml(newPages));
  };

  const onChangeCurrentPage = (rawValue) => {
    let newCurrentPage = parseInt(rawValue);

    if (isPageNumberOutOfBounds(newCurrentPage, totalPages)) {
      return;
    }

    setCurrentPage(newCurrentPage);
    setEditorState(pages[newCurrentPage - 1].structure);
  };

  const onChangeEditorState = (newState) => {
    setEditorState(newState);

    const updatedPages = pages;

    updatedPages[currentPage - 1] = newState;

    setPages(updatedPages);

    onChange(convertPagesToHtml(updatedPages));
  };

  const onTotalQuestionsChange = (rawValue) => {
    const value = parseInt(rawValue);

    if (value < 1) {
      return;
    }

    if (value > totalQuestions) {
      const updatedQuestions = questions;

      updatedQuestions.push(buildEmptyQuestion(parameter.options));
      
      setQuestions(updatedQuestions);
    }
    else if (value > 1) {
      setQuestions(questions.slice(0, value));
    }

    setTotalQuestions(value);
    setCurrentQuestion(1);
    setAnswerOptions(questions[0].options ?? []);
    setQuestion(questions[0].label);
    setAnswerType(questions[0].type);
  };

  const onCurrentQuestionChange = (rawValue) => {
    const value = parseInt(rawValue);

    if ((value < 1) || (value > totalQuestions)) {
      return;
    }

    setCurrentQuestion(value);
    setAnswerOptions(questions[value-1].options ?? []);
    setQuestion(questions[value-1].label);
    setAnswerType(questions[value-1].type);
  };

  const handleAnswerOptionChange = (newValue, index) => {
    const updatedAnswerOptions =  [...answerOptions];

    updatedAnswerOptions[index] = newValue;

    setAnswerOptions(updatedAnswerOptions);
  }

  const handleNewOption = () => {
    const updatedAnswerOptions =  [...answerOptions];

    updatedAnswerOptions.push('');

    setAnswerOptions(updatedAnswerOptions);
  }

  const handleRemoveOption = (answerIndex) => {
    const updatedAnswerOptions =  answerOptions.filter((_, index) => index !== answerIndex);

    setAnswerOptions(updatedAnswerOptions);
  }

  useEffect(() => {
    if (parameter.type === 'form') {
      const updatedQuestions = questions;
  
      updatedQuestions[currentQuestion-1] = {
        label: question,
        type: answerType, 
        options: answerOptions
      }
  
      setQuestions(updatedQuestions);
      onChange(updatedQuestions)
    }
    else if (parameter.type === 'select') {
      onChange(parameter.options[0].value);
    }
  }, [question, answerType, answerOptions, currentQuestion, questions]);

    switch (parameter.type) {
      case "date":
        if (parameter.required) {
          if (!value) {
            onChange(new Date())
          }

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
        case "select&number":
        if (!value) {
          onChange({ select: parameter.options[0].value, number: selectNumber });

          return <></>
        }
        return (
          <>
            <MultiSelectionInput
              label={parameter.name}
              helperText={parameter.description}
              value={value.select}
              onChange={newValue => onChange({ select: newValue, number: value.number })}
              options={parameter.options}
            />
            {parameter.options[value.select] && parameter.options[value.select]['request_input'] &&
              <NumberInput
                label={''}
                helperText={''}
                value={value.number}
                onChange={newValue => onChange({ select: value.select, number: newValue})}
              />
            }
          </>
        );
        case "checkbox":
        case "radio": 
          return (
            <OptionInputBuilder
              options={value}
              onValueChange={handleFieldChange}
              handleRemoveOption={handleRemoveField}
              handleNewOption={handleNewField}
            />
          );
        case "form":
          return (
            <>
              <NumberInput
                label="Total questions"
                helperText="How many questions?"
                value={totalQuestions}
                onChange={onTotalQuestionsChange}
              />
              <NumberInput
                label="Current question"
                helperText="You're editing question..."
                value={currentQuestion}
                onChange={onCurrentQuestionChange}
              />
              <RawTextInput
                label="Question"
                helperText="What's the question?"
                value={question}
                onChange={setQuestion}
              />
              <MultiSelectionInput
                label="Answer type"
                helperText="How do you expect the answer?"
                value={answerType}
                onChange={setAnswerType}
                options={parameter.options}
              />
              {hasAnswerOptions(answerType) &&
                <OptionInputBuilder 
                  handleNewOption={handleNewOption}
                  options={answerOptions}
                  onValueChange={handleAnswerOptionChange}
                  handleRemoveOption={handleRemoveOption}
                />
              }
            </>
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

function loadPages(parameter, value) {
  if (!value || value.length === 0 || parameter.type !== 'book') {
    return [];
  }

  return value;
}

function loadTotalPages(parameter, value) {
  if (!value || value.length === 0 || parameter.type !== 'book') {
    return 1;
  }

  return value.length;
}

function loadEditorContentFromLoadedPages(parameter, value) {
  if (!value || value.length === 0 || parameter.type !== 'book') {
    return EditorState.createWithContent(ContentState.createFromText(""));
  }

  return EditorState.createWithContent(convertFromHTML(value[0].structure));
}

function loadQuestions(parameter, value) {
  if (parameter.type !== 'form') {
    return [];
  }

  if (!value || value.length === 0) {
    return [buildEmptyQuestion(parameter.options)];
  }

  return value;
}

function loadTotalQuestions(parameter, value) {
  if (!value || value.length === 0 || parameter.type !== 'form') {
    return 1;
  }

  return value.length;
}

function loadQuestion(parameter, value) {
  if (!value || value.length === 0 || parameter.type !== 'form') {
    return '';
  }

  return value[0].label;
}

function loadAnswerType(parameter, value) {
  if (!value || value.length === 0 || parameter.type !== 'form') {
    return 'text';
  }

  return value[0].type;
}

function loadAnswerOptions(parameter, value) {
  if (!value || value.length === 0 || parameter.type !== 'form') {
    return [];
  }

  return value[0].options;
}

function loadSelectNumber(parameter, value) {
  if (!value || value.number === undefined || parameter.type !== 'select&number') {
    return 0;
  }

  return value.number;
}

function buildEmptyQuestion(answerTypes) {
  if (!answerTypes) {
    return {}
  }
  
  return { 
    label: '', 
    type: answerTypes[0].value, 
    options: []
  };
}

function hasAnswerOptions(type) {
  return ['checkbox', 'radio', 'select'].includes(type);
}

function convertPagesToHtml(pages) {
  const parsedPages = [];

  pages.forEach((page) => {
    parsedPages.push({structure: convertToHTML(page.getCurrentContent()), style: null});
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