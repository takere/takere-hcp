import styled from "styled-components";
import {theme} from "../../utils/colors";

export const SideContainer = styled.div`
  background-color: ${theme.colors.night.x1};
  width: 350px;
  padding: 15px 10px;
  font-size: 12px;
`;

export const SideAside = styled.aside`
  width: 100%;
`;

export const SideGraggAside = styled.aside`
  margin-bottom: 20px;
  cursor: grab;
`;

export const SideItem = styled.div`
  margin-bottom: 20px;
  background-color: ${theme.colors.day.x1};
  padding: 10px;
  text-align: center;
  border-radius: 8px;
  color: ${theme.colors.night.x1};
  font-weight: 400;
  font-size: 14px;
`;

export const TitleContainer = styled.div`
  margin-bottom: 20px;
  margin-top: -10px;
  border-radius: 8px;
  padding: 2px;
  background-color: ${theme.colors.primary.x1};
  text-align: center;
`;

export const NameTitle = styled.h2`
   color: ${theme.colors.night.x1};
   padding: 10px;
`;