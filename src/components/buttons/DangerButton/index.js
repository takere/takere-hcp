import React from 'react';
import { buttonStyle } from './style';
import MaterialIcon from '../parts/MaterialIcon';
import AbstractButton from '../parts/AbstractButton';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const DangerButton = ({ iconName, onClick, type, style }) => (
  <AbstractButton
    style={{ ...buttonStyle, ...style }}
    type={type}
    onClick={onClick}
  >
    <MaterialIcon iconName={iconName} />
  </AbstractButton>
);

export default DangerButton;
