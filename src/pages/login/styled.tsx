/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import theme from "../../assets/themes";


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

export const NameTitle = styled.h1`
   color: ${theme.colors.night.x1};
   padding: 5px;
`;
