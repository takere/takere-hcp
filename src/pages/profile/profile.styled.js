import styled from 'styled-components'
import {theme} from "../../utils/colors";

export const PageWithDrawer = styled.div`
  flex-direction: row;
  display: flex;
  flex: 1;
`;

export const Container = styled.div`
  flex: 1;
  background-image: url('/assets/images/profile.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

export const NameTitle = styled.h1`
   color: ${theme.colors.night.x1};
   padding-left: 30px;
   padding-top: 30px;
`;

export const TextDescription = styled.h4`
   color: ${theme.colors.night.x1};
   padding-left: 30px;
`;

export const Spacing = styled.div`
   padding-top: 15px;
`;

export const ContainerData = styled.div`
  flex-direction: column;
  margin: 30px;
  min-height: 200px;
  flex: 1;
  background-color: ${theme.colors.night.x5};
  border-radius: 16px;
`
