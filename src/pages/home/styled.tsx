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
`

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
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

export const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

export const LogoImage = styled.img`
  height: 80px;
`;

export const NameTitle = styled.h1`
   color: ${theme.colors.day.x1};
`;

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

export const Flow = styled.div`
  min-height: 400px;
  border-radius: 16px;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(5, 5fr);
  grid-auto-rows: 100px 100px;
`

export const ContainerData = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
  background-color: ${theme.colors.night.x5};
  padding: 30px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
`;
