/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import IconUI from "@material-ui/core/Icon";
import theme from "../../../../assets/themes";


// ----------------------------------------------------------------------------
//         Constants
// ----------------------------------------------------------------------------
export const Icon = styled(IconUI)`
  text-align: center;
  font-size: 28px;
  color: ${(props) => props.color ? props.color : theme.colors.day.x1};
`;
