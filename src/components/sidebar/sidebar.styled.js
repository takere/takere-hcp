import styled from "styled-components";
import theme from "../../assets/themes";
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

export const InputDefault = styled(TextField)`
  width: 100%;
  padding-top: 45px;
`;

export const SideItem = styled.div`
  flex-direction: column;
  flex: 1;
  margin-bottom: 5px;
  border: 2px solid ${theme.colors.night.x1};
  background-color: ${(props) => props.bgColor};
  padding: 10px;
  text-align: center;
  border-radius: 8px;
  color: ${theme.colors.night.x1};
  font-weight: 400;
`;

export const TitleContainer = styled.div`
  border-radius: 8px;
  background-color: #fff;
  text-align: center;
`;

export const TitleNodeItem = styled.p`
  font-size: 16px;
  font-weight: bold;
  text-align: left;
`;

export const DescriptionNodeItem = styled.p`
  text-align: left;
  font-size: 13px;
`;

export const NameTitle = styled.h2`
   color: ${theme.colors.night.x1};
   padding: 5px;
`;

export const Spacing = styled.div`
  margin-bottom: 10px;
`;
