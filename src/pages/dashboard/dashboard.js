import React, {useEffect, useState} from 'react';
import Diagrams from "../../components/diagrams";
import {
    useParams
} from "react-router-dom";
import {Requests} from "../../services/axios/requests";
import { MenuDrawer } from "../../components/menuDrawer/menuDrawer";
import * as Styled from "./dashboard.styled";

export const Dashboard = () => {
    const [flow, setFlow] = useState(null);
    const [nodeConnections, setNodeConnections] = useState([]);
    const { id } = useParams();


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
        new Requests().getNodeConnections().then(r => {
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
