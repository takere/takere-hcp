import React from 'react';
import { buttonStyle } from './style';
import MaterialIcon from '../parts/MaterialIcon';
import AbstractButton from '../parts/AbstractButton';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const DangerButton = ({ iconName, title=undefined, onClick, type=null, style=undefined }) => (
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

export default DangerButton;
