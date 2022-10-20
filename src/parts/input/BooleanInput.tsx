/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Checkbox from "@material-ui/core/Checkbox";
import BooleanImputer from "../../models/imputer/boolean-imputer.model";
import { TextName, Spacing } from './styled';


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const BooleanInput = ({ label, value, onChange }: BooleanImputer) => (
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
