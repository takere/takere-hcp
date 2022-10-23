/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Icon } from './styled';


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const MaterialIcon = ({ iconName, color }: any) => (
  <Icon color={color}>
    { iconName }
  </Icon>
);

export default MaterialIcon;
