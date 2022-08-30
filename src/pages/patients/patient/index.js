import React, { useEffect, useState } from "react";
import * as Styled from "./styled";
import { Requests } from "../../../services/axios/requests";
import { useHistory } from "react-router-dom";
import { MenuDrawer } from "../../../components/menuDrawer/menuDrawer";
import {
  useParams
} from "react-router-dom";

export const Patient = () => {
  const [patient, setPatient] = useState([]);
  const { idPatient, idFlow } = useParams();

  const getPatientInfo = () => {
    new Requests().getPatient(idPatient, idFlow).then((r) => {
      setPatient(r);
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
        <ProfileCard 
            name={'William Niemiec'}
            email={'william@email.com'}
            flowName={'Diabetes'}
            flowDescription={'Patient with diabetes'}
            onClick={() => {}}
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
          <Card 
            title={'Medication control'}
            description={'completed at 23/08/2022 14:23:04'}
            icon={'healing'}
            onClick={() => {}}
          />
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
          
        </Styled.ContainerData>
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

