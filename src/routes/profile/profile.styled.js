import React from 'react'
import styled from 'styled-components'
import {theme} from "../../utils/colors";

export const Container = styled.div`
  flex: 1;
  background-color: ${theme.colors.day.x1};
`

export const NameTitle = styled.h2`
   color: ${theme.colors.night.x1};
   padding: 5px;
`;