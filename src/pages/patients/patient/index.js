import React, { useEffect, useState } from "react";
import * as Styled from "./styled";
import { Requests } from "../../../services/axios/requests";
import { useHistory } from "react-router-dom";
import { MenuDrawer } from "../../../components/menuDrawer/menuDrawer";
import {
  useParams
} from "react-router-dom";

export const Patient = () => {
  const [patients, setPatients] = useState([]);
  const { id } = useParams();

  const getPatientInfo = () => {
    new Requests().getPatients().then((r) => {
      setPatients(r);
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
          Patient {id}
        </Styled.NameTitle>
        <Styled.ContainerData>
          
        </Styled.ContainerData>
      </Styled.Container>
    </Styled.PageWithDrawer>
  );
};
