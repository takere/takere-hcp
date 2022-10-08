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

export const Patient = () => {
  const [patientProgress, setPatientProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({});
  const { patientId, flowId } = useParams();

  const getPatientInfo = () => {
    new Requests().getPatient(patientId, flowId).then((r) => {
      setPatientProgress(r);
      setLoading(false);
    });
  };

  const handleOpenCompletedItem = (type, result, date) => {
    console.log(result)

    if (type === 'QUIZ') {
      setOpenDialog(true);
      setDialogContent({ type, payload: result, date })
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
            Patient progress
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
                Completed
              </Styled.ContainerName>
            </Styled.ContainerHeader>
            {patientProgress.flow.completed.map((item, index) => (
              <Card
                key={index}
                title={item.node.name.toUpperCase()}
                description={`completed at ${item.finished.date}`}
                icon={item.node.icon}
                color={item.node.color}
                onClick={() => handleOpenCompletedItem(item.node.name, item.finished.answers, item.finished.date)}
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
                Ongoing
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
                Late
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
      subtitle={`completed at ${data.date}`}
    />
    <Body>
      { buildDialogBody(data.type, data.payload) }
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

const buildDialogBody = (type, payload) => {
  if (type === 'QUIZ') {
    return (
      <Styled.Fields>
        {payload.map((question, index) => (
        <Styled.Field>
          <Styled.FieldTitle>
            {question.question}
          </Styled.FieldTitle>
          <Styled.FieldContent>
            {question.answer}
          </Styled.FieldContent>
        </Styled.Field>
        ))}
      </Styled.Fields>
    );
  }
}
