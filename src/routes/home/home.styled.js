import React from 'react'
import styled from 'styled-components'
import {theme} from "../../utils/colors";

export const Container = styled.div`
  flex: 1;
  background-color: ${theme.colors.day.x1};
  padding: 30px;
`

export const NameTitle = styled.h1`
   color: ${theme.colors.night.x1};
`;

export const HelloBox = styled.div`
  background-color: ${theme.colors.night.x5};
  width: 450px;
  height: 50px;
  justify-content: center;
  align-content: center;
  border-radius: 16px;
  border-left: 5px solid;
  border-color: ${theme.colors.night.x5};
`;

export const ContainerData = styled.div`
  margin-top: 30px;
  min-height: 400px;
  flex: 1;
  display: flex;
  background-color: ${theme.colors.night.x5};
  padding: 30px;
  border-radius: 16px;
`
