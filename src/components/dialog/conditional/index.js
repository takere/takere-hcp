import React, { useState, useEffect } from "react";
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
import * as Styled from './styled';


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
  const [operatorOptions, setOperatorOptions] = useState([]);
  const [rightOptions, setRightOptions] = useState([]);

  const saveInputs = () => {
    const inputData = {
      left,
      operator,
      right
    };

    onAddElementResultValue(data, inputData);
    toast.success(`Dados de ${payloadData.label} salvos`);
  };

  const onSelectLeft = (operand, connection) => {
    const newIndex = connection.data.results.findIndex(quiz => quiz.question === operand)

    setLeft(operand);
    setCurrentIndex(newIndex);
    setOperatorOptions(buildOperatorOptions(connection, newIndex));
    setRightOptions(buildRightOptions(connection, newIndex));
  }

  useEffect(() => {
    setOperatorOptions(buildOperatorOptions(connections[0], 0));
    setRightOptions(buildRightOptions(connections[0], 0));
  }, []);

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
          <Styled.InputArea key={index}>
            <MultiSelectionInput
              label="Left"
              helperText="Left operand"
              value={left}
              onChange={(operand) => onSelectLeft(operand, connection)}
              options={buildLeftOptions(connection)}
            />
            <MultiSelectionInput
              label="Operator"
              helperText="Operator that will be applied in the left and right terms"
              value={operator}
              onChange={setOperator}
              options={operatorOptions}
            />
            {rightOptions.length === 0 
            ? 
              <RawTextInput 
                label="Right"
                helperText="Right operand"
                value={right}
                onChange={setRight}
              />
            :
              <MultiSelectionInput
                label="Right"
                helperText="Right operand"
                value={right}
                onChange={setRight}
                options={rightOptions}
              />
            }
          </Styled.InputArea>
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

  connection.data.results?.forEach(quiz => {
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

  if (!connection.data.results) {
    return [];
  }

  let options = [];
  const quiz = connection.data.results[currentIndex];
  
  if (quiz.answer.type === 'number') {
    options = numberOperatorOptions;
  }
  else if (quiz.answer.type === 'checkbox') {
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

  if (!connection.data.results) {
    return [];
  }

  const answer = connection.data.results[currentIndex].answer;
  const options = [];
  
  for (let option of answer.options) {
    options.push({ label: option, value: option });
  }

  return options;
}
