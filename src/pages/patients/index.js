import React, { useEffect, useState } from "react";
import * as Styled from "./styled";
import ProgressService from "../../services/progress.service";
import { useHistory } from "react-router-dom";
import { MenuDrawer } from "../../components/menuDrawer/menuDrawer";
import LocaleService from "../../services/locale.service";

export const Patients = () => {
  const [patients, setPatients] = useState([]);
  const history = useHistory();
  const localeService = new LocaleService();
  const progressService = new ProgressService();

  const getPatients = () => {
    progressService.getPatients().then((r) => {
      setPatients(r);
    });
  };

  useEffect(() => {
    getPatients();
  }, []);

  const handleClick = (e, patient) => {
    history.push(`/patients/${patient.patient.id ?? patient.patient._id}/${patient.flow.id}`);
  };

  return (
    <Styled.PageWithDrawer>
      <MenuDrawer />
      <Styled.Container>
        <Styled.ContainerData>
          <Styled.NameTitle>
            {localeService.translate("PATIENTS")}
          </Styled.NameTitle>
          {patients.map((patient, index) => (
            <Patient 
              key={index}
              firstName={patient.patient.firstName}
              lastName={patient.patient.lastName}
              flowName={patient.flow.name}
              onClick={(e) => handleClick(e, patient)}
            />
          ))}
        </Styled.ContainerData>
      </Styled.Container>
    </Styled.PageWithDrawer>
  );
};

const Patient = ({ firstName, lastName, flowName, onClick }) => (
  <Styled.ItemBox onClick={onClick}>
    <Styled.ItemContent>
      <Styled.ItemName>
        { firstName } { lastName }
      </Styled.ItemName>
      <Styled.ItemDescription>
        { flowName }
      </Styled.ItemDescription>
    </Styled.ItemContent>
    <Styled.ItemContent>
      <Styled.IconItem>
        person
      </Styled.IconItem>
    </Styled.ItemContent>
  </Styled.ItemBox>
);
