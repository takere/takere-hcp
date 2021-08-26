import styled from "styled-components";
import {theme} from "../../utils/colors";
import TextField from '@material-ui/core/TextField';

export const SideContainer = styled.div`
  background-color: ${theme.colors.day.x1};
  width: 350px;
  padding: 15px 10px;
  font-size: 12px;
  border-left: 3px solid;
  border-color: ${theme.colors.night.x1};
`;

export const SideAside = styled.aside`
  width: 100%;
`;

export const SideGraggAside = styled.aside`
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: grab;
`;

export const InputSearch = styled(TextField)`
  width: 100%;
`;

export const SideItem = styled.div`
  margin-bottom: 5px;
  background-color: ${theme.colors.night.x1};
  padding: 10px;
  text-align: center;
  border-radius: 8px;
  color: ${theme.colors.day.x1};
  font-weight: 400;
  font-size: 14px;
`;

export const TitleContainer = styled.div`
  margin-top: -10px;
  border-radius: 8px;
  padding: 2px;
  background-color: ${theme.colors.primary.x1};
  text-align: center;
`;

export const NameTitle = styled.h2`
   color: ${theme.colors.night.x1};
   padding: 5px;
`;