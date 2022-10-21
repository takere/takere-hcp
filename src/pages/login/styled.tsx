/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import theme from "../../assets/themes";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.day.x1};
  align-content: center;
  align-items: center;
  justify-content: center;
`;

export const LoginBox = styled.div`
  background-color: ${theme.colors.night.x5};
  width: 550px;
  border-radius: 16px;
  padding: 35px;
`;

export const NameTitle = styled.h1`
   color: ${theme.colors.night.x1};
   padding: 5px;
`;

export const Description = styled.p`
   color: ${theme.colors.night.x1};
   margin-top: 10px;
  margin-bottom: 10px;
`;

export const Input = styled(TextField)`
  width: 100%;
`;

export const SignInButton = styled(Button)`
  margin-top: 30;
  background-color: ${theme.colors.feedback.success.x1}
  width: 100%;
`;
