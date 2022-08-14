import React from 'react';
import { buttonStyle } from './style';
import MaterialIcon from '../parts/MaterialIcon';
import AbstractButton from '../parts/AbstractButton';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const DefaultButton = ({ iconName, title, onClick, type, style }) => (
  <AbstractButton
    style={{ ...buttonStyle, ...style}}
    onClick={onClick}
    type={type}
  >
    {title && 
      <>{title}</>
    }
    {!title && 
      <MaterialIcon iconName={iconName} />
    }
  </AbstractButton>
);

export default DefaultButton;

