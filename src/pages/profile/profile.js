import React, {useEffect, useState} from 'react';
import * as Styled from './profile.styled';
import {Requests} from "../../services/axios/requests";
import { MenuDrawer } from "../../components/menuDrawer/menuDrawer";

export const Profile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        new Requests().getMe().then(r => {
            setUserData(r);
        })
    }, [])

    return (
        <Styled.PageWithDrawer>
        <MenuDrawer />
            <Styled.Container>
                <Styled.NameTitle>Profile</Styled.NameTitle>
                <Styled.ContainerData>
                    {
                        userData ? (
                            <>
                                <Styled.Spacing />
                                <Styled.TextDescription>Nome: {userData.firstName}</Styled.TextDescription>
                                <Styled.TextDescription>Email: {userData.email}</Styled.TextDescription>
                            </>
                        ) : null
                    }
                </Styled.ContainerData>
            </Styled.Container>
        </Styled.PageWithDrawer>
    );
}
