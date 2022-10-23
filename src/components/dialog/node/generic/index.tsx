/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import SuccessButton from "../../../buttons/SuccessButton";
import DefaultButton from "../../../buttons/DefaultButton";
import { Header, Body, Footer } from "../../";
import ParameterInput from "../../../../parts/input/ParameterInput";
import LocaleService from "../../../../services/locale.service";
import Parameter from "../../../../models/parameter/parameter.model";
import Node from "../../../../domain/node.domain";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const GenericDialog = ({ open, handleClose, node, onAddElementResultValue }: any) => {
  
  const [parameterValues, setParameterValues] = useState(initializeValues(node.data));

  const localeService = new LocaleService();

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
        {node.data.parameters.map((parameter: Parameter, index: number) => (
          <ParameterInput 
            key={index}
            parameter={parameter}
            value={parameterValues[index]}
            onChange={(newValue) => handleParameterChange(
              newValue, 
              index, 
              parameterValues, 
              setParameterValues
            )}
          />
        ))}
      </Body>
      <Footer>
        <SaveButton 
          localeService={localeService} 
          onClick={() => saveInputs(
            onAddElementResultValue, 
            node, 
            parameterValues, 
            localeService
          )} 
        />
        <CloseButton localeService={localeService} onClick={handleClose} />
      </Footer>
    </Dialog>
  );
}

export default GenericDialog;

const SaveButton = ({ localeService, onClick }: any) => (
  <SuccessButton 
    title={localeService.translate("SAVE")} 
    onClick={onClick} 
  />
);

const CloseButton = ({ localeService, onClick }: any) => (
  <DefaultButton 
    title={localeService.translate("CLOSE")} 
    onClick={onClick} 
  />
);


// ----------------------------------------------------------------------------
//         Functions
// ----------------------------------------------------------------------------
function initializeValues(nodeData: Node) {
  let initializedValues: any[] = [];

  nodeData.parameters.forEach((parameter, index) => {
    let value = null;

    if (nodeData.arguments && nodeData.arguments.length > 0) {
      value = nodeData.arguments[index];
    }
    else {
      value = initializeParameter(parameter);
    }
    
    initializedValues.push(value);
  })
  
  return initializedValues;
}

function initializeParameter(parameter: Parameter) {
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
      if (!parameter.options) {
        throw new Error("Parameter - options missing");
      }

      return parameter.options[0].value;
    case 'number':
      return 0;
    case 'form':
      return []
    case 'boolean':
      return false;
    case 'select&number':
      if (!parameter.options) {
        throw new Error("Parameter - options missing");
      }

      return { select: parameter.options[0].value, number: 0 };
    default:
      return null;
  }
}

function saveInputs(
  onAddElementResultValue: any, 
  node: any, 
  parameterValues: string[], 
  localeService: LocaleService
) {
  onAddElementResultValue(node, parameterValues);
  toast.success(localeService.translate("DATA_NODE_SAVED", node.data.name));
}

function handleParameterChange(
  newValue: string, 
  index: number, 
  parameterValues: string[], 
  setParameterValues: any
) {
  const updatedParameters = [ ...parameterValues ];

  updatedParameters[index] = newValue;

  setParameterValues(updatedParameters);
}
