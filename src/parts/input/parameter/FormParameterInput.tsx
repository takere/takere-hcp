/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from "react";
import RawTextInput from "../RawTextInput";
import MultiSelectionInput from "../MultiSelectionInput";
import NumberInput from "../NumberInput";
import LocaleService from "../../../services/locale.service";
import OptionInputBuilder from "../OptionInputBuilder";
import Parameter from "../../../models/parameter/parameter.model";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const FormParameterInput = ({ parameter, value, onChange }: any) => {
  
  const [questions, setQuestions] = useState(loadQuestions(parameter, value));
  const [totalQuestions, setTotalQuestions] = useState(loadTotalQuestions(parameter, value));
  const [question, setQuestion] = useState(loadQuestion(parameter, value));
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answerType, setAnswerType] = useState(loadAnswerType(parameter, value));
  const [answerOptions, setAnswerOptions] = useState(loadAnswerOptions(parameter, value));
  
  const localeService = new LocaleService();

  const onTotalQuestionsChange = (rawValue: any) => {
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

  const onCurrentQuestionChange = (rawValue: any) => {
    const value = parseInt(rawValue);

    if ((value < 1) || (value > totalQuestions)) {
      return;
    }

    setCurrentQuestion(value);
    setAnswerOptions(questions[value-1].options ?? []);
    setQuestion(questions[value-1].label);
    setAnswerType(questions[value-1].type);
  };

  const handleAnswerOptionChange = (newValue: any, index: number) => {
    const updatedAnswerOptions =  [...answerOptions];

    updatedAnswerOptions[index] = newValue;

    setAnswerOptions(updatedAnswerOptions);
  }

  const handleNewOption = () => {
    const updatedAnswerOptions =  [...answerOptions];

    updatedAnswerOptions.push('');

    setAnswerOptions(updatedAnswerOptions);
  }

  const handleRemoveOption = (answerIndex: number) => {
    const updatedAnswerOptions =  answerOptions.filter((_: any, index: number) => index !== answerIndex);

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
  }, [question, answerType, answerOptions, currentQuestion, questions]);

  return (
    <>
      <NumberInput
        label={localeService.translate("TOTAL_QUESTIONS")}
        helperText={localeService.translate("TOTAL_QUESTIONS_DESCRIPTION")}
        value={totalQuestions}
        onChange={onTotalQuestionsChange}
      />
      <NumberInput
        label={localeService.translate("CURRENT_QUESTION")}
        helperText={localeService.translate("CURRENT_QUESTION_DESCRIPTION")}
        value={currentQuestion}
        onChange={onCurrentQuestionChange}
      />
      <RawTextInput
        label={localeService.translate("QUESTION")}
        helperText={localeService.translate("QUESTION_DESCRIPTION")}
        value={question}
        onChange={setQuestion}
      />
      <MultiSelectionInput
        label={localeService.translate("ANSWER")}
        helperText={localeService.translate("ANSWER_DESCRIPTION")}
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

export default FormParameterInput;


// ----------------------------------------------------------------------------
//         Functions
// ----------------------------------------------------------------------------
function loadQuestions(parameter: Parameter, value: any) {
  if (parameter.type !== 'form') {
    return [];
  }

  if (!value || value.length === 0) {
    return [buildEmptyQuestion(parameter.options)];
  }

  return value;
}

function loadTotalQuestions(parameter: Parameter, value: any) {
  if (!value || value.length === 0 || parameter.type !== 'form') {
    return 1;
  }

  return value.length;
}

function loadQuestion(parameter: Parameter, value: any) {
  if (!value || value.length === 0 || parameter.type !== 'form') {
    return '';
  }

  return value[0].label;
}

function loadAnswerType(parameter: Parameter, value: any) {
  if (!value || value.length === 0 || parameter.type !== 'form') {
    return 'text';
  }

  return value[0].type;
}

function loadAnswerOptions(parameter: Parameter, value: any) {
  if (!value || value.length === 0 || parameter.type !== 'form') {
    return [];
  }

  return value[0].options;
}

function buildEmptyQuestion(answerTypes: any) {
  if (!answerTypes) {
    return {}
  }
  
  return { 
    label: '', 
    type: answerTypes[0].value, 
    options: []
  };
}

function hasAnswerOptions(type: string) {
  return ['checkbox', 'radio', 'select'].includes(type);
}
