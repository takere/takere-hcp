import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import SuccessButton from "../../buttons/SuccessButton";
import DefaultButton from "../../buttons/DefaultButton";
import { Header, Body, Footer } from "../";
import ParameterInput from "../../../parts/input/ParameterInput";


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const GenericDialog = ({ open, handleClose, node, onAddElementResultValue }) => {
  const [parameters, setParameters] = useState(node.data.parameters);
  const [parameterValues, setParameterValues] = useState(initializeParameterValues(node.data.parameters));

  const saveInputs = () => {
    onAddElementResultValue(node, parameterValues);
    toast.success(`Dados de ${node.data.name} salvos`);
    
  };

  const handleParameterChange = (newValue, parameterIndex) => {
    const updatedParameters = [ ...parameterValues ];

    updatedParameters[parameterIndex] = newValue;

    setParameterValues(updatedParameters);
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <Header title={node.data.name} subtitle={node.data.description} />
      <Body>
        {node.data.parameters.map((parameter, index) => (
          <ParameterInput 
            key={index}
            parameter={parameter}
            value={parameterValues[index]}
            onChange={(newValue) => handleParameterChange(newValue, index)}
          />
        ))}
      </Body>
      <Footer>
        <SuccessButton title="Save" onClick={saveInputs} />
        <DefaultButton title="Close" onClick={handleClose} />
      </Footer>
    </Dialog>
  );
};

export default GenericDialog;


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function initializeParameterValues(parameters) {
  let initializedValues = [];

  parameters.forEach(parameter => {
    initializedValues.push(initializeParameter(parameter));
  })

  return initializedValues;
}

function initializeParameter(parameter) {
  switch (parameter.type) {
    case 'date':
      return new Date();
    case 'text':
    case 'rich_text':
    case 'radio':
    case 'checkbox':
    case 'select':
      return '';
    case 'number':
      return 0;
    case 'form':
      return []
    case 'boolean':
      return false;
    default:
      return null;
  }
}

function loadStoredStartDate(data) {
  if (
    !data ||
    !data.data ||
    !data.data.results ||
    !data.data.results.startDate
  ) {
    return new Date();
  }

  return data.data.results.startDate;
}

function loadStoredEndDate(data) {
  if (!data || !data.data || !data.data.results || !data.data.results.endDate) {
    return new Date();
  }

  return data.data.results.endDate;
}

function loadStoredUndefinedEnd(data) {
  if (
    !data ||
    !data.data ||
    !data.data.results ||
    !data.data.results.undefinedEnd
  ) {
    return false;
  }

  return data.data.results.undefinedEnd;
}
