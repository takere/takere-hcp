import styled from "styled-components";
import {theme} from "../../../utils/colors";

export const Node = styled.div`
  background: ${theme.colors.feedback.success.x1};
  color: ${theme.colors.day.x1};
  width: 100px;
  height: 100px;
  align-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${theme.colors.night.x1};
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