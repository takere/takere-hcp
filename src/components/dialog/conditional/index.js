import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import SuccessButton from "../../buttons/SuccessButton";
import DefaultButton from "../../buttons/DefaultButton";
import { Header, Body, Footer } from "../";
import numberOperatorOptions from './number-operator.types.json';
import selectionOperatorOptions from './selection-operator.types.json';
import textOperatorOptions from './text-operator.types.json';
import ParameterInput from "../../../parts/input/ParameterInput";


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const ConditionalDialog = ({
  open,
  handleClose,
  node,
  onAddElementResultValue,
  connection
}) => {
  
  // const [options, setOptions] = useState([left, operator, right]);
  const [parameters, setParameters] = useState(parseParameters(node.data.parameters, [buildLeftOptions(connection), buildOperatorOptions(connection, 0), buildRightOptions(connection, 0)]));
  const [parameterValues, setParameterValues] = useState([0, 0, undefined]);

  // const [left, setLeft] = useState(loadStoredLeft(node, connection));
  // const [operator, setOperator] = useState(loadStoredOperator(node, connection));
  // const [right, setRight] = useState(loadStoredRight(node, connection));
  // const [leftOptions, setLeftOptions] = useState([]);
  // const [operatorOptions, setOperatorOptions] = useState([]);
  // const [rightOptions, setRightOptions] = useState([]);
  

  const saveInputs = () => {
    // const inputData = {
    //   left: left,
    //   operator: operatorOptions[operator].originalValue,
    //   right: rightOptions[right]?.label ?? right
    // };

    // onAddElementResultValue(node, inputData);
    toast.success(`Dados de ${node.data.name} salvos`);
    onAddElementResultValue(node, parameterValues);
  };

  const onSelectLeft = (index) => {
    //const newIndex = connection.data.results.questions.findIndex(quiz => quiz.question === operand)
    const left = index;
    const operator = 0;
    const right = '';
    const updatedParameters = [ left, operator, right ];
    const options = [
      parameters[0].options[index],
      buildOperatorOptions(connection, index),
      buildRightOptions(connection, index)
    ];

    setParameterValues(updatedParameters);
    setParameters(parseParameters(parameters, options));

    // setLeft(index);
    // setOperator(0);
    // setRight('');
    // setOperatorOptions(buildOperatorOptions(connection, index));
    // setRightOptions(buildRightOptions(connection, index));
  }

  const handleParameterChange = (newValue, parameterIndex) => {
    const updatedParameters = [ ...parameterValues ];

    updatedParameters[parameterIndex] = newValue;

    setParameterValues(updatedParameters);

    if (parameterIndex === 0) {
      onSelectLeft(parameterIndex);
    }
  }

  useEffect(() => {
    const options = [
      buildLeftOptions(connection), 
      buildOperatorOptions(connection, 0), 
      buildRightOptions(connection, 0)
    ];

    setParameters(parseParameters(node.data.parameters, options));

    // setLeftOptions(buildLeftOptions(connection));
    // setOperatorOptions(buildOperatorOptions(connection, 0));
    // setRightOptions(buildRightOptions(connection, 0));

    //console.log('c: ', connection)
  }, [connection]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <Header title={node.data.name} subtitle={node.data.description} />
      {connection &&
        <Body>
          {parameters.map((parameter, index) => (
            <ParameterInput 
              key={index}
              parameter={parameter}
              value={parameterValues[index]}
              onChange={(newValue) => handleParameterChange(newValue, index)}
            />
          ))}
          {/* <Styled.InputArea>
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
          </Styled.InputArea> */}
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


function parseParameters(parameters, options) {
  let parsedParameters = [];

  parameters.forEach((parameter, index) => {
    parsedParameters.push({ ...parameter, options: options[index] });
  })

  return parsedParameters;
}


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

  if (connection.data.slug === 'medication_control') {
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

  if (connection.data.slug === 'medication_control') {
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

  if (connection.data.slug === 'medication_control') {
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
