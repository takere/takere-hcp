/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { InputDatePicker, Spacing } from './styled';


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const DateInput = ({ label, value, onChange }) => (
  <>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <InputDatePicker
        variant="outlined"
        label={label}
        value={value}
        onChange={newValue => onChange(newValue.toISOString())}
      />
    </MuiPickersUtilsProvider>
    <Spacing />
  </>
);

export default DateInput;
