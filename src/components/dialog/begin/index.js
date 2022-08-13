import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import { inputFactory } from "../../input";
import { EditorState, ContentState } from 'draft-js';
import { convertFromHTML, convertToHTML } from "draft-convert";
import SuccessButton from '../../buttons/SuccessButton';
import DefaultButton from '../../buttons/DefaultButton';
import { Header, Body, Footer } from '../'


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const BeginDialog = ({
  open,
  handleClose,
  data,
  onAddElementResultValue,
}) => {
  const { data: payloadData } = data;
  const [dataForm, setDataForm] = useState(loadStoredFields(data));
  const [startDate, setStartDate] = useState(loadStoredStartDate(data));
  const [endDate, setEndDate] = useState(loadStoredEndDate(data));
  const [undefinedEnd, setUndefinedEnd] = useState(loadStoredUndefinedEnd(data));
  const [repeatInterval, setRepeatInterval] = useState(loadStoredRepeatInterval(data));
  const [skipDays, setSkipDays] = useState(loadStoredSkipDays(data));
  const [skipImmediate, setSkipImmediate] = useState(loadStoredSkipImmediate(data));
  
  const saveInputs = () => {
    const inputData = {
      startDate,
      endDate,
      undefinedEnd,
      repeatInterval,
      skipDays,
      skipImmediate
    };

    console.log(inputData);
  };

  const onStartDateChange = (event) => {
    setStartDate(event.target.value);
  }

  const onEndDateChange = (event) => {
    setEndDate(event.target.value);
  }

  const onUndefinedEndChange = (event) => {
    setUndefinedEnd(event.target.checked);
  }

  const onRepeatIntervalChange = (event) => {
    setRepeatInterval(event.target.value);
  }

  const onSkipDaysChange = (event) => {
    setSkipDays(event.target.value);
  }

  const onSkipImmediateChange = (event) => {
    setSkipImmediate(event.target.checked);
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
        <DateInput label='Begin date' helperText='...' value={startDate} onChange={onStartDateChange} />
        <DateInput label='Begin date' helperText='...' value={endDate} onChange={onEndDateChange} />
        <BooleanInput label='Is end undefined?' helperText='...' value={undefinedEnd} onChange={onUndefinedEndChange} />
        <RawTextInput label='Repeat interval' helperText='How often should it repeat? (2 weeks, 5 days...)' value={repeatInterval} onChange={onRepeatIntervalChange} />
        <NumberInput label='How often care plan should be executed?' helperText='Spacing between executions (in days)' value={skipDays} onChange={onSkipDaysChange} />
        <BooleanInput label='Ignore immediate execution?' helperText='Setting this option to true will bypass immediate execution. The first run will only take place at the configured interval.' value={skipImmediate} onChange={onSkipImmediateChange} />
      </Body>
      <Footer>
        <SuccessButton title='Salvar' onClick={saveInputs} />
        <DefaultButton title='Fechar' onClick={handleClose} />
      </Footer>
    </Dialog>
  );
};

export default BeginDialog;

const DateInput = ({ label, helperText, value, onChange }) => (
  inputFactory(
    "DATE_INPUT", 
    {
      label,
      value,
      helperText,
      onChange
    }
  )
);

const BooleanInput = ({ label, helperText, value, onChange }) => (
  inputFactory(
    "BOOLEAN_INPUT", 
    {
      label,
      value,
      helperText,
      onChange
    }
  )
);

const RawTextInput = ({ label, helperText, value, onChange }) => (
  inputFactory(
    "RAW_TEXT_INPUT", 
    {
      label,
      value,
      helperText,
      onChange
    }
  )
);

const NumberInput = ({ label, helperText, value, onChange }) => (
  inputFactory(
    "NUMBER_INPUT", 
    {
      label,
      value,
      helperText,
      onChange
    }
  )
);



//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function loadStoredFields(data) {
  if (!data || !data.data || !data.data.results) {
    return {};
  }

  return data.data.results;
}

function loadStoredStartDate(data) {
  if (!data || !data.data || !data.data.results || !data.data.results.startDate) {
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
  if (!data || !data.data || !data.data.results || !data.data.results.undefinedEnd) {
    return false;
  }

  return data.data.results.undefinedEnd;
}

function loadStoredRepeatInterval(data) {
  if (!data || !data.data || !data.data.results || !data.data.results.repeatInterval) {
    return '';
  }

  return data.data.results.repeatInterval;
}

function loadStoredSkipDays(data) {
  if (!data || !data.data || !data.data.results || !data.data.results.skipDays) {
    return 0;
  }

  return data.data.results.skipDays;
}

function loadStoredSkipImmediate(data) {
  if (!data || !data.data || !data.data.results || !data.data.results.skipImmediate) {
    return false;
  }

  return data.data.results.skipImmediate;
}
