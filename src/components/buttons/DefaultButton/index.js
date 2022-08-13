import React from 'react';
import Button from "@material-ui/core/Button";
import { buttonStyle } from './style';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const DefaultButton = ({ title, onClick }) => (
  <Button
    onClick={onClick}
    variant="contained"
    style={buttonStyle}
  >
    { title }
  </Button>
);

export default DefaultButton;

