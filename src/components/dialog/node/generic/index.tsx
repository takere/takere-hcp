import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import SuccessButton from "../../buttons/SuccessButton";
import DefaultButton from "../../buttons/DefaultButton";
import { Header, Body, Footer } from "../";
import ParameterInput from "../../../parts/input/ParameterInput";
import LocaleService from "../../../services/locale.service";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const GenericDialog = ({ open, handleClose, node, onAddElementResultValue }) => {
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

export default GenericDialog;


// ----------------------------------------------------------------------------
//         Functions
// ----------------------------------------------------------------------------
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
    case 'rich_text':
    case 'radio':
    case 'checkbox':
    case 'select':
      return '';
    case 'select':
      return parameter.options[0].value;
    case 'number':
      return 0;
    case 'form':
      return []
    case 'boolean':
      return false;
    case 'select&number':
      return { select: parameter.options[0].value, number: 0 };
    default:
      return null;
  }
}
