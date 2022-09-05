import styled from 'styled-components'
import {theme} from "../../../utils/colors";
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

export const ItemBox = styled.div`
  background-color: ${theme.colors.night.x2};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  border-radius: 16px;
  border-left: 5px solid;
  margin-bottom: 20px;
  border-color: ${theme.colors.night.x2};
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

export const MainContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
  background-color: ${theme.colors.night.x5};
  padding: 30px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
`

export const ContainerData = styled.div`
  margin-top: 10px;
  margin-bottom: 30px;
  min-height: 400px;
  max-height: 400px;
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

export const CardRow = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  margin: 10px 0;
  padding-left: 10px;
`;

export const CardColumn = styled.div`
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
