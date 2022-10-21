/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import theme from "../../../assets/themes";
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

export const ItemBox = styled.div`
  background-color: ${theme.colors.night.x5};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  border-radius: 16px;
  border-left: 5px solid;
  margin-bottom: 20px;
  border-color: ${theme.colors.night.x5};
  cursor: pointer;
`;

export const IconItem = styled(Icon)`
  font-size: 24px;
  color: ${theme.colors.day.x1};
  text-align: center;
  margin-right: 20px;
`;

export const ItemName = styled.h4`
   padding-left: 10px; 
   color: ${theme.colors.day.x1};
  text-overflow: clip;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ItemDescription = styled.p`
  padding-left: 10px;
  margin-top: -10px;
  padding-right: 5px;
  color: ${theme.colors.day.x1};
  text-overflow: clip;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;
