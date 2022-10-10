import React, { useEffect, useState } from "react";
import * as Styled from "./styled";
import { Requests } from "../../../services/axios/requests";
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

export const Patient = () => {
  const [patientProgress, setPatientProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({});
  const { patientId, flowId } = useParams();
  const localeService = new LocaleService();

  const getPatientInfo = () => {
    new Requests().getPatient(patientId, flowId).then((r) => {
      setPatientProgress(r);
      setLoading(false);
    });
  };

  const handleOpenCompletedItem = (node, flow, progress) => {
    if (progress && progress.answers) {
      setOpenDialog(true);
      setDialogContent({ node, flow, progress })
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  useEffect(() => {
    getPatientInfo();
  }, []);

  return (
    <Styled.PageWithDrawer>
      <MenuDrawer />
      <Styled.Container>
        {loading &&
          <ClipLoader />
        }
        {!loading && 
        <Styled.MainContainer>
          <Styled.NameTitle>
            {localeService.translate("PATIENTS_PROGRESS")}
          </Styled.NameTitle>
          <ProfileCard 
            name={`${patientProgress.patient.firstName} ${patientProgress.patient.lastName}`}
            email={patientProgress.patient.email}
            flowName={patientProgress.flow.name}
            flowDescription={patientProgress.flow.description}
          />
          <Styled.ContainerData>
            <Styled.ContainerHeader>
              <Styled.ItemContent>
                <Styled.IconItem>
                  check_circle
                </Styled.IconItem>
              </Styled.ItemContent>
              <Styled.ContainerName>
              {localeService.translate("COMPLETED")}
              </Styled.ContainerName>
            </Styled.ContainerHeader>
            {patientProgress.flow.completed.map((item, index) => (
              <Card
                key={index}
                title={item.node.name.toUpperCase()}
                description={`completed at ${item.finished.date}`}
                icon={item.node.icon}
                color={item.node.color}
                onClick={() => handleOpenCompletedItem(item.node, item.flow, item.finished)}
              />
            ))}
          </Styled.ContainerData>


          <Styled.ContainerData>
            <Styled.ContainerHeader>
              <Styled.ItemContent>
                <Styled.IconItem>
                  pending
                </Styled.IconItem>
              </Styled.ItemContent>
              <Styled.ContainerName>
              {localeService.translate("ONGOING")}
              </Styled.ContainerName>
            </Styled.ContainerHeader>
            {patientProgress.flow.ongoing.map((item, index) => (
              <Card
                key={index}
                title={item.node.name.toUpperCase()}
                description={item.deadline ? `should be completed until ${item.deadline}` : 'deadline date is undefined'}
                icon={item.node.icon}
                color={item.node.color}
              />
            ))}
          </Styled.ContainerData>


          <Styled.ContainerData>
            <Styled.ContainerHeader>
              <Styled.ItemContent>
                <Styled.IconItem>
                  watch_later
                </Styled.IconItem>
              </Styled.ItemContent>
              <Styled.ContainerName>
              {localeService.translate("LATE")}
              </Styled.ContainerName>
            </Styled.ContainerHeader>
            {patientProgress.flow.late.map((item, index) => (
              <Card
                key={index}
                title={item.node.name.toUpperCase()}
                description={`should be completed until ${item.deadline}`}
                icon={item.node.icon}
                color={item.node.color}
              />
            ))}
          </Styled.ContainerData>
        </Styled.MainContainer>
        }
        <Dialog 
          open={openDialog}
          onClose={handleCloseDialog}
          data={dialogContent}
        />
      </Styled.Container>
    </Styled.PageWithDrawer>
  );
};

const ProfileCard = ({ name, email, flowName, flowDescription }) => (
  <Styled.CardColumn>
    <Styled.CardRow>
      <Styled.ItemContent>
        <Styled.IconItem>
          person
        </Styled.IconItem>
      </Styled.ItemContent>
      <Styled.CardTitle>
        { name }
      </Styled.CardTitle>
    </Styled.CardRow>
    <Styled.CardRow>
      <Styled.ItemContent>
        <Styled.IconItem>
          email
        </Styled.IconItem>
      </Styled.ItemContent>
      <Styled.CardTitle>
        { email }
      </Styled.CardTitle>
    </Styled.CardRow>
    <Styled.CardRow>
      <Styled.ItemContent>
        <Styled.IconItem>
          local_hospital
        </Styled.IconItem>
      </Styled.ItemContent>
      <Styled.CardTitle>
        { flowName } - {flowDescription}
      </Styled.CardTitle>
    </Styled.CardRow>
  </Styled.CardColumn>
);

const Card = ({ title, description, icon, onClick, color }) => (
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


const Dialog = ({ open, onClose, data }) => (
  <DialogMaterialUI
    fullWidth={true}
    style={{backgroundColor: 'rgba(0,0,0,0.7)'}}
    maxWidth={"md"}
    open={open}
    onClose={onClose}
    aria-labelledby="max-width-dialog-title"
  >
    <Header 
      title='Details' 
      subtitle={`completed at ${data.progress?.date}`}
    />
    <Body>
      { buildDialogBody(data.node, data.progress?.answers) }
    </Body>
    <Footer>
      <DefaultButton title="Close" onClick={onClose} />
    </Footer>
  </DialogMaterialUI>
);

const Header = ({ title, subtitle }) => (
  <DialogTitle id="max-width-dialog-title">
    { title }
    <DialogContentText>
      { subtitle }
    </DialogContentText>
  </DialogTitle>
);

const Body = ({ children }) => (
  <DialogContent>
    { children }
  </DialogContent>
);

const Footer = ({ children }) => (
  <DialogActions>
    { children }
  </DialogActions>
);

const buildDialogBody = (node, answers) => {
  if (node && node.arguments && answers) {
    const questionsIndex = node.parameters.findIndex(parameter => parameter.type === 'form');
    const questions = node.arguments[questionsIndex];

    return (
      <Styled.Fields>
        {answers.map((answer, index) => (
        <Styled.Field key={index}>
          <Styled.FieldTitle>
            {questions[index].label}
          </Styled.FieldTitle>
          <Styled.FieldContent>
            {answer}
          </Styled.FieldContent>
        </Styled.Field>
        ))}
      </Styled.Fields>
    );
  }
}
