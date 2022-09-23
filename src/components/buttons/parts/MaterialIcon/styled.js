import styled from 'styled-components'
import IconUI from "@material-ui/core/Icon";
import theme from "../../../../assets/themes";

export const Icon = styled(IconUI)`
  text-align: center;
  font-size: 28px;
  color: ${(props) => props.color ? props.color : theme.colors.day.x1};
`;
