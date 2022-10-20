/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { DatePicker } from "@material-ui/pickers";
import theme from "../../assets/themes";


export const InputDefault = styled(TextField)`
  width: 100%;
  padding-top: 45px;
`;

export const InputDatePicker = styled(DatePicker)`
  width: 100%;
  padding-top: 45px;
`;

export const Spacing = styled.div`
  margin-bottom: 20px;
`;

export const TextName = styled.p`
  color: ${theme.colors.night.x1};
  margin-top: 0;
  margin-bottom: 5px;
`;
