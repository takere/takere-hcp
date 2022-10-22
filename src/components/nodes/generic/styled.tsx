/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import theme from "../../../assets/themes";
import { rotationByShape } from "../shape";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
export const Node = styled.div<{ bgColor?: string, fgColor?: string, shape: string }>`
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
  transform: rotate(${props => rotationByShape[props.shape as keyof typeof rotationByShape]}deg);
`;

export const NodeContainer = styled.div<{ shape: string }>`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  transform: rotate(-${props => rotationByShape[props.shape as keyof typeof rotationByShape]}deg);
`;

export const NodeName = styled.p`
  color: ${theme.colors.night.x1};
  text-align: center;
  margin: 5px;
  display: -webkit-box;
  max-width: 200px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const DeleteButton = styled.div`
  background-color: ${theme.colors.danger};
  width: 20px;
  height: 20px;
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-content: center;
  position: absolute;
  right: -5px;
  top: -5px;
  z-index: 999999;
`;

export const IconItem = styled(Icon)`
  &.MuiIcon-fontSizeInherit {
    font-size: 15px;
    line-height: 20px;
  }

  color: ${theme.colors.day.x1};
`;

export const NodeIcon = styled(Icon)`
  text-align: center;
  font-size: 28px;
  color: ${theme.colors.night.x1};
`;
