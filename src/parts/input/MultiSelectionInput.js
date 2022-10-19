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
const MultiSelectionInput = ({ label, value, helperText, onChange, options }) => (
  <>
    <InputDefault
      label={label}
      size="small"
      id="outlined-select-currency-native"
      select
      variant="outlined"
      value={value}
      onChange={event => onChange(event.target.value)}
      SelectProps={{
        native: true,
      }}
      helperText={helperText}
    >
      {options?.map((option, index) => (
        <option key={option.key ?? index} value={option.value}>
          {option.label}
        </option>
      ))}
    </InputDefault>
    <Spacing />
  </>
);

export default MultiSelectionInput;
