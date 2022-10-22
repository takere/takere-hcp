/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from "react";
import * as Styled from "./styled";
import ProgressService from "../../services/progress.service";
import { useHistory } from "react-router-dom";
import { MenuDrawer } from "../../components/menuDrawer";
import LocaleService from "../../services/locale.service";
import Progress from "../../domain/progress.domain";
import PatientCard from "../../parts/card/patient";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const Patients = () => {
  
  const [patients, setPatients]: any = useState([]);

  const history = useHistory();
  const localeService = new LocaleService();
  const progressService = new ProgressService();

  useEffect(() => {
    fetchPatients(progressService, setPatients);
  }, []);

  return (
    <Styled.PageWithDrawer>
      <MenuDrawer />
      <Styled.Container>
        <Styled.ContainerData>
          <Title localeService={localeService} />
          {patients.map((patient: Progress, index: number) => (
            <PatientCard
              key={index}
              firstName={patient.patient.firstName}
              lastName={patient.patient.lastName}
              flowName={patient.flow.name}
              onClick={(_: any) => handleClick(patient, history)}
            />
          ))}
        </Styled.ContainerData>
      </Styled.Container>
    </Styled.PageWithDrawer>
  );
};

export default Patients;

const Title = ({ localeService }: any) => (
  <Styled.NameTitle>
    {localeService.translate("PATIENTS")}
  </Styled.NameTitle>
);


// ----------------------------------------------------------------------------
//         Functions
// ----------------------------------------------------------------------------
function handleClick(patient: Progress, history: any) {
  history.push(`/patients/${patient.patient.id}/${patient.flow.id}`);
}

function fetchPatients(progressService: ProgressService, setPatients: any) {
  progressService.getPatients().then((fetchedPatients: Progress[]) => {
    setPatients(fetchedPatients);
  });
}
