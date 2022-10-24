/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import theme from "../../../assets/themes";
import TextField from "@material-ui/core/TextField";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
export const Container = styled.div`
  background-color: ${theme.colors.day.x2};
  width: 550px;
  border-radius: 16px;
  border: 1px solid #aaa;
  padding: 35px;
  margin: 20px 0;
`;

export const Input = styled(TextField)`
  width: 100%;
`;

export const InputField = styled.div`
  margin: 20px 0;
`;

