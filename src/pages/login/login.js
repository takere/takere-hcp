import React, { useState } from 'react';
import * as Styled from './login.styled';
import Button from "@material-ui/core/Button";
import theme from "../../assets/themes";
import {makeLogin} from "../../services/auth/auth";
import {useHistory} from "react-router-dom";

export const Login = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async () => {
        const result = await makeLogin(email, password);
        if(result){
            history.push('/');
        } else {
            setError(true);
        }
    }

    return (
        <Styled.Container>
            <Styled.NameTitle>login - mflow</Styled.NameTitle>
            <Styled.LoginBox>
                <Styled.Description>Email</Styled.Description>
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
                <Styled.Description style={{marginTop: 30}}>Password</Styled.Description>
                <Styled.Input
                    id="outlined-basic"
                    label="Senha"
                    variant="outlined"
                    type="password"
                    error={error}
                    value={password}
                    onChange={handlePasswordChange}
                    size="medium"
                    placeholder="Digita sua senha"
                />
                <Button
                    style={{marginTop: 30,
                        backgroundColor: theme.colors.feedback.success.x1,
                        width: '100%'}}
                    onClick={handleSubmit}
                    variant="contained">
                    Entrar
                </Button>
            </Styled.LoginBox>
        </Styled.Container>
    );
}
