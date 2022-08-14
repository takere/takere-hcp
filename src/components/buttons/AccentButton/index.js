import React from 'react';
import { buttonStyle } from './style';
import MaterialIcon from '../parts/MaterialIcon';
import AbstractButton from '../parts/AbstractButton';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const AccentButton = ({ iconName, title, onClick, type, style }) => (
  <AbstractButton
    style={{ ...buttonStyle, ...style }}
    type={type}
    onClick={onClick}
  >
    {title && 
      <>{title}</>
    }
    {!title && 
      <MaterialIcon iconName={iconName} />
    }
  </AbstractButton>
);

export default AccentButton;