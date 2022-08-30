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
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({});
  const { idPatient, idFlow } = useParams();

  const getPatientInfo = () => {
    new Requests().getPatient(idPatient, idFlow).then((r) => {
      setPatient(r);
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
        <Styled.NameTitle>
          Patient progress
        </Styled.NameTitle>
        {loading &&
          <ClipLoader />
        }
        {!loading && 
        <>
          <ProfileCard 
            name={`${patient.firstName} ${patient.lastName}`}
            email={patient.email}
            flowName={patient.flow.name}
            flowDescription={patient.flow.description}
          />
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
          <Styled.ContainerData>
            {patient.flow.completed.map((item, index) => (
              <Card
                key={index}
                title={item.node.type}
                description={`completed at ${item.date}`}
                icon={item.node.icon}
                onClick={() => handleOpenCompletedItem(item.node.type, item.result, item.date)}
              />
            ))}
          </Styled.ContainerData>


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
          <Styled.ContainerData>
            {patient.flow.ongoing.map((item, index) => (
              <Card
                key={index}
                title={item.node.name}
                description={item.deadline ? `should be completed until ${item.deadline}` : 'deadline date is undefined'}
                icon={item.node.icon}
              />
            ))}
          </Styled.ContainerData>


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
          <Styled.ContainerData>
            {patient.flow.late.map((item, index) => (
              <Card
                key={index}
                title={item.node.name}
                description={`should be completed until ${item.deadline}`}
                icon={item.node.icon}
              />
            ))}
          </Styled.ContainerData>
        </>
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

const Card = ({ title, description, icon, onClick }) => (
  <Styled.ItemBox onClick={onClick}>
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
