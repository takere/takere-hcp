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
  
  const [parameters, setParameters] = useState(parseParameters(node.data.parameters, [buildLeftOptions(connection), buildOperatorOptions(connection, 0), buildRightOptions(connection, 0)]));
  const [parameterValues, setParameterValues] = useState([0, 0, undefined]);

  const saveInputs = () => {
    // const inputData = {
    //   left: left,
    //   operator: operatorOptions[operator].originalValue,
    //   right: rightOptions[right]?.label ?? right
    // };

    // onAddElementResultValue(node, inputData);
    toast.success(`Dados de ${node.data.name} salvos`);
    onAddElementResultValue(node, parameterValues);

    console.log(parameterValues)
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
    setParameterValues([0, 0, options[2]?.length > 0 ? 0 : '']);

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
          {node.data.arguments && node.data.arguments.length > 0 && parameters.map((parameter, index) => (
            <ParameterInput 
              key={index}
              parameter={parameter}
              value={parameterValues[index]}
              onChange={(newValue) => handleParameterChange(newValue, index)}
            />
          ))}
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
function buildLeftOptions(connection) {
  if (!connection) {
    return [];
  }

  if (connection.data.slug === 'medication_control') {
    return [{ label: 'Medication', value: 0 }];
  }

  const options = [];

  connection.data.arguments?.forEach((arg, index) => {
    options.push({ label: arg, value: index });
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

  if (!connection.data.arguments) {
    return [];
  }
  
  const parameter = connection.data.parameters[currentIndex];
  
  if (parameter.type === 'number') {
    options = buildOptions(numberOperatorOptions);
  }
  else if (parameter.type === 'checkbox') {
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

  if (!connection.data.arguments || !connection.data.arguments[currentIndex]) {
    return [];
  }

  const form = connection.data.arguments[currentIndex];
  const options = [];
  
  form.options.forEach((option, index) => {
    options.push({ label: option, value: index });
  });

  return options;
}
