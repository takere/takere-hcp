/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import SuccessButton from "../../../buttons/SuccessButton";
import DefaultButton from "../../../buttons/DefaultButton";
import { Header, Body, Footer } from "../../";
import numberOperatorOptions from './number-operator.types';
import selectionOperatorOptions from './selection-operator.types';
import textOperatorOptions from './text-operator.types';
import ParameterInput from "../../../../parts/input/ParameterInput";
import LocaleService from "../../../../services/locale.service";
import Parameter from "../../../../models/parameter/parameter.model";
import Option from "../../../../models/option.model";


// ----------------------------------------------------------------------------
//         Constants
// ----------------------------------------------------------------------------
const localeService = new LocaleService();


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const ConditionalDialog = ({
  open,
  handleClose,
  node,
  onAddElementResultValue,
  connection
}: any) => {
  
  const [parameters, setParameters] = useState(initializeParameters(node, connection));
  const [parameterValues, setParameterValues] = useState(initializeValues());

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
      setParameterValues([0, 0, options[2]?.length > 0 ? 0 : ''] as any[]);
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
          {hasArguments(connection) && parameters.map((parameter, index) => (
            <ParameterInput 
              key={index}
              parameter={parameter}
              value={parameterValues[index]}
              onChange={(newValue) => handleParameterChange(
                newValue, 
                index, 
                parameters,
                connection,
                setParameters,
                parameterValues,
                setParameterValues
              )}
            />
          ))}
        </Body>
      }
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
};

export default ConditionalDialog;

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
function initializeValues() {
  return [0, 0, undefined];
}

function initializeParameters(node: any, connection: any) {
  return parseParameters(
    node.data.parameters, 
    [
      buildLeftOptions(connection), 
      buildOperatorOptions(connection, 0), 
      buildRightOptions(connection, 0)
    ]
  );
}

function parseParameters(parameters: Parameter[], options: Option[]) {
  let parsedParameters: any[] = [];

  parameters.forEach((parameter, index) => {
    parsedParameters.push({ ...parameter, options: options[index] });
  })

  return parsedParameters;
}

function buildLeftOptions(connection: any) {
  if (!connection) {
    return [];
  }

  if (connection.data.slug === 'medication_control') {
    return [{ label: localeService.translate("MEDICATION"), value: 'medication' }];
  }

  const options: any = [];
  const fields = connection.data.arguments?.find((arg: any) => Array.isArray(arg));

  fields?.forEach((field: any, index: number) => {
    options.push({ label: field.label, value: index });
  });

  return options;
}

function buildOperatorOptions(connection: any, currentIndex: number) {
  if (!connection) {
    return [];
  }

  let options = [];

  if (connection.data.slug === 'medication_control') {
    return buildOptions(selectionOperatorOptions);
  }

  if (!connection.data.arguments) {
    return [];
  }

  const fields = connection.data.arguments?.find((arg: any) => Array.isArray(arg));
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

function buildOptions(optionList: any[]) {
  let options: any[] = [];

  optionList.forEach((option, index) => {
    options.push({ label: option.label, value: index, originalValue: option.value });
  });

  return options;
}

function buildRightOptions(connection: any, currentIndex: number) {
  if (!connection) {
    return [];
  }

  if (connection.data.slug === 'medication_control') {
    return [{ label: localeService.translate("TAKEN"), value: 'taken' }];
  }

  if (!connection.data.arguments) {
    return [];
  }

  const fields = connection.data.arguments?.find((arg: any) => Array.isArray(arg));
  const form = fields[currentIndex];
  const options: any[] = [];
  
  form.options.forEach((option: any, index: number) => {
    options.push({ label: option, value: index });
  });

  return options;
}

function handleParameterChange(
  newValue: number, 
  index: number, 
  parameters: any[],
  connection: any,
  setParameters: any,
  parameterValues: any,
  setParameterValues: any
) {
  const updatedParameters = [ ...parameterValues ];

  updatedParameters[index] = newValue;

  setParameterValues(updatedParameters);

  if (index === 0) {
    onSelectLeft(
      newValue, 
      parameters,
      connection,
      setParameters,
      setParameterValues
    );
  }
}

function onSelectLeft(
  index: number, 
  parameters: any[],
  connection: any,
  setParameters: any,
  setParameterValues: any
) {
  const left = index;
  const operator = 0;
  const right = '';
  const updatedParameters: any = [ left, operator, right ];
  const options = [
    parameters[0].options,
    buildOperatorOptions(connection, index),
    buildRightOptions(connection, index)
  ];

  setParameterValues(updatedParameters);
  setParameters(parseParameters(parameters, options));
}

function hasArguments(connection: any) {
  return connection.data.arguments && connection.data.arguments.length > 0;
}

function saveInputs(
  onAddElementResultValue: any, 
  node: any, 
  parameterValues: any[], 
  localeService: LocaleService
) {
  onAddElementResultValue(node, parameterValues);
  toast.success(localeService.translate("DATA_NODE_SAVED", node.data.name));
}
