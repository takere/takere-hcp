/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import theme from "../../assets/themes";
import Icon from "@material-ui/core/Icon";


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
  background-color: ${theme.colors.day.x1};
  padding: 30px;
  background-image: url('/assets/images/peace.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ContainerName = styled.h1`
color: ${theme.colors.day.x1};
text-shadow: 0 0 4px  ${theme.colors.day.x1};
margin: 0;
margin-bottom: 20px;
`;

export const ContainerData = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
  background-color: ${theme.colors.night.x5};
  padding: 30px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
`;
