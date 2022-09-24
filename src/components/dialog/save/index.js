import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import SuccessButton from "../../buttons/SuccessButton";
import DefaultButton from "../../buttons/DefaultButton";
import { Requests } from "../../../services/axios/requests";
import { Header, Body, Footer } from "../";
import RawTextInput from "../../../parts/input/RawTextInput";


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const SaveFlowDialog = ({ open, handleClose, data }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dataFlow, setDataFlow] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  const handleSave = () => {
    const payload = {
      name,
      description,
      userEmail,
      data: dataFlow,
    };

    console.log('Sending flow...', payload)
    // new Requests().createOrUpdateFlow(payload).then((r) => {
    //   handleClose();
    // });
  };

  useEffect(() => {
    // console.log(data);
    if (data?.flow?.flowName) {
      setName(data.flow.flowName);
    }
    if (data?.flow?.flowDescription) {
      setDescription(data.flow.flowDescription);
    }
    if (data?.flow?.flowEmail) {
      setUserEmail(data.flow.flowEmail);
    }
    setDataFlow(data?.elements);
  }, [data]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <Header 
        title='Save care plan' 
        subtitle='Use this popup to save your care plan!' 
      />
      <Body>
        <RawTextInput
          label="Care plan name"
          helperText="Cancer care plan, urolithiasis care plan..."
          value={name}
          onChange={setName}
        />
        <RawTextInput
          label="Description"
          helperText="This care plan is about..."
          value={description}
          onChange={setDescription}
        />
        <RawTextInput
          label="Patient email"
          helperText="This care plan is for..."
          value={userEmail}
          onChange={setUserEmail}
        />
      </Body>
      <Footer>
        <SuccessButton title="Save" onClick={handleSave} />
        <DefaultButton title="Close" onClick={handleClose} />
      </Footer>
    </Dialog>
  );
};

export default SaveFlowDialog;
