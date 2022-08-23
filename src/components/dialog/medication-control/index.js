import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import SuccessButton from "../../buttons/SuccessButton";
import DefaultButton from "../../buttons/DefaultButton";
import { Header, Body, Footer } from "../";
import severityOptions from './severity.type.json';
import BooleanInput from "../../../parts/input/BooleanInput";
import RawTextInput from "../../../parts/input/RawTextInput";
import MultiSelectionInput from "../../../parts/input/MultiSelectionInput";
import DateInput from "../../../parts/input/DateInput";
import FrequencyInput from "../../../parts/frequency-input";


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const MedicationControlDialog = ({
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
  const [beginDate, setBeginDate] = useState(loadStoredBeginDate(data));
  const [endDate, setEndDate] = useState(loadStoredEndDate(data));
  const [undefinedEnd, setUndefinedEnd] = useState(loadStoredUndefinedEnd(data));
  const [frequencyType, setFrequencyType] = useState(loadStoredFrequencyType(data));
  const [frequencyValue, setFrequencyValue] = useState(loadStoredFrequencyValue(data));
  const [severity, setSeverity] = useState(loadStoredSeverity(data));

  const saveInputs = () => {
    const inputData = {
      name,
      description,
      why,
      notes,
      dosage,
      beginDate,
      endDate,
      undefinedEnd,
      frequency: { type: frequencyType, value: frequencyValue },
      severity
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
          label="Name"
          helperText="Medication name"
          value={name}
          onChange={setName}
        />
        <RawTextInput
          label="Description"
          helperText="This medication is about..."
          value={description}
          onChange={setDescription}
        />
        <RawTextInput
          label="Why?"
          helperText="This medication is important because..."
          value={why}
          onChange={setWhy}
        />
        <RawTextInput
          label="Notes"
          helperText="Extra information"
          value={notes}
          onChange={setNotes}
        />
        <RawTextInput
          label="Dosage"
          helperText="Dosage along with its unit (ml, mg...)"
          value={dosage}
          onChange={setDosage}
        />
        <DateInput
            label="Begin date"
            helperText="The medication should be taken from..."
            value={beginDate}
            onChange={setBeginDate}
          />
        {!undefinedEnd &&
          <DateInput
            label="End date"
            helperText="The medication should be taken until..."
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
        <FrequencyInput 
          frequencyType={frequencyType}
          setFrequencyType={setFrequencyType}
          frequencyValue={frequencyValue}
          setFrequencyValue={setFrequencyValue}
        />
        <MultiSelectionInput
          label="Severity"
          helperText="How critical is to use this medicine?"
          value={severity}
          onChange={setSeverity}
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

export default MedicationControlDialog;


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

function loadStoredBeginDate(data) {
  if (!hasResults(data) || !data.data.results.beginDate) {
    return new Date();
  }

  return data.data.results.beginDate;
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

function loadStoredFrequencyType(data) {
  if (!hasResults(data) || !data.data.results.frequency) {
    return 'daily';
  }

  return data.data.results.frequency.type;
}

function loadStoredFrequencyValue(data) {
  if (!hasResults(data) || !data.data.results.frequency) {
    return 'daily';
  }

  return data.data.results.frequency.value;
}

function loadStoredSeverity(data) {
  if (!hasResults(data) || !data.data.results.severity) {
    return severityOptions[0].value;
  }

  return data.data.results.severity;
}
