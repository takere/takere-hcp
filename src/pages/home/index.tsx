/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from "react";
import * as Styled from "./styled";
import { useHistory } from "react-router-dom";
import { MenuDrawer } from "../../components/menuDrawer/menuDrawer";
import LocaleService from "../../services/locale.service";
import FlowService from "../../services/flow.service";


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
            <Styled.Gallery>
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
          </Styled.Gallery>
        </Styled.ContainerData>
      </Styled.Container>
    </Styled.PageWithDrawer>
  );
};

export default Home;

const TakereHeader = () => (
  <Styled.Logo>
    <Styled.LogoImage src='/assets/images/logo.png' alt='takere logo' />
  </Styled.Logo>
);

const PageTitle = ({ localeService }: any) => (
  <Styled.ContainerHeader>
    <Styled.ContainerName>
      { localeService.translate("CARE_PLANS") }
    </Styled.ContainerName>
  </Styled.ContainerHeader>
);

const CarePlans = ({ flows, onClick }: any) => {
  return flows.map((flow: any) => (
    <Styled.ItemBox
      id={"box"}
      key={flow.id}
      onClick={onClick}
    >
      <DeleteButton />
      <Styled.ItemName id={"box"}>
        { flow.name }
      </Styled.ItemName>
      <Styled.ItemDescription id={"box"}>
        { flow.description }
      </Styled.ItemDescription>
    </Styled.ItemBox>
  ));
};

const DeleteButton = () => (
  <Styled.DeleteButton id={"close"}>
    <Styled.IconItem id={"close"}>
      close
    </Styled.IconItem>
  </Styled.DeleteButton>
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
    flowService.deleteFlowById(flow._id).then(() => {
      fetchFlows(flowService, setFlows);
    });
  } 
  else {
    history.push(`/dash/flow/${flow._id}`);
  }
}
