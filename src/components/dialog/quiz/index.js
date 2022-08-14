import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import SuccessButton from "../../buttons/SuccessButton";
import DefaultButton from "../../buttons/DefaultButton";
import { Header, Body, Footer } from "../";
import frequencyTypeOptions from './frequency.type.json';
import answerTypeOptions from './answer.type.json';
import RawTextInput from "../../input/RawTextInput";
import MultiSelectionInput from "../../input/MultiSelectionInput";
import NumberInput from "../../input/NumberInput";


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
const QuizDialog = ({
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
  const [frequencyType, setFrequencyType] = useState(loadStoredFrequencyType(data));
  const [frequencyValue, setFrequencyValue] = useState(loadStoredFrequencyValue(data));

  const saveInputs = () => {
    onAddElementResultValue(data, questions);
    toast.success(`Dados de ${payloadData.label} salvos`);
  };

  const onTotalQuestionsChange = (rawValue) => {
    const value = parseInt(rawValue);

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

  const onCurrentQuestionChange = (rawValue) => {
    const value = parseInt(rawValue);

    if ((value < 1) || (value > totalQuestions)) {
      return;
    }

    setCurrentQuestion(value);
  };

  useEffect(() => {
    setCurrentQuestion(1);
  }, [totalQuestions]);

  useEffect(() => {
    const updatedQuestions = questions;

    updatedQuestions[currentQuestion-1] = {
      question,
      answerType,
      frequency: { type: frequencyType, value: frequencyValue },
    }

    setQuestions(updatedQuestions);
  }, [question, answerType, frequencyType, frequencyValue]);

  useEffect(() => {
    setQuestion(questions[currentQuestion-1].question);
    setAnswerType(questions[currentQuestion-1].answerType);
    setFrequencyType(questions[currentQuestion-1].frequency.type);
    setFrequencyValue(questions[currentQuestion-1].frequency.value);
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
          onChange={setQuestion}
        />
        <MultiSelectionInput
          label="Answer type"
          helperText="How do you expect the answer?"
          value={answerType}
          onChange={setAnswerType}
          options={answerTypeOptions}
        />
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
            onChange={setFrequencyValue}
          />
        }
      </Body>
      <Footer>
        <SuccessButton title="Salvar" onClick={saveInputs} />
        <DefaultButton title="Fechar" onClick={handleClose} />
      </Footer>
    </Dialog>
  );
};

export default QuizDialog;


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
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
    frequency: { type: frequencyTypeOptions[0].value, value: frequencyTypeOptions[0].value }
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

function loadStoredFrequencyType(data) {
  if (!hasResults(data) || !hasQuestions(data)) {
    return frequencyTypeOptions[0].value;
  }

  return data.data.results.questions[0].frequency.type;
}

function loadStoredFrequencyValue(data) {
  if (!hasResults(data) || !hasQuestions(data)) {
    return frequencyTypeOptions[0].value;
  }

  return data.data.results.questions[0].frequency.value;
}

function hasFrequencyTypeSomeValue(type) {
  return (type !== 'daily');
}

function generateHelperTextForFrequency(type) {
  return frequencyHelperText[type];
}