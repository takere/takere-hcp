/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from "styled-components";
import theme from "../../../assets/themes";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
export const Fields = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const FieldTitle = styled.h4`
  margin: 0;
  color: ${theme.colors.night.x1};
  text-overflow: clip;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 23px;
`;

export const FieldContent = styled.p`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  word-break: break-all;
`;