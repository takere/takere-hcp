import React from 'react';
import Icon from "@material-ui/core/Icon";
import { iconStyle } from './style';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const MaterialIcon = ({ iconName }) => (
  <Icon style={iconStyle}>
    { iconName }
  </Icon>
);

export default MaterialIcon;
