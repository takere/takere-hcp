import React from 'react';
import { InputDefault, Spacing } from './styled';

const NumberInput = ({ label, value, helperText, onChange }) => (
  <>
    <InputDefault
      id="outlined-basic"
      label={label}
      variant="outlined"
      type="number"
      helperText={helperText}
      value={value}
      onChange={onChange}
      size="small"
    />
    <Spacing />
  </>
);

export default NumberInput;
