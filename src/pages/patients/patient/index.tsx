/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from "react";
import * as Styled from "./styled";
import DialogMaterialUI from "@material-ui/core/Dialog";
import { MenuDrawer } from "../../../components/menuDrawer/menuDrawer";
import {
  useParams
} from "react-router-dom";
import { ClipLoader } from "react-spinners";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DefaultButton from "../../../components/buttons/DefaultButton";
import LocaleService from "../../../services/locale.service";
import ProgressService from "../../../services/progress.service";
import Progress from "../../../domain/progress.domain";
import Board from "../../../domain/board.domain";
import PatientDialog from "../../../components/dialog/patient";


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
        <LoadingContent display={loading} />
        <PageContent 
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

const LoadingContent = ({ display }: any) => {
  if (!display) {
    return (
      <></>
    );
  }

  return (
    <ClipLoader />
  );
}

const PageContent = ({ 
  display, 
  localeService, 
  patientProgress, 
  setOpenDialog, 
  setDialogContent 
}: any) => {
  if (!display) {
    return (
      <></>
    );
  }

  return (
    <Styled.MainContainer>
      <Title localeService={localeService} />
      <PatientInformation 
        name={`${patientProgress.patient.firstName} ${patientProgress.patient.lastName}`}
        email={patientProgress.patient.email}
        flowName={patientProgress.flow.name}
        flowDescription={patientProgress.flow.description}
      />
      <CompletedActivities 
        localeService={localeService}
        patientProgress={patientProgress}
        onClick={(board: Board) => handleOpenCompletedItem(board, setOpenDialog, setDialogContent)}
      />
      <OngoingActivities 
        localeService={localeService}
        patientProgress={patientProgress}
      />
      <LateActivities 
        localeService={localeService}
        patientProgress={patientProgress}
      />
    </Styled.MainContainer>
  );
}

const Title = ({ localeService }: any) => (
  <Styled.NameTitle>
    { localeService.translate("PATIENTS_PROGRESS") }
  </Styled.NameTitle>
);

const CompletedActivities = ({ localeService, patientProgress, onClick }: any) => (
  <Styled.ContainerData>
    <Styled.ContainerHeader>
      <CheckIcon />
      <Styled.ContainerName>
      { localeService.translate("COMPLETED") }
      </Styled.ContainerName>
    </Styled.ContainerHeader>
    <CompletedCards patientProgress={patientProgress} onClick={onClick} />
  </Styled.ContainerData>
);

const CheckIcon = () => (
  <Styled.ItemContent>
    <Styled.IconItem>
      check_circle
    </Styled.IconItem>
  </Styled.ItemContent>
);

const CompletedCards = ({ patientProgress, onClick, }: any) => (
  patientProgress.flow.completed.map((board: Board, index: number) => (
    <Card
      key={index}
      title={board.node.name.toUpperCase()}
      description={`completed at ${board.finished.date}`}
      icon={board.node.icon}
      color={board.node.color}
      onClick={() => onClick(board)}
    />
  ))
);

const Card = ({ title, description, icon, onClick, color }: any) => (
  <Styled.ItemBox onClick={onClick} color={color}>
    <Styled.ItemContent>
      <Styled.ItemName>
        { title }
      </Styled.ItemName>
      <Styled.ItemDescription>
        { description }
      </Styled.ItemDescription>
    </Styled.ItemContent>
    <Styled.ItemContent>
      <Styled.IconItem>
        { icon }
      </Styled.IconItem>
    </Styled.ItemContent>
  </Styled.ItemBox>
);

const OngoingActivities = ({ localeService, patientProgress }: any) => (
  <Styled.ContainerData>
    <Styled.ContainerHeader>
      <PendingIcon />
      <Styled.ContainerName>
      { localeService.translate("ONGOING") }
      </Styled.ContainerName>
    </Styled.ContainerHeader>
    <OngoingCards patientProgress={patientProgress} />
  </Styled.ContainerData>
);

const PendingIcon = () => (
  <Styled.ItemContent>
    <Styled.IconItem>
      pending
    </Styled.IconItem>
  </Styled.ItemContent>
);

const OngoingCards = ({ patientProgress }: any) => (
  patientProgress.flow.ongoing.map((item: any, index: number) => (
    <Card
      key={index}
      title={item.node.name.toUpperCase()}
      description={item.deadline 
        ? `should be completed until ${item.deadline}` 
        : 'deadline date is undefined'
      }
      icon={item.node.icon}
      color={item.node.color}
    />
  ))
);

const LateActivities = ({ localeService, patientProgress }: any) => (
  <Styled.ContainerData>
    <Styled.ContainerHeader>
      <WatchIcon />
      <Styled.ContainerName>
      { localeService.translate("LATE") }
      </Styled.ContainerName>
    </Styled.ContainerHeader>
    <LateCards patientProgress={patientProgress} />
  </Styled.ContainerData>
);

const WatchIcon = () => (
  <Styled.ItemContent>
    <Styled.IconItem>
      watch_later
    </Styled.IconItem>
  </Styled.ItemContent>
);

const LateCards = ({ patientProgress }: any) => (
  patientProgress.flow.late.map((item: any, index: number) => (
    <Card
      key={index}
      title={item.node.name.toUpperCase()}
      description={`should be completed until ${item.deadline}`}
      icon={item.node.icon}
      color={item.node.color}
    />
  ))
);

const PatientInformation = ({ name, email, flowName, flowDescription }: any) => (
  <Styled.CardColumn>
    <Row icon='person' label={name} />
    <Row icon='email' label={email} />
    <Row icon='local_hospital' label={`${flowName} - ${flowDescription}`} />
  </Styled.CardColumn>
);

const Row = ({ icon, label }: any) => (
  <Styled.CardRow>
    <Styled.ItemContent>
      <Styled.IconItem>
        { icon }
      </Styled.IconItem>
    </Styled.ItemContent>
    <Styled.CardTitle>
      { label }
    </Styled.CardTitle>
  </Styled.CardRow>
);


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

function handleOpenCompletedItem(
  board: Board, 
  setOpenDialog: any, 
  setDialogContent: any
) {
  if (board.finished && board.finished.answers) {
    setOpenDialog(true);
    setDialogContent({ 
      node: board.node, 
      flow: board.flow, 
      progress: board.finished 
    });
  }
}

function handleCloseDialog(setOpenDialog: any) {
  setOpenDialog(false);
}