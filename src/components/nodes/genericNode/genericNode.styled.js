import styled from "styled-components";
import {theme} from "../../../utils/colors";

export const Node = styled.div`
  background: ${props => props.nodeStyle.backgroundColor};
  width: 100px;
  height: 100px;
  align-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${props => props.nodeStyle.borderColor};
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
  text-align: center;
  margin: 5px;
  font-size: 1vw;

  display: -webkit-box;
  max-width: 200px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
