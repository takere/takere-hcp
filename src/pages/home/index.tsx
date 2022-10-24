/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from "react";
import * as Styled from "./styled";
import { useHistory } from "react-router-dom";
import MenuDrawer from "../../components/menuDrawer";
import LocaleService from "../../services/locale.service";
import FlowService from "../../services/flow.service";
import TakereHeader from "../../components/takere/header";
import CarePlans from "../../components/carePlans";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const Home = () => {

  const [flows, setFlows] = useState([]);

  const history = useHistory();
  const localeService = new LocaleService();
  const flowService = new FlowService();

  useEffect(() => {
    fetchFlows(flowService, setFlows);
  }, []);
  
  return (
    <Styled.PageWithDrawer>
      <MenuDrawer />
      <Styled.Container>
        <TakereHeader />
        <Styled.ContainerData>
          <PageTitle localeService={localeService} />
            <CarePlans 
              flows={flows} 
              onClick={(event: any, flow: any) => handleClick(
                event, 
                flow, 
                flowService, 
                setFlows, 
                history
              )}
            />
        </Styled.ContainerData>
      </Styled.Container>
    </Styled.PageWithDrawer>
  );
};

export default Home;

const PageTitle = ({ localeService }: any) => (
  <Styled.ContainerHeader>
    <Styled.ContainerName>
      { localeService.translate("CARE_PLANS") }
    </Styled.ContainerName>
  </Styled.ContainerHeader>
);


// ----------------------------------------------------------------------------
//         Functions
// ----------------------------------------------------------------------------
function fetchFlows(flowService: FlowService, setFlows: any) {
  flowService.getMyFlows().then((r: any) => {
    setFlows(r);
  });
}

function handleClick(
  event: any, 
  flow: any, 
  flowService: FlowService, 
  setFlows: any, 
  history: any
) {
  if (event.target.id === "close") {
    flowService.deleteFlowById(flow.id).then(() => {
      fetchFlows(flowService, setFlows);
    });
  } 
  else {
    history.push(`/dash/flow/${flow.id}`);
  }
}
