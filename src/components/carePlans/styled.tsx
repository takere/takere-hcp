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
export const ItemBox = styled.div`
  background-color: ${theme.colors.night.x5};
  max-width: 230px;
  justify-content: center;
  align-content: center;
  border-radius: 16px;
  flex: 1;
  border-left: 5px solid;
  border-color: ${theme.colors.night.x5};
  cursor: pointer;
  z-index: 1;
  position: relative;
`;

export const DeleteButton = styled.div`
  background-color: ${theme.colors.night.x5};
  width: 25px;
  height: 25px;
  border-radius: 16px;
  cursor: pointer;
  position: absolute;
  right: 0;
  z-index: 999999;

`;

export const IconItem = styled(Icon)`
  font-size: 24px;
  color: ${theme.colors.night.x1};
  text-align: center;
  justify-content: center;
  align-content: center;
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

export const Gallery = styled.div`
  min-height: 400px;
  border-radius: 16px;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(5, 5fr);
  grid-auto-rows: 100px 100px;
`;
