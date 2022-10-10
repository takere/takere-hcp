import React, {useEffect, useState} from 'react';
import * as Styled from './profile.styled';
import { MenuDrawer } from "../../components/menuDrawer/menuDrawer";
import LocaleService from "../../services/locale.service";

export const Profile = () => {
    const localeService = new LocaleService();
    const userData = JSON.parse(localStorage.getItem('user'));

    return (
        <Styled.PageWithDrawer>
        <MenuDrawer />
            <Styled.Container>
                <Styled.ContainerData>
                <Styled.NameTitle>
                    {localeService.translate("PROFILE")}
                </Styled.NameTitle>
                    {
                        userData ? (
                            <>
                                <Styled.Spacing />
                                <Styled.TextDescription>
                                    {localeService.translate("NAME")}: {userData.firstName}
                                    </Styled.TextDescription>
                                <Styled.TextDescription>
                                    {localeService.translate("EMAIL")}: {userData.email}
                                    </Styled.TextDescription>
                            </>
                        ) : null
                    }
                </Styled.ContainerData>
            </Styled.Container>
        </Styled.PageWithDrawer>
    );
}
