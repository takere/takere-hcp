import React from 'react';
import { Handle } from 'react-flow-renderer';
import Icon from '@material-ui/core/Icon';
import * as Styled from "./timerTickNode.styled";
import {theme} from "../../../utils/colors";

export const TimerTickNode = (data) => {

    return (
        <Styled.Node>
            <Styled.NodeContainer>
                <Styled.NodeName>{data.data.label}</Styled.NodeName>
                <Icon style={{textAlign: 'center', fontSize: 28, color: theme.colors.night.x1 }}>{data.data.icon}</Icon>
            </Styled.NodeContainer>
            {
                data?.data?.handles && data?.data?.handles.map((h,i) => {
                    return (
                        <Handle
                            key={i}
                            type={h.type}
                            position={h.position}
                            id={h.id}
                            style={{ ...h.style, borderColor: theme.colors.night.x1, backgroundColor: theme.colors.night.x1 }}
                        />
                    )
                })
            }
        </Styled.Node>
    );
};
