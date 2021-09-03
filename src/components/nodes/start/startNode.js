import React from 'react';
import ReactFlow, { Handle } from 'react-flow-renderer';
import Icon from '@material-ui/core/Icon';
import * as Styled from "./startNode.styled";
import {theme} from "../../../utils/colors";

export const StartNode = (data) => {
    return (
        <Styled.Node>
            <Styled.NodeContainer>
                <Styled.NodeName>{data.data.label}</Styled.NodeName>
                <Icon style={{textAlign: 'center', fontSize: 28, color: theme.colors.night.x1 }}>{data.data.icon}</Icon>
            </Styled.NodeContainer>
            <Handle
                type="source"
                position="bottom"
                id="a"
                style={{ left: '50%', borderRadius: 8, width: 20, height: 12, borderColor: theme.colors.night.x1, backgroundColor: theme.colors.night.x1 }}
            />
        </Styled.Node>
    );
};
