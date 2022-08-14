import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import SuccessButton from "../../buttons/SuccessButton";
import DefaultButton from "../../buttons/DefaultButton";
import { Header, Body, Footer } from "../";
import numberOperatorOptions from './number-operator.types.json';
import selectionOperatorOptions from './selection-operator.types.json';
import textOperatorOptions from './text-operator.types.json';
import RawTextInput from "../../input/RawTextInput";
import MultiSelectionInput from "../../input/MultiSelectionInput";


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const ConditionalDialog = ({
  open,
  handleClose,
  data,
  onAddElementResultValue,
  connections
}) => {
  const { data: payloadData } = data;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [left, setLeft] = useState(loadStoredLeft(data, connections));
  const [operator, setOperator] = useState(loadStoredOperator(data, connections));
  const [right, setRight] = useState(loadStoredRight(data, connections));

  console.log(connections)

  const saveInputs = () => {
    const inputData = {
      left,
      operator,
      right
    };

    onAddElementResultValue(data, inputData);
    toast.success(`Dados de ${payloadData.label} salvos`);
  };

  const onSelectLeft = (operand, index) => {
    setLeft(operand);
    setCurrentIndex(index);
  }

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
        {connections.map((connection, index) => (
          <div key={index}>
            <MultiSelectionInput
              label="Left"
              helperText="Left operand"
              value={left}
              onChange={(operand) => onSelectLeft(operand, index)}
              options={buildLeftOptions(connection)}
            />
            <MultiSelectionInput
              label="Operator"
              helperText="Operator that will be applied in the left and right terms"
              value={operator}
              onChange={setOperator}
              options={buildOperatorOptions(connection, currentIndex)}
            />
            <MultiSelectionInput
              label="Right"
              helperText="Right operand"
              value={right}
              onChange={setRight}
              options={buildRightOptions(connection, currentIndex)}
            />
          </div>
        ))}
      </Body>
      <Footer>
        <SuccessButton title="Save" onClick={saveInputs} />
        <DefaultButton title="Close" onClick={handleClose} />
      </Footer>
    </Dialog>
  );
};

export default ConditionalDialog;


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function hasResults(data) {
  return  data
          && data.data 
          && data.data.results;
}

function loadStoredLeft(data, connections) {
  if (!hasResults(data) || !data.data.results.left) {
    return '';
  }

  return data.data.results.left;
}

function loadStoredOperator(data, connections) {
  if (!hasResults(data) || !data.data.results.operator) {
    return '';
  }

  return data.data.results.operator;
}

function loadStoredRight(data, connections) {
  if (!hasResults(data) || !data.data.results.right) {
    return '';
  }

  return data.data.results.right;
}

function buildLeftOptions(connection) {
  if (!connection) {
    return [];
  }

  if (connection.type === 'MEDICATION_CONTROL_NODE') {
    return [{ label: 'Medication', value: 'medication' }];
  }

  const options = [];

  connection.data.results.forEach(quiz => {
    options.push({ label: quiz.question, value: quiz.question });
  });

  return options;
}

function buildOperatorOptions(connection, currentIndex) {
  if (!connection) {
    return [];
  }

  if (connection.type === 'MEDICATION_CONTROL_NODE') {
    return selectionOperatorOptions;
  }

  let options = [];
  const currentResult = connection.data.results[currentIndex];
  
  if (currentResult.answerType === 'number') {
    options = numberOperatorOptions;
  }
  else if (currentResult.answerType === 'checkbox') {
    options = selectionOperatorOptions;
  }
  else {
    options = textOperatorOptions;
  }

  return options;
}

function buildRightOptions(connection, currentIndex) {
  if (!connection) {
    return [];
  }

  if (connection.type === 'MEDICATION_CONTROL_NODE') {
    return [{ label: 'Taken', value: 'taken' }];
  }

  if (!connection.data.results[currentIndex].answerOptions) {
    return [];
  }

  return connection.data.results[currentIndex].answerOptions;
}
