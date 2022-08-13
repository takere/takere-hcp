import React from 'react';
import { Background } from "react-flow-renderer";
import { area, color } from './style';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const DotsBackground = () => (
  <Background
    variant="dots"
    color={color}
    style={area}
    gap={40}
    size={1}
  />
);

export default DotsBackground;
