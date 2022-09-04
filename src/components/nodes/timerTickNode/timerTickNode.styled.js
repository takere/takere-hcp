import styled from "styled-components";
import {theme} from "../../../utils/colors";

export const Node = styled.div`
  background: ${props => props.bgColor ?? 'transparent'};
  color: ${props => props.fgColor ?? '#333'};
  width: 100px;
  height: 100px;
  align-content: center;
  align-items: center;
  border-width: 2px;
  border-color: #333;
  border-style:solid;
  border-radius: 12px;
  display: flex;
  justify-content: center;
`;

export const NodeContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

export const NodeName = styled.p`
  color: ${theme.colors.night.x1};
  margin-top: 0;
  margin-bottom: 5px;
`;
