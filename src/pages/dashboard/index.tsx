/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from "react";
import Diagrams from "../../components/diagrams";
import { useParams } from "react-router-dom";
import { MenuDrawer } from "../../components/menuDrawer/menuDrawer";
import * as Styled from "./styled";
import NodeService from "../../services/node.service";
import FlowService from "../../services/flow.service";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const Dashboard = () => {

  const [flow, setFlow] = useState(null);
  const [nodeConnections, setNodeConnections] = useState([]);

  const { id }: any = useParams();
  const nodeService = new NodeService();
  const flowService = new FlowService();

  useEffect(() => {
    if (id) {
      flowService
        .getFlowById(id)
        .then((fetchedFlow: any) => {
          setFlow(fetchedFlow);
        });
    }
    else {
      setFlow(null);
    }
  }, [id]);

  useEffect(() => {
    nodeService
      .getNodeConnections()
      .then((connections: any) => {
        setNodeConnections(connections);
      });
  }, []);

  return (
    <Styled.PageWithDrawer>
      <MenuDrawer />
      <Diagrams flowDb={flow} nodeConnections={nodeConnections} />
    </Styled.PageWithDrawer>
  );
};

export default Dashboard;
