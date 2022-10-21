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
export const NameTitle = styled.h1`
   color: ${theme.colors.day.x1};
   text-shadow: 0 0 4px  ${theme.colors.day.x1};
   margin: 0;
   margin-bottom: 20px;
`;

export const ContainerName = styled.h3`
   color: ${theme.colors.day.x1};
   margin: 0;
`;

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const IconItem = styled(Icon)`
  font-size: 24px;
  color: ${theme.colors.day.x1};
  text-align: center;
  margin-right: 20px;
`;

export const Container = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
  background-color: ${theme.colors.night.x5};
  padding: 30px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
`;

export const ContainerData = styled.div`
  margin-top: 10px;
  margin-bottom: 30px;
  max-height: 400px;
  overflow-y: auto;
  background-color: ${theme.colors.night.x5};
  padding: 30px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
`;

export const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

export const CardRow = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  margin: 10px 0;
  padding-left: 10px;
`;

export const List = styled.div`
  background-color: ${theme.colors.night.x5};
  display: flex;
  align-content: center;
  border-radius: 16px;
  border-left: 5px solid;
  margin-bottom: 20px;
  border-color: ${theme.colors.night.x5};
  flex-direction: column;
  justify-content: center;
`;

export const CardTitle = styled.p`
  padding-left: 10px; 
  margin: 0;
  color: ${theme.colors.day.x1};
  text-overflow: clip;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 23px;
`;
