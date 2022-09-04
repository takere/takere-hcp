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
  wordBreak: break-all;
  transform: rotate(45deg);
`;

export const NodeContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  transform: rotate(-45deg);
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

export const FlowLabel = styled.p`
  transform: rotate(-45deg);
  position: absolute;
  text-transform: uppercase;
  font-size: 1vw;

  &.false {
    left: 0;
    bottom: 0;
    padding-left: 5px;
  }

  &.true {
    right: 0;
    top: 0;
    padding-right: 5px;
  }
`;