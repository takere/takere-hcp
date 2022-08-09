import React from 'react';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { InputDatePicker, Spacing } from './styled';

const DateInput = ({ label, value, onChange }) => (
  <>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <InputDatePicker
        variant="outlined"
        label={label}
        value={value}
        onChange={onChange}
      />
    </MuiPickersUtilsProvider>
    <Spacing />
  </>
);

export default DateInput;
