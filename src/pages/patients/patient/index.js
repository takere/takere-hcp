import React, { useEffect, useState } from "react";
import * as Styled from "./styled";
import { Requests } from "../../../services/axios/requests";
import { useHistory } from "react-router-dom";
import { MenuDrawer } from "../../../components/menuDrawer/menuDrawer";
import {
  useParams
} from "react-router-dom";
import { ClipLoader } from "react-spinners";

export const Patient = () => {
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(true);
  const { idPatient, idFlow } = useParams();

  const getPatientInfo = () => {
    new Requests().getPatient(idPatient, idFlow).then((r) => {
      setPatient(r);
      setLoading(false);
    });
  };

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
                title={item.node.name}
                description={`completed at ${item.date}`}
                icon={item.node.icon}
                onClick={() => { console.log(item.result) }}
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

