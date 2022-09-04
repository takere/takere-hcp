import React from 'react';
import * as Styled from './menuDrawer.styled';
import { Link, useHistory } from "react-router-dom";
import { makeLogout } from "../../services/auth/auth";

const MENU = [
    {
        icon: 'home',
        path: '/'
    },
    {
        icon: 'person',
        path: '/profile'
    },
    {
        icon: 'healing',
        path: '/patients'
    },
]

export const MenuDrawer = () => {
    const history = useHistory();

    const handleLogout = () => {
        makeLogout();
        history.push('/login');
    }

    const handleNew = () => {
        history.push('/dash');
    }

    return (
        <Styled.SideContainer>
            <Styled.Spacing />
            {
                MENU.map((m,i) => (
                    <Link to={`${m.path}`} key={i}>
                        <Styled.SideItem>
                            <Styled.IconItem>{m.icon}</Styled.IconItem>
                        </Styled.SideItem>
                    </Link>
                ))
            }
            <Styled.SideAddItem onClick={handleNew}>
                <Styled.IconHighlight>add</Styled.IconHighlight>
            </Styled.SideAddItem>
            <Styled.ExitSideItem onClick={handleLogout}>
                <Styled.IconExit>logout</Styled.IconExit>
            </Styled.ExitSideItem>
        </Styled.SideContainer>
    )
}
