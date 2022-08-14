import React from 'react';
import Button from "@material-ui/core/Button";
import { buildWidth } from './style';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const AbstractButton = ({ children, onClick, type, style }) => (
  <Button
    style={{ ...buildWidth(type), ...style }}
    onClick={onClick}
    variant="contained"
  >
    { children }
  </Button>
);

export default AbstractButton;
