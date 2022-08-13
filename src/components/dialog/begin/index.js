import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import SuccessButton from "../../buttons/SuccessButton";
import DefaultButton from "../../buttons/DefaultButton";
import { Header, Body, Footer } from "../";
import BooleanInput from "../../input/BooleanInput";
import RawTextInput from "../../input/RawTextInput";
import NumberInput from "../../input/NumberInput";
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
  const [repeatInterval, setRepeatInterval] = useState(
    loadStoredRepeatInterval(data)
  );
  const [skipDays, setSkipDays] = useState(loadStoredSkipDays(data));
  const [skipImmediate, setSkipImmediate] = useState(
    loadStoredSkipImmediate(data)
  );

  const saveInputs = () => {
    const inputData = {
      startDate,
      endDate,
      undefinedEnd,
      repeatInterval,
      skipDays,
      skipImmediate,
    };

    onAddElementResultValue(data, inputData);
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
        <RawTextInput
          label="Repeat interval"
          helperText="How often should it repeat? (2 weeks, 5 days...)"
          value={repeatInterval}
          onChange={setRepeatInterval}
        />
        <NumberInput
          label="How often care plan should be executed?"
          helperText="Spacing between executions (in days)"
          value={skipDays}
          onChange={setSkipDays}
        />
        <BooleanInput
          label="Ignore immediate execution?"
          helperText="Setting this option to true will bypass immediate execution. The first run will only take place at the configured interval."
          value={skipImmediate}
          onChange={setSkipImmediate}
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

function loadStoredRepeatInterval(data) {
  if (
    !data ||
    !data.data ||
    !data.data.results ||
    !data.data.results.repeatInterval
  ) {
    return "";
  }

  return data.data.results.repeatInterval;
}

function loadStoredSkipDays(data) {
  if (
    !data ||
    !data.data ||
    !data.data.results ||
    !data.data.results.skipDays
  ) {
    return 0;
  }

  return data.data.results.skipDays;
}

function loadStoredSkipImmediate(data) {
  if (
    !data ||
    !data.data ||
    !data.data.results ||
    !data.data.results.skipImmediate
  ) {
    return false;
  }

  return data.data.results.skipImmediate;
}
