import React, {useEffect, useState} from 'react';
import * as Styled from './profile.styled';
import { MenuDrawer } from "../../components/menuDrawer/menuDrawer";

export const Profile = () => {
    const userData = JSON.parse(localStorage.getItem('user'));

    return (
        <Styled.PageWithDrawer>
        <MenuDrawer />
            <Styled.Container>
                <Styled.ContainerData>
                <Styled.NameTitle>Profile</Styled.NameTitle>
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
