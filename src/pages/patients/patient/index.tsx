/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Styled from "./styled";
import Progress from "../../../domain/progress.domain";
import { MenuDrawer } from "../../../components/menuDrawer/menuDrawer";
import PatientDialog from "../../../components/dialog/patient";
import PatientProgress from "../../../components/patientProgress";
import Loading from "../../../components/loading";
import LocaleService from "../../../services/locale.service";
import ProgressService from "../../../services/progress.service";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const Patient = () => {
  
  const [patientProgress, setPatientProgress]: any = useState({});
  const [dialogContent, setDialogContent]: any = useState({});
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const { patientId, flowId }: any = useParams();
  const localeService = new LocaleService();
  const progressService = new ProgressService();

  useEffect(() => {
    fetchPatientInfo(
      patientId, 
      flowId, 
      progressService, 
      setPatientProgress, 
      setLoading
    );
  }, []);

  return (
    <Styled.PageWithDrawer>
      <MenuDrawer />
      <Styled.Container>
        <Loading display={loading} />
        <PatientProgress 
          display={!loading}
          localeService={localeService}
          patientProgress={patientProgress}
          setOpenDialog={setOpenDialog}
          setDialogContent={setDialogContent}
        />
        <PatientDialog
          open={openDialog}
          onClose={() => handleCloseDialog(setOpenDialog)}
          data={dialogContent}
        />
      </Styled.Container>
    </Styled.PageWithDrawer>
  );
};

export default Patient;


// ----------------------------------------------------------------------------
//         Functions
// ----------------------------------------------------------------------------
function fetchPatientInfo(
  patientId: string, 
  flowId: string,
  progressService: ProgressService, 
  setPatientProgress: any, 
  setLoading: any
) {
  progressService.getPatient(patientId, flowId).then((r: Progress) => {
    setPatientProgress(r);
    setLoading(false);
  });
}

function handleCloseDialog(setOpenDialog: any) {
  setOpenDialog(false);
}