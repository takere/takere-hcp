import React, {useEffect, useState} from 'react';
import Diagrams from "../../components/diagrams/diagrams";
import {
    useParams
} from "react-router-dom";
import {Requests} from "../../services/axios/requests";

export const Dashboard = () => {
    const [flow, setFlow] = useState(null);
    const { id } = useParams();


    useEffect(() => {
        console.log(id)
        if(id) {
            new Requests().getFlowById(id).then(r => {
                console.log(r)
                setFlow(r);
            })
        } else {
            setFlow(null)
        }
    }, [id])

    return (
        <Diagrams flowDb={flow}/>
    );
}
