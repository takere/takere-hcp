/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Checkbox from "@material-ui/core/Checkbox";
import { TextName, Spacing } from './styled';


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const BooleanInput = ({ label, value, onChange }) => (
  <>
    <TextName>
      { label }
    </TextName>
    <Checkbox
      checked={value}
      onChange={event => onChange(event.target.checked)}
      inputProps={{ "aria-label": "controlled" }}
    />
    <Spacing />
  </>
);

export default BooleanInput;
