import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import SuccessButton from "../../buttons/SuccessButton";
import DefaultButton from "../../buttons/DefaultButton";
import { Header, Body, Footer } from "../";
import OperatorOptions from './operator.types.json';
import RawTextInput from "../../input/RawTextInput";
import MultiSelectionInput from "../../input/MultiSelectionInput";


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const ConditionalDialog = ({
  open,
  handleClose,
  data,
  onAddElementResultValue,
}) => {
  const { data: payloadData } = data;

  const [left, setLeft] = useState(loadStoredLeft(data));
  const [operator, setOperator] = useState(loadStoredOperator(data));
  const [right, setRight] = useState(loadStoredRight(data));

  const saveInputs = () => {
    const inputData = {
      left,
      operator,
      right
    };

    onAddElementResultValue(data, inputData);
    toast.success(`Dados de ${payloadData.label} salvos`);
  };

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
        <RawTextInput
          label="Left"
          helperText="Left operand"
          value={left}
          onChange={setLeft}
        />
        <MultiSelectionInput
          label="Operator"
          helperText="Operator that will be applied in the left and right terms"
          value={operator}
          onChange={setOperator}
          options={OperatorOptions}
        />
        <RawTextInput
          label="Right"
          helperText="Right operand"
          value={right}
          onChange={setRight}
        />
      </Body>
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

function loadStoredLeft(data) {
  if (!hasResults(data) || !data.data.results.left) {
    return '';
  }

  return data.data.results.left;
}

function loadStoredOperator(data) {
  if (!hasResults(data) || !data.data.results.operator) {
    return '';
  }

  return data.data.results.operator;
}

function loadStoredRight(data) {
  if (!hasResults(data) || !data.data.results.right) {
    return '';
  }

  return data.data.results.right;
}
