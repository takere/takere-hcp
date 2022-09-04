import styled from 'styled-components'
import {theme} from "../../utils/colors";
import Icon from "@material-ui/core/Icon";

export const PageWithDrawer = styled.div`
  flex-direction: row;
  display: flex;
  flex: 1;
`;

export const Container = styled.div`
  flex: 1;
  background-color: ${theme.colors.day.x1};
  padding: 30px;
  background-image: url('/assets/images/empathy.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

export const NameTitle = styled.h1`
   color: ${theme.colors.night.x1};
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
  margin-right: 20px;
`;

export const ItemName = styled.h4`
   padding-left: 10px; 
   color: ${theme.colors.night.x1};
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
  color: ${theme.colors.night.x1};
  text-overflow: clip;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ContainerData = styled.div`
  margin-top: 30px;
  min-height: 400px;
  overflow-y: auto;
  background-color: ${theme.colors.night.x5};
  padding: 30px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
`
export const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;
