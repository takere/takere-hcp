import React from 'react';
import { buttonStyle } from './style';
import AbstractButton from '../parts/AbstractButton';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const DefaultButton = ({ title, onClick, type, style }) => (
  <AbstractButton
    style={{ ...buttonStyle, ...style}}
    onClick={onClick}
    type={type}
  >
    { title }
  </AbstractButton>
);

export default DefaultButton;

