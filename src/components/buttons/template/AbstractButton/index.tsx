/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Button from "@material-ui/core/Button";
import { buildWidth } from './style';


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const AbstractButton = ({ children, onClick, type, style }: any) => (
  <Button
    style={{ ...buildWidth(type), ...style }}
    onClick={onClick}
    variant="contained"
  >
    { children }
  </Button>
);

export default AbstractButton;
