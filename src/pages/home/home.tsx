import React, { useEffect, useState } from "react";
import * as Styled from "./home.styled";
import { useHistory } from "react-router-dom";
import { MenuDrawer } from "../../components/menuDrawer/menuDrawer";
import LocaleService from "../../services/locale.service";
import FlowService from "../../services/flow.service";

export const Home = () => {
  const [flows, setFlows] = useState([]);
  const history = useHistory();
  const localeService = new LocaleService();
  const flowService = new FlowService();

  const getFlows = () => {
    flowService.getMyFlows().then((r) => {
      setFlows(r);
    });
  };

  useEffect(() => {
    getFlows();
  }, []);

  const handleClick = (e: any, flow: any) => {
    if (e.target.id === "close") {
      flowService.deleteFlowById(flow._id).then(() => {
        getFlows();
      });
    } else {
      history.push(`/dash/flow/${flow._id}`);
    }
  };
  
  return (
    <Styled.PageWithDrawer>
      <MenuDrawer />
      <Styled.Container>
        <Styled.Logo>
          <Styled.LogoImage src='/assets/images/logo.png' alt='takere logo' />
        </Styled.Logo>
        <Styled.ContainerData>
          <Styled.ContainerHeader>
              <Styled.ContainerName>
                {localeService.translate("CARE_PLANS")}
              </Styled.ContainerName>
            </Styled.ContainerHeader>
            <Styled.Flow>
          {flows.map((f: any) => {
            return (
              <Styled.ItemBox
                id={"box"}
                key={f.id}
                onClick={(e: any) => handleClick(e, f)}
              >
                <Styled.DeleteButton id={"close"}>
                  <Styled.IconItem id={"close"}>close</Styled.IconItem>
                </Styled.DeleteButton>
                <Styled.ItemName id={"box"}>{f.name}</Styled.ItemName>
                <Styled.ItemDescription id={"box"}>
                  {f.description}
                </Styled.ItemDescription>
              </Styled.ItemBox>
            );
          })}
          </Styled.Flow>
        </Styled.ContainerData>
      </Styled.Container>
    </Styled.PageWithDrawer>
  );
};
