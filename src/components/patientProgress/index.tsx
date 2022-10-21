/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Styled from "./styled";
import Board from "../../domain/board.domain";
import FullCard from "../../parts/card/full";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const PatientProgress = ({ 
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
    <Styled.Container>
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
    </Styled.Container>
  );
}

export default PatientProgress;

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
    <FullCard
      key={index}
      title={board.node.name.toUpperCase()}
      description={`completed at ${board.finished.date}`}
      icon={board.node.icon}
      color={board.node.color}
      onClick={() => onClick(board)}
    />
  ))
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
    <FullCard
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
    <FullCard
      key={index}
      title={item.node.name.toUpperCase()}
      description={`should be completed until ${item.deadline}`}
      icon={item.node.icon}
      color={item.node.color}
    />
  ))
);

const PatientInformation = ({ name, email, flowName, flowDescription }: any) => (
  <Styled.List>
    <Item icon='person' label={name} />
    <Item icon='email' label={email} />
    <Item icon='local_hospital' label={`${flowName} - ${flowDescription}`} />
  </Styled.List>
);

const Item = ({ icon, label }: any) => (
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
