import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import SuccessButton from "../../buttons/SuccessButton";
import DefaultButton from "../../buttons/DefaultButton";
import { Header, Body, Footer } from "../";
import BooleanInput from "../../../parts/input/BooleanInput";
import DateInput from "../../../parts/input/DateInput";


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const GenericDialog = ({ open, handleClose, node, onAddElementResultValue }) => {
  const [parameters, setParameters] = useState(node.parameters);

  const saveInputs = () => {
    // const inputData = {
    //   startDate,
    //   endDate,
    //   undefinedEnd
    // };

    // onAddElementResultValue(data, inputData);
    toast.success(`Dados de ${payloadData.label} salvos`);
    console.log(parameters)
  };

  const handleParameterChange = (newValue, parameterIndex) => {
    const updatedParameters = [ ...parameters ];

    updatedParameters[parameterIndex] = newValue;

    setParameters(updatedParameters);
  }

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
        {node.parameters.map((parameter, index) => (
          <ParameterInput 
            key={index}
            parameter={parameter}
            value={parameters[index]}
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
