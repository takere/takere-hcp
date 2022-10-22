/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from "styled-components";
import theme from "../../assets/themes";
import Icon from '@material-ui/core/Icon';


// ----------------------------------------------------------------------------
//         Constants
// ----------------------------------------------------------------------------
export const SideContainer = styled.div`
  background-color: ${theme.colors.day.x1};
  width: 80px;
  padding: 15px 10px;
  font-size: 12px;
  border-right: 3px solid;
  border-color: ${theme.colors.night.x5};
`;

export const Spacing = styled.div`
  margin-bottom: 35px;
`;

export const IconItem = styled(Icon)`
  font-size: 28px;
  color: ${theme.colors.night.x1};
  text-align: center;
`;

export const IconHighlight = styled(Icon)`
  font-size: 28px;
  color: ${theme.colors.day.x1};
  text-align: center;
`;

export const IconExit = styled(Icon)`
  font-size: 28px;
  color: ${theme.colors.night.x1};
  text-align: center;
`;

export const ExitSideItem = styled.div`
  position: absolute;
  bottom: 0;
  margin-bottom: 20px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-color: ${theme.colors.day.x1};
  padding: 10px 10px;
  border-radius: 8px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.day.x1};
    ${IconExit} {
      color: ${theme.colors.feedback.error.x1};
    }
  }
`;

export const SideAddItem = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-color: ${theme.colors.primary.x1};;
  margin-bottom: 25px;
  padding: 10px 10px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.primary.x1};
    ${IconItem} {
      color: ${theme.colors.primary.x1};
    }
  }
`;

export const SideItem = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-color: ${theme.colors.day.x1};;
  margin-bottom: 25px;
  padding: 10px 10px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.primary.x1};
    ${IconItem} {
      color: ${theme.colors.day.x1};
    }
  }
`;
