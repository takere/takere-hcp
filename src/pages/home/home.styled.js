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
  background-image: url('/assets/images/peace.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

export const NameTitle = styled.h1`
   color: ${theme.colors.night.x1};
`;

export const HelloBox = styled.div`
  background-color: ${theme.colors.night.x5};
  width: 450px;
  height: 50px;
  justify-content: center;
  align-content: center;
  border-radius: 16px;
  border-left: 5px solid;
  border-color: ${theme.colors.night.x5};
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
  background-color: ${theme.colors.night.x5};
  padding: 30px;
  border-radius: 16px;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(5, 5fr);
  grid-auto-rows: 100px 100px;
`
