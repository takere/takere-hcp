/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { InputDefault, Spacing } from './styled';


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const NumberInput = ({ label, value, helperText, onChange }) => (
  <>
    <InputDefault
      id="outlined-basic"
      label={label}
      variant="outlined"
      type="number"
      helperText={helperText}
      value={value}
      onChange={event => onChange(event.target.value)}
      size="small"
    />
    <Spacing />
  </>
);

export default NumberInput;
