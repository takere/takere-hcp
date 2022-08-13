import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import { inputFactory } from "../../input";
import SuccessButton from "../../buttons/SuccessButton";
import DefaultButton from "../../buttons/DefaultButton";
import { Header, Body, Footer } from "../";
import frequencyTypeOptions from './frequency.type.json';
import answerTypeOptions from './answer.type.json';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
export const QuizDialog = ({
  open,
  handleClose,
  data,
  onAddElementResultValue,
}) => {
  const { data: payloadData } = data;

  const [totalQuestions, setTotalQuestions] = useState(loadStoredTotalQuestions(data));
  const [questions, setQuestions] = useState(loadStoredQuestions(data));
  const [question, setQuestion] = useState(loadStoredQuestion(data));
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answerType, setAnswerType] = useState(loadStoredAnswerType(data));
  const [frequency, setFrequency] = useState(loadStoredFrequency(data));

  const saveInputs = () => {
    onAddElementResultValue(data, questions);
    toast.success(`Dados de ${payloadData.label} salvos`);
  };

  const onTotalQuestionsChange = (event) => {
    const value = parseInt(event.target.value);

    if (value < 1) {
      return;
    }

    if (value > totalQuestions) {
      const updatedQuestions = questions;

      updatedQuestions.push(buildEmptyQuestion());
      
      setQuestions(updatedQuestions);
    }
    else if (value > 1) {
      setQuestions(questions.slice(0, value));
    }

    setTotalQuestions(value);
  };

  const onCurrentQuestionChange = (event) => {
    const value = parseInt(event.target.value);

    if ((value < 1) || (value > totalQuestions)) {
      return;
    }

    setCurrentQuestion(value);
  };

  const onQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const onAnswerTypeChange = (event) => {
    setAnswerType(event.target.value);
  };

  const onFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };

  useEffect(() => {
    setCurrentQuestion(1);
  }, [totalQuestions]);

  useEffect(() => {
    const updatedQuestions = questions;

    updatedQuestions[currentQuestion-1] = {
      question,
      answerType,
      frequency
    }

    setQuestions(updatedQuestions);
  }, [question, answerType, frequency]);

  useEffect(() => {
    setQuestion(questions[currentQuestion-1].question);
    setAnswerType(questions[currentQuestion-1].answerType);
    setFrequency(questions[currentQuestion-1].frequency);
  }, [currentQuestion]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <Header title={payloadData.label} subtitle={payloadData.description} />
      <Body>
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
          onChange={onQuestionChange}
        />
        <MultiSelectionInput
          label="Answer type"
          helperText="How do you expect the answer?"
          value={answerType}
          onChange={onAnswerTypeChange}
          options={answerTypeOptions}
        />
        <MultiSelectionInput
          label="Frequency"
          helperText="How often this treatment should be performed?"
          value={frequency}
          onChange={onFrequencyChange}
          options={frequencyTypeOptions}
        />
      </Body>
      <Footer>
        <SuccessButton title="Salvar" onClick={saveInputs} />
        <DefaultButton title="Fechar" onClick={handleClose} />
      </Footer>
    </Dialog>
  );
};

const NumberInput = ({ label, helperText, value, onChange }) =>
  inputFactory("NUMBER_INPUT", {
    label,
    value,
    helperText,
    onChange,
  });

const RawTextInput = ({ label, helperText, value, onChange }) =>
  inputFactory("RAW_TEXT_INPUT", {
    label,
    value,
    helperText,
    onChange,
  });

const MultiSelectionInput = ({ label, helperText, value, onChange, options }) =>
  inputFactory("MULTI_SELECTION_INPUT", {
    label,
    value,
    helperText,
    onChange,
    options,
  });


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function loadStoredFields(data) {
  if (!hasResults(data)) {
    return {};
  }

  return data.data.results;
}

function hasResults(data) {
  return  data
          && data.data 
          && data.data.results;
}

function loadStoredTotalQuestions(data) {
  if (!hasResults(data) || !hasQuestions(data)) {
    return 1;
  }

  return data.data.results.questions.length;
}

function hasQuestions(data) {
  return data.data.results.questions;
}

function loadStoredQuestions(data) {
  if (!hasResults(data) || !hasQuestions(data)) {
    return [buildEmptyQuestion()];
  }

  return data.data.results.questions;
}

function buildEmptyQuestion() {
  return { 
    question: '', 
    answerType: answerTypeOptions[0].value, 
    frequency: frequencyTypeOptions[0].value
  };
}

function loadStoredQuestion(data) {
  if (!hasResults(data) || !hasQuestions(data)) {
    return '';
  }

  return data.data.results.questions[0].question;
}

function loadStoredAnswerType(data) {
  if (!hasResults(data) || !hasQuestions(data)) {
    return '';
  }

  return data.data.results.questions[0].answerType;
}

function loadStoredFrequency(data) {
  if (!hasResults(data) || !hasQuestions(data)) {
    return '';
  }

  return data.data.results.questions[0].frequency;
}
