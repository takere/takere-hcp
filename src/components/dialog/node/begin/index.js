import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import SuccessButton from "../../buttons/SuccessButton";
import DefaultButton from "../../buttons/DefaultButton";
import { Header, Body, Footer } from "../patient";
import ParameterInput from "../../../parts/input/ParameterInput";
import LocaleService from "../../../services/locale.service";


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const BeginDialog = ({ open, handleClose, node, onAddElementResultValue }) => {
  const [parameterValues, setParameterValues] = useState(initializeParameterValues(node.data));
  const localeService = new LocaleService();

  const saveInputs = () => {
    onAddElementResultValue(node, parameterValues);
    toast.success(localeService.translate("DATA_NODE_SAVED", node.data.name));
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
        <SuccessButton title={localeService.translate("SAVE")} onClick={saveInputs} />
        <DefaultButton title={localeService.translate("CLOSE")} onClick={handleClose} />
      </Footer>
    </Dialog>
  );
};

export default BeginDialog;


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function initializeParameterValues(nodeData) {
  let initializedValues = [];

  nodeData.parameters.forEach((parameter, index) => {
    let value = null;

    if (nodeData.arguments?.length > 0) {
      value = nodeData.arguments[index];
    }
    else {
      value = initializeParameter(parameter);
    }
    
    initializedValues.push(value);
  })
  
  return initializedValues;
}

function initializeParameter(parameter) {
  switch (parameter.type) {
    case 'date':
      return null;
    case 'text':
    case 'radio':
    case 'checkbox':
      return '';
    case 'select':
      return parameter.options[0];
    case 'rich_text':
      return '<p></p>';
    case 'number':
      return 0;
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
