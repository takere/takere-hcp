/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { buttonStyle } from './style';
import MaterialIcon from '../template/MaterialIcon';
import AbstractButton from '../template/AbstractButton';
import Button from '../../../models/button.model';



// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const DefaultButton = ({ iconName, title, onClick, type, style }: Button) => (
  <AbstractButton
    style={{ ...buttonStyle, ...style}}
    onClick={onClick}
    type={type}
  >
    {title && 
      <>{title}</>
    }
    {!title && 
      <MaterialIcon iconName={iconName} />
    }
  </AbstractButton>
);

export default DefaultButton;

