import React from 'react';
import Button from "@material-ui/core/Button";
import { color } from './style';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const SuccessButton = ({ title, onClick }) => (
  <Button
    onClick={onClick}
    variant="contained"
    color={color}
  >
    { title }
  </Button>
);

export default SuccessButton;

