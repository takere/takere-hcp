import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import SuccessButton from "../../buttons/SuccessButton";
import DefaultButton from "../../buttons/DefaultButton";
import { Header, Body, Footer } from "../";
import RawTextInput from "../../../parts/input/RawTextInput";
import LocaleService from "../../../services/locale.service";
import FlowService from "../../../services/flow.service";

//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const SaveFlowDialog = ({ open, handleClose, data }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dataFlow, setDataFlow] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const localeService = new LocaleService();
  const flowService = new FlowService();

  const handleSave = () => {
    const payload = {
      name,
      description,
      patientEmail:userEmail,
      graph: dataFlow,
    };

    flowService.create(payload).then((r) => {
      handleClose();
    });
  };

  useEffect(() => {
    if (data?.flow?.name) {
      setName(data.flow.name);
    }
    if (data?.flow?.description) {
      setDescription(data.flow.description);
    }
    if (data?.flow?.patientEmail) {
      setUserEmail(data.flow.patientEmail);
    }
    setDataFlow(data?.graph);
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
        title={localeService.translate("SAVE_CARE_PLAN_TITLE")}
        subtitle={localeService.translate("SAVE_CARE_PLAN_SUBTITLE")}
      />
      <Body>
        <RawTextInput
          label={localeService.translate("CARE_PLAN_NAME")}
          helperText={localeService.translate("CARE_PLAN_NAME_PLACEHOLDER")}
          value={name}
          onChange={setName}
        />
        <RawTextInput
          label={localeService.translate("DESCRIPTION")}
          helperText={localeService.translate("CARE_PLAN_DESCRIPTION_PLACEHOLDER")}
          value={description}
          onChange={setDescription}
        />
        <RawTextInput
          label={localeService.translate("PATIENT_EMAIL")}
          helperText={localeService.translate("PATIENT_EMAIL_PLACEHOLDER")}
          value={userEmail}
          onChange={setUserEmail}
        />
      </Body>
      <Footer>
        <SuccessButton title={localeService.translate("SAVE")} onClick={handleSave} />
        <DefaultButton title={localeService.translate("CLOSE")} onClick={handleClose} />
      </Footer>
    </Dialog>
  );
};

export default SaveFlowDialog;
