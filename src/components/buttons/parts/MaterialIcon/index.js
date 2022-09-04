import React from 'react';
import { Icon } from './styled';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const MaterialIcon = ({ iconName, color }) => (
  <Icon color={color}>
    { iconName }
  </Icon>
);

export default MaterialIcon;
