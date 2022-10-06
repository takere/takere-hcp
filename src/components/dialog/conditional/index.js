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
    toast.success(`Dados de ${node.data.name} salvos`);
    onAddElementResultValue(node, parameterValues);
  };

  const onSelectLeft = (index) => {
    const left = index;
    const operator = 0;
    const right = '';
    const updatedParameters = [ left, operator, right ];
    const options = [
      parameters[0].options,
      buildOperatorOptions(connection, index),
      buildRightOptions(connection, index)
    ];

    setParameterValues(updatedParameters);
    setParameters(parseParameters(parameters, options));
  }

  const handleParameterChange = (newValue, parameterIndex) => {
    const updatedParameters = [ ...parameterValues ];

    updatedParameters[parameterIndex] = newValue;

    setParameterValues(updatedParameters);

    if (parameterIndex === 0) {
      onSelectLeft(newValue);
    }
  }

  useEffect(() => {
    const options = [
      buildLeftOptions(connection), 
      buildOperatorOptions(connection, 0), 
      buildRightOptions(connection, 0)
    ];

    setParameters(parseParameters(node.data.parameters, options));

    if (node.data.arguments) {
      setParameterValues(node.data.arguments);
    }
    else {
      setParameterValues([0, 0, options[2]?.length > 0 ? 0 : '']);
    }
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
          {connection.data.arguments && connection.data.arguments.length > 0 && parameters.map((parameter, index) => (
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
    return [{ label: 'Medication', value: 'medication' }];
  }

  const options = [];
  const fields = connection.data.arguments?.find(arg => Array.isArray(arg));

  fields?.forEach((field, index) => {
    options.push({ label: field.label, value: index });
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

  const fields = connection.data.arguments?.find(arg => Array.isArray(arg));
  const field = fields[currentIndex];
  
  if (field.type === 'number') {
    options = buildOptions(numberOperatorOptions);
  }
  else if (['checkbox', 'radio', 'select'].includes(field.type)) {
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
    return [{ label: 'Taken', value: 'taken' }];
  }

  if (!connection.data.arguments) {
    return [];
  }

  const fields = connection.data.arguments?.find(arg => Array.isArray(arg));
  const form = fields[currentIndex];
  const options = [];
  
  form.options.forEach((option, index) => {
    options.push({ label: option, value: index });
  });


  return options;
}
