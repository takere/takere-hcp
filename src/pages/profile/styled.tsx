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
export const PageWithDrawer = styled.div`
  flex-direction: row;
  display: flex;
  flex: 1;
`;

export const Container = styled.div`
  flex: 1;
  background-image: url('/assets/images/profile.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const NameTitle = styled.h1`
   color: ${theme.colors.day.x1};
   padding-left: 30px;
   padding-top: 30px;
   text-shadow: 0 0 4px  ${theme.colors.day.x1};
`;

export const ContainerData = styled.div`
  flex-direction: column;
  
  margin: 20px;
  min-height: 200px;
  flex: 1;
  background-color: ${theme.colors.night.x5};
  border-radius: 16px;
`;
