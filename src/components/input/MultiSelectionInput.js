import React from 'react';
import { InputDefault, Spacing } from './styled';

const MultiSelectionInput = ({ label, value, helperText, onChange, options }) => (
  <>
    <InputDefault
      label={label}
      id="outlined-select-currency-native"
      select
      variant="outlined"
      value={value}
      onChange={onChange}
      SelectProps={{
        native: true,
      }}
      helperText={helperText}
    >
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </InputDefault>
    <Spacing />
  </>
);

export default MultiSelectionInput;