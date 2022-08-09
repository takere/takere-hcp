import React from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import { TextName, Spacing } from './styled';

const BooleanInput = ({ label, checked, onChange }) => (
  <>
    <TextName>{label}</TextName>
    <Checkbox
      checked={checked}
      onChange={onChange}
      inputProps={{ "aria-label": "controlled" }}
    />
    <Spacing />
  </>
);

export default BooleanInput;
