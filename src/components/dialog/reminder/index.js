import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import SuccessButton from "../../buttons/SuccessButton";
import DefaultButton from "../../buttons/DefaultButton";
import { Header, Body, Footer } from "../";
import severityOptions from './severity.type.json';
import RawTextInput from "../../../parts/input/RawTextInput";
import MultiSelectionInput from "../../../parts/input/MultiSelectionInput";
import FrequencyInput from "../../../parts/frequency-input";


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const ReminderDialog = ({
  open,
  handleClose,
  data,
  onAddElementResultValue,
}) => {
  const { data: payloadData } = data;

  const [name, setName] = useState(loadStoredName(data));
  const [description, setDescription] = useState(loadStoredDescription(data));
  const [content, setContent] = useState(loadStoredContent(data));
  const [severity, setSeverity] = useState(loadStoredSeverity(data));
  const [frequencyType, setFrequencyType] = useState(loadStoredFrequencyType(data));
  const [frequencyValue, setFrequencyValue] = useState(loadStoredFrequencyValue(data));

  const saveInputs = () => {
    const inputData = {
      name,
      description,
      content,
      severity,
      frequency: { type: frequencyType, value: frequencyValue }
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
          helperText="What's the subject?"
          value={name}
          onChange={setName}
        />
        <RawTextInput
          label="Description"
          helperText="This reminder is about..."
          value={description}
          onChange={setDescription}
        />
        <RawTextInput
          label="Content"
          helperText="Reminder content"
          value={content}
          onChange={setContent}
        />
        <MultiSelectionInput
          label="Severity"
          helperText="How critical is to use this reminder?"
          value={severity}
          onChange={setSeverity}
          options={severityOptions}
        />
        <FrequencyInput 
          frequencyType={frequencyType}
          setFrequencyType={setFrequencyType}
          frequencyValue={frequencyValue}
          setFrequencyValue={setFrequencyValue}
        />
      </Body>
      <Footer>
        <SuccessButton title="Save" onClick={saveInputs} />
        <DefaultButton title="Close" onClick={handleClose} />
      </Footer>
    </Dialog>
  );
};

export default ReminderDialog;


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

function loadStoredContent(data) {
  if (!hasResults(data) || !data.data.results.content) {
    return '';
  }

  return data.data.results.content;
}

function loadStoredSeverity(data) {
  if (!hasResults(data) || !data.data.results.severity) {
    return severityOptions[0].value;
  }

  return data.data.results.severity;
}

function loadStoredFrequencyType(data) {
  if (!hasResults(data)) {
    return frequencyTypeOptions[0].value;
  }

  return data.data.results.frequency.type;
}

function loadStoredFrequencyValue(data) {
  if (!hasResults(data)) {
    return 0;
  }

  return data.data.results.frequency.value;
}
