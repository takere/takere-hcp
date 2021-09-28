import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { DatePicker } from "@material-ui/pickers";
import {theme} from "../../utils/colors";

export const InputDefault = styled(TextField)`
  width: 100%;
  padding-top: 45px;
`;

export const InputDatePicker = styled(DatePicker)`
  width: 100%;
  padding-top: 45px;
`;

export const Spacing = styled.div`
  margin-bottom: 20px;
`;

export const TextName = styled.p`
  color: ${theme.colors.night.x1};
  margin-top: 0;
  margin-bottom: 5px;
`;
