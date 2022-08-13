import React from 'react';
import { InputDefault, Spacing } from './styled';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const RawTextInput = ({ label, value, helperText, onChange }) => (
  <>
    <InputDefault
      id="outlined-basic"
      label={label}
      variant="outlined"
      type="text"
      helperText={helperText}
      value={value}
      onChange={event => onChange(event.target.value)}
      size="small"
    />
    <Spacing />
  </>
);

export default RawTextInput;
