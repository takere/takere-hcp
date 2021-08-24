import React from 'react';
import * as Styled from './sidebar.styled';
import {NameTitle, SideItem} from "./sidebar.styled";

export const Sidebar = () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <Styled.SideContainer>
            <Styled.TitleContainer>
                <Styled.NameTitle>M-FLOW UFRGS</Styled.NameTitle>
            </Styled.TitleContainer>
            <Styled.SideAside>
                <Styled.SideGraggAside>
                    <Styled.SideItem onDragStart={(event) => onDragStart(event, 'input')} draggable>
                        Input Node
                    </Styled.SideItem>
                    <Styled.SideItem onDragStart={(event) => onDragStart(event, 'default')} draggable>
                        Default Node
                    </Styled.SideItem>
                    <Styled.SideItem onDragStart={(event) => onDragStart(event, 'output')} draggable>
                        Output Node
                    </Styled.SideItem>
                </Styled.SideGraggAside>
            </Styled.SideAside>
        </Styled.SideContainer>
    );
};