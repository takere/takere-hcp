import React, {useEffect, useState} from 'react';
import Diagrams from "../../components/diagrams";
import {
    useParams
} from "react-router-dom";
import { MenuDrawer } from "../../components/menuDrawer/menuDrawer";
import * as Styled from "./dashboard.styled";
import NodeService from '../../services/node.service';

export const Dashboard = () => {
    const [flow, setFlow] = useState(null);
    const [nodeConnections, setNodeConnections] = useState([]);
    const { id } = useParams();
    const nodeService = new NodeService();


    useEffect(() => {
        if(id) {
            new Requests().getFlowById(id).then(r => {
                setFlow(r);
            })
        } else {
            setFlow(null)
        }
    }, [id]);

    useEffect(() => {
        nodeService.getNodeConnections().then(r => {
            setNodeConnections(r);
        });
    }, []);

    return (
        <Styled.PageWithDrawer>
            <MenuDrawer />
            <Diagrams flowDb={flow} nodeConnections={nodeConnections}/>
        </Styled.PageWithDrawer>
    );
}
