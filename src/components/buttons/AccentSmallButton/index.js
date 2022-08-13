import React from 'react';
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import { buttonStyle, iconStyle } from './style';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const AccentSmallButton = ({ iconName, onClick }) => (
  <Button
    style={buttonStyle}
    onClick={onClick}
    variant="contained"
  >
    <MaterialIcon iconName={iconName} />
  </Button>
);

export default AccentSmallButton;

const MaterialIcon = ({ iconName }) => (
  <Icon style={iconStyle}>
    { iconName }
  </Icon>
);
