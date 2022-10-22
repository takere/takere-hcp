/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from "styled-components";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
export const FlowLabel = styled.p`
  transform: rotate(-45deg);
  position: absolute;
  text-transform: uppercase;
  font-size: 10px;

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

