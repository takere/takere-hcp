/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Background, BackgroundVariant } from "react-flow-renderer";
import { area, color } from './style';


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const DotsBackground = () => (
  <Background
    variant={BackgroundVariant.Dots}
    color={color}
    style={area}
    gap={40}
    size={1}
  />
);

export default DotsBackground;
