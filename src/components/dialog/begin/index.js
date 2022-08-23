import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import SuccessButton from "../../buttons/SuccessButton";
import DefaultButton from "../../buttons/DefaultButton";
import { Header, Body, Footer } from "../";
import BooleanInput from "../../input/BooleanInput";
import DateInput from "../../input/DateInput";


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const BeginDialog = ({ open, handleClose, data, onAddElementResultValue }) => {
  const { data: payloadData } = data;
  const [startDate, setStartDate] = useState(loadStoredStartDate(data));
  const [endDate, setEndDate] = useState(loadStoredEndDate(data));
  const [undefinedEnd, setUndefinedEnd] = useState(
    loadStoredUndefinedEnd(data)
  );

  const saveInputs = () => {
    const inputData = {
      startDate,
      endDate,
      undefinedEnd
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
        <DateInput
          label="Begin date"
          helperText="Type care plan begin date"
          value={startDate}
          onChange={setStartDate}
        />
        {!undefinedEnd &&
          <DateInput
            label="End date"
            helperText="Type care plan end date"
            value={endDate}
            onChange={setEndDate}
          />
        }
        <BooleanInput
          label="Is end date undefined?"
          helperText="Sets end date as undefined"
          value={undefinedEnd}
          onChange={setUndefinedEnd}
        />
      </Body>
      <Footer>
        <SuccessButton title="Save" onClick={saveInputs} />
        <DefaultButton title="Close" onClick={handleClose} />
      </Footer>
    </Dialog>
  );
};

export default BeginDialog;


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
