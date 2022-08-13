import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import { inputFactory } from "../../input";
import SuccessButton from "../../buttons/SuccessButton";
import DefaultButton from "../../buttons/DefaultButton";
import { Header, Body, Footer } from "../";
import severityOptions from './severity.type.json';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
export const InformationDialog = ({
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

  const saveInputs = () => {
    const inputData = {
      name,
      description,
      content,
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

  const onContentChange = (event) => {
    setContent(event.target.value);
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
          helperText="What's the subject?"
          value={name}
          onChange={onNameChange}
        />
        <RawTextInput
          label="Description"
          helperText="This reminder is about..."
          value={description}
          onChange={onDescriptionChange}
        />
        <RawTextInput
          label="Why?"
          helperText="Reminder content"
          value={content}
          onChange={onContentChange}
        />
        <MultiSelectionInput
          label="Severity"
          helperText="How critical is to use this reminder?"
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