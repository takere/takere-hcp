import React, { useState } from 'react';
import * as Styled from './login.styled';
import Button from "@material-ui/core/Button";
import theme from "../../assets/themes";
import UserService from '../../services/user.service';
import {useHistory} from "react-router-dom";
import LocaleService from "../../services/locale.service";

export const Login = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const localeService = new LocaleService();
    const userService = new UserService();

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async () => {
        const result = await userService.makeLogin(email, password);
        if(result){
            history.push('/');
        } else {
            setError(true);
        }
    }

    return (
        <Styled.Container>
            <Styled.NameTitle>Takere - HCP: {localeService.translate("LOGIN")}</Styled.NameTitle>
            <Styled.LoginBox>
                <Styled.Description>
                {localeService.translate("EMAIL")}
                </Styled.Description>
                <Styled.Input
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    error={error}
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    size="medium"
                    placeholder="Digite seu email"
                />
                <Styled.Description style={{marginTop: 30}}>
                {localeService.translate("PASSWORD")}
                </Styled.Description>
                <Styled.Input
                    id="outlined-basic"
                    label={localeService.translate("PASSWORD")}
                    variant="outlined"
                    type="password"
                    error={error}
                    value={password}
                    onChange={handlePasswordChange}
                    size="medium"
                    placeholder={localeService.translate("TYPE_PASSWORD")}
                />
                <Button
                    style={{marginTop: 30,
                        backgroundColor: theme.colors.feedback.success.x1,
                        width: '100%'}}
                    onClick={handleSubmit}
                    variant="contained">
                    {localeService.translate("SIGN_IN")}
                </Button>
            </Styled.LoginBox>
        </Styled.Container>
    );
}
