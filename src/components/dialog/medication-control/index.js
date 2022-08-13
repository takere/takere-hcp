import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import { inputFactory } from "../../input";
import SuccessButton from "../../buttons/SuccessButton";
import DefaultButton from "../../buttons/DefaultButton";
import { Header, Body, Footer } from "../";
import frequencyOptions from './frequency.type.json';
import severityOptions from './severity.type.json';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
export const MedicationControlDialog = ({
  open,
  handleClose,
  data,
  onAddElementResultValue,
}) => {
  const { data: payloadData } = data;

  const [name, setName] = useState(loadStoredName(data));
  const [description, setDescription] = useState(loadStoredDescription(data));
  const [why, setWhy] = useState(loadStoredWhy(data));
  const [notes, setNotes] = useState(loadStoredNotes(data));
  const [dosage, setDosage] = useState(loadStoredDosage(data));
  const [endDate, setEndDate] = useState(loadStoredEndDate(data));
  const [undefinedEnd, setUndefinedEnd] = useState(loadStoredUndefinedEnd(data));
  const [frequency, setFrequency] = useState(loadStoredFrequency(data));
  const [severity, setSeverity] = useState(loadStoredSeverity(data));

  const saveInputs = () => {
    const inputData = {
      name,
      description,
      why,
      notes,
      dosage,
      endDate,
      undefinedEnd,
      frequency,
      severity
    };

    onAddElementResultValue(data, inputData);
    toast.success(`Dados de ${payloadData.label} salvos`);
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onWhyChange = (event) => {
    setWhy(event.target.value);
  };

  const onNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const onDosageChange = (event) => {
    setDosage(event.target.value);
  };

  const onEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const onUndefinedEndChange = (event) => {
    setUndefinedEnd(event.target.checked);
  };

  const onFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };

  const onSeverityChange = (event) => {
    setSeverity(event.target.value);
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
          label="Name"
          helperText="Medication name"
          value={name}
          onChange={onNameChange}
        />
        <RawTextInput
          label="Description"
          helperText="This medication is about..."
          value={description}
          onChange={onDescriptionChange}
        />
        <RawTextInput
          label="Why?"
          helperText="This medication is important because..."
          value={why}
          onChange={onWhyChange}
        />
        <RawTextInput
          label="Notes"
          helperText="Extra information"
          value={notes}
          onChange={onNotesChange}
        />
        <RawTextInput
          label="Dosage"
          helperText="Dosage along with its unit (ml, mg...)"
          value={dosage}
          onChange={onDosageChange}
        />
        {!undefinedEnd &&
          <DateInput
            label="End date"
            helperText="Type care plan end date"
            value={endDate}
            onChange={onEndDateChange}
          />
        }
        <BooleanInput
          label="Is end date undefined?"
          helperText="Sets end date as undefined"
          value={undefinedEnd}
          onChange={onUndefinedEndChange}
        />
        <MultiSelectionInput
          label="Frequency"
          helperText="How often this treatment should be performed?"
          value={frequency}
          onChange={onFrequencyChange}
          options={frequencyOptions}
        />
        <MultiSelectionInput
          label="Severity"
          helperText="How critical is to use this medicine?"
          value={severity}
          onChange={onSeverityChange}
          options={severityOptions}
        />
      </Body>
      <Footer>
        <SuccessButton title="Save" onClick={saveInputs} />
        <DefaultButton title="Close" onClick={handleClose} />
      </Footer>
    </Dialog>
  );
};

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
      onChange,
    }
  )
);

const MultiSelectionInput = ({ label, helperText, value, onChange, options }) => (
  inputFactory(
    "MULTI_SELECTION_INPUT", 
    {
      label,
      value,
      helperText,
      onChange,
      options,
      }
  )
);


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function hasResults(data) {
  return  data
          && data.data 
          && data.data.results;
}

function loadStoredName(data) {
  if (!hasResults(data) || !data.data.results.name) {
    return '';
  }

  return data.data.results.name;
}

function loadStoredDescription(data) {
  if (!hasResults(data) || !data.data.results.description) {
    return '';
  }

  return data.data.results.description;
}

function loadStoredWhy(data) {
  if (!hasResults(data) || !data.data.results.why) {
    return '';
  }

  return data.data.results.why;
}

function loadStoredNotes(data) {
  if (!hasResults(data) || !data.data.results.notes) {
    return '';
  }

  return data.data.results.notes;
}

function loadStoredDosage(data) {
  if (!hasResults(data) || !data.data.results.dosage) {
    return '';
  }

  return data.data.results.dosage;
}

function loadStoredEndDate(data) {
  if (!hasResults(data) || !data.data.results.endDate) {
    return new Date();
  }

  return data.data.results.endDate;
}

function loadStoredUndefinedEnd(data) {
  if (!hasResults(data) || !data.data.results.undefinedEnd) {
    return false;
  }

  return data.data.results.undefinedEnd;
}

function loadStoredFrequency(data) {
  if (!hasResults(data) || !data.data.results.frequency) {
    return frequencyOptions[0].value;
  }

  return data.data.results.frequency;
}

function loadStoredSeverity(data) {
  if (!hasResults(data) || !data.data.results.severity) {
    return severityOptions[0].value;
  }

  return data.data.results.severity;
}