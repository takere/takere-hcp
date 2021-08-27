import React from 'react'
import styled from 'styled-components'
import {theme} from "../../utils/colors";
import TextField from "@material-ui/core/TextField";

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.day.x1};
  align-content: center;
  align-items: center;
  justify-content: center;
`

export const LoginBox = styled.div`
  background-color: ${theme.colors.night.x5};
  width: 550px;
  border-radius: 16px;
  padding: 35px;
`

export const NameTitle = styled.h1`
   color: ${theme.colors.night.x1};
   padding: 5px;
`;

export const Description = styled.p`
   color: ${theme.colors.night.x1};
   margin-top: 10px;
  margin-bottom: 10px;
`;

export const Input= styled(TextField)`
  width: 100%;
`;
