import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import { inputFactory } from "../../input";
import SuccessButton from "../../buttons/SuccessButton";
import DefaultButton from "../../buttons/DefaultButton";
import { Header, Body, Footer } from "../";


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const answerTypeOptions = [
  {
    value: "number",
    label: "Numeric",
  },
  {
    value: "text",
    label: "Single line text",
  },
  {
    value: "checkbox",
    label: "Checkbox",
  },
  {
    value: "radio",
    label: "Radio",
  },
  {
    value: "text-area",
    label: "Multiple line text",
  },
];

const frequencyTypeOptions = [
  {
    value: "daily",
    label: "Daily",
  },
  {
    value: "everyHours",
    label: "Every x hours",
  },
  {
    value: "weekly",
    label: "Weekly",
  },
  {
    value: "everyDays",
    label: "Every x days",
  },
];

export const QuizDialog = ({
  open,
  handleClose,
  data,
  onAddElementResultValue,
}) => {
  const { data: payloadData } = data;

  const [dataForm, setDataForm] = useState(loadStoredFields(data));
  const [totalQuestions, setTotalQuestions] = useState(
    loadStoredTotalQuestions(data)
  );
  const [questions, setQuestions] = useState([{ question: '', answerType: 'number', frequency: 'daily' }]);
  const [question, setQuestion] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answerType, setAnswerType] = useState("");
  const [frequency, setFrequency] = useState("");

  const saveInputs = () => {

    console.log(questions);
  };

  const onTotalQuestionsChange = (event) => {
    const value = parseInt(event.target.value);

    if (value < 1) {
      return;
    }

    if (value > totalQuestions) {
      const updatedQuestions = questions;

      updatedQuestions.push({ question: '', answerType: 'number', frequency: 'daily' });
      
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
  if (!data || !data.data || !data.data.results) {
    return {};
  }

  return data.data.results;
}

function loadStoredTotalQuestions(data) {
  if (
    !data ||
    !data.data ||
    !data.data.results ||
    !data.data.results.questions
  ) {
    return 1;
  }

  return data.data.results.questions;
}
