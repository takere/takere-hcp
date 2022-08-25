import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import SuccessButton from "../../buttons/SuccessButton";
import DefaultButton from "../../buttons/DefaultButton";
import { Header, Body, Footer } from "../";
import numberOperatorOptions from './number-operator.types.json';
import selectionOperatorOptions from './selection-operator.types.json';
import textOperatorOptions from './text-operator.types.json';
import RawTextInput from "../../../parts/input/RawTextInput";
import MultiSelectionInput from "../../../parts/input/MultiSelectionInput";
import * as Styled from './styled';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const ConditionalDialog = ({
  open,
  handleClose,
  data,
  onAddElementResultValue,
  connection
}) => {
  const { data: payloadData } = data;

  const [left, setLeft] = useState(loadStoredLeft(data, connection));
  const [operator, setOperator] = useState(loadStoredOperator(data, connection));
  const [right, setRight] = useState(loadStoredRight(data, connection));
  const [leftOptions, setLeftOptions] = useState([]);
  const [operatorOptions, setOperatorOptions] = useState([]);
  const [rightOptions, setRightOptions] = useState([]);

  const saveInputs = () => {
    const inputData = {
      left: left,
      operator: operatorOptions[operator].originalValue,
      right: rightOptions[right]?.label ?? right
    };

    onAddElementResultValue(data, inputData);
    toast.success(`Dados de ${payloadData.label} salvos`);
  };

  const onSelectLeft = (index) => {
    //const newIndex = connection.data.results.questions.findIndex(quiz => quiz.question === operand)

    setLeft(index);
    setOperator(0);
    setRight('');
    setOperatorOptions(buildOperatorOptions(connection, index));
    setRightOptions(buildRightOptions(connection, index));
  }

  useEffect(() => {
    setLeftOptions(buildLeftOptions(connection));
    setOperatorOptions(buildOperatorOptions(connection, 0));
    setRightOptions(buildRightOptions(connection, 0));

    console.log('c: ', connection)
  }, [connection]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <Header title={payloadData.label} subtitle={payloadData.description} />
      {connection &&
        <Body>
          <Styled.InputArea>
            <MultiSelectionInput
              label="Left"
              helperText="Left operand"
              value={left}
              onChange={onSelectLeft}
              options={leftOptions}
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
        </Body>
      }
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

function loadStoredLeft(data, connection) {
  if (!connection) {
    return 0;
  }

  if (!hasResults(data) || !data.data.results.left) {
    return 0;
  }

  return data.data.results.left;
}

function loadStoredOperator(data, connection) {
  if (!connection) {
    return 0;
  }

  if (!hasResults(data) || !data.data.results.operator) {
    return 0;
  }

  return data.data.results.operator;
}

function loadStoredRight(data, connection) {
  if (!connection) {
    return '';
  }

  if (!hasResults(data) || !data.data.results.right) {
    return buildRightOptions(connection, 0);
  }

  return data.data.results.right;
}

function buildLeftOptions(connection) {
  if (!connection) {
    return [];
  }

  if (connection.type === 'MEDICATION_CONTROL_NODE') {
    return [{ label: 'Medication', value: 0 }];
  }

  const options = [];

  connection.data.results.questions?.forEach((quiz, index) => {
    options.push({ label: quiz.question, value: index });
  });

  return options;
}

function buildOperatorOptions(connection, currentIndex) {
  if (!connection) {
    return [];
  }

  let options = [];

  if (connection.type === 'MEDICATION_CONTROL_NODE') {
    return buildOptions(selectionOperatorOptions);;
  }

  if (!connection.data.results) {
    return [];
  }
  
  const quiz = connection.data.results.questions[currentIndex];
  
  if (quiz.answer.type === 'number') {
    options = buildOptions(numberOperatorOptions);
  }
  else if (quiz.answer.type === 'checkbox') {
    options = buildOptions(selectionOperatorOptions);
  }
  else {
    options = buildOptions(textOperatorOptions);
  }

  return options;
}

function buildOptions(optionList) {
  let options = [];

  optionList.forEach((option, index) => {
    options.push({ label: option.label, value: index, originalValue: option.value });
  });

  return options;
}

function buildRightOptions(connection, currentIndex) {
  if (!connection) {
    return [];
  }

  if (connection.type === 'MEDICATION_CONTROL_NODE') {
    return [{ label: 'Taken', value: 0 }];
  }

  if (!connection.data.results) {
    return [];
  }

  const answer = connection.data.results.questions[currentIndex].answer;
  const options = [];
  
  answer.options.forEach((option, index) => {
    options.push({ label: option, value: index });
  });

  return options;
}
