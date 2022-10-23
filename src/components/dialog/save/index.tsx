/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import SuccessButton from "../../buttons/SuccessButton";
import DefaultButton from "../../buttons/DefaultButton";
import { Header, Body, Footer } from "..";
import RawTextInput from "../../../parts/input/RawTextInput";
import LocaleService from "../../../services/locale.service";
import FlowService from "../../../services/flow.service";
import FlowDTO from "../../../dto/flow.dto";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const SaveFlowDialog = ({ open, handleClose, data }: any) => {
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dataFlow, setDataFlow] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  const localeService = new LocaleService();
  const flowService = new FlowService();

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
        <CarePlanNameInput 
          localeService={localeService} 
          value={name} 
          onChange={setName} 
        />
        <CarePlanDescriptionInput 
          localeService={localeService}
          value={description} 
          onChange={setDescription} 
        />
        <PatientEmailInput 
          localeService={localeService}
          value={userEmail} 
          onChange={setUserEmail} 
        />
      </Body>
      <Footer>
        <SaveButton 
          localeService={localeService}
          onClick={() => handleSave(
            name, 
            description, 
            userEmail, 
            dataFlow, 
            flowService, 
            handleClose
          )} />
        <CloseButton localeService={localeService} onClick={handleClose} />
      </Footer>
    </Dialog>
  );
};

export default SaveFlowDialog;

const CarePlanNameInput = ({ localeService, value, onChange }: any) => (
  <RawTextInput
    label={localeService.translate("CARE_PLAN_NAME")}
    helperText={localeService.translate("CARE_PLAN_NAME_PLACEHOLDER")}
    value={value}
    onChange={onChange}
  />
);

const CarePlanDescriptionInput = ({ localeService, value, onChange }: any) => (
  <RawTextInput
    label={localeService.translate("DESCRIPTION")}
    helperText={localeService.translate("CARE_PLAN_DESCRIPTION_PLACEHOLDER")}
    value={value}
    onChange={onChange}
  />
);

const PatientEmailInput = ({ localeService, value, onChange }: any) => (
  <RawTextInput
    label={localeService.translate("PATIENT_EMAIL")}
    helperText={localeService.translate("PATIENT_EMAIL_PLACEHOLDER")}
    value={value}
    onChange={onChange}
  />
);

const SaveButton = ({ localeService, onClick }: any) => (
  <SuccessButton 
    title={localeService.translate("SAVE")} 
    onClick={onClick} 
  />
);

const CloseButton = ({ localeService, onClick }: any) => (
  <DefaultButton 
    title={localeService.translate("CLOSE")} 
    onClick={onClick} 
  />
);


// ----------------------------------------------------------------------------
//         Functions
// ----------------------------------------------------------------------------
function handleSave(
  name: string, 
  description: string, 
  userEmail: string, 
  dataFlow: any, 
  flowService: FlowService, 
  handleClose: any
) {
  const payload: FlowDTO = {
    name,
    description,
    patientEmail:userEmail,
    graph: dataFlow,
  };

  flowService.create(payload).then((r) => {
    handleClose();
  });
}
