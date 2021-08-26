import React from 'react';
import * as Styled from './menuDrawer.styled';
import {Link, useRouteMatch} from "react-router-dom";

const MENU = [
    {
        icon: 'home',
        path: '/'
    },
    {
        icon: 'person',
        path: '/profile'
    }
]

export const MenuDrawer = () => {
    let { path, url } = useRouteMatch();

    return (
        <Styled.SideContainer>
            {
                MENU.map(m => (
                    <Link to={`${m.path}`}>
                        <Styled.SideItem>
                            <Styled.IconItem>{m.icon}</Styled.IconItem>
                        </Styled.SideItem>
                    </Link>
                ))
            }
            <Styled.ExitSideItem>
                <Styled.IconExit>logout</Styled.IconExit>
            </Styled.ExitSideItem>
        </Styled.SideContainer>
    )
}