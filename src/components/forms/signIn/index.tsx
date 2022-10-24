/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState } from "react";
import * as Styled from "./styled";
import UserService from "../../../services/user.service";
import LocaleService from "../../../services/locale.service";
import DefaultButton from "../../buttons/DefaultButton";
import AccentButton from "../../buttons/AccentButton";

// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const SignInForm = ({ onSuccess }: any) => {

  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const localeService = new LocaleService();
  const userService = new UserService();

  return (
    <Styled.Container>
      <EmailInput
        localeService={localeService}
        error={error}
        value={email}
        onChange={(event: any) => handleEmailChange(event, setEmail)}
      />
      <PasswordInput 
        localeService={localeService}
        error={error}
        value={password}
        onChange={(event: any) => handlePasswordChange(event, setPassword)}
      />
      <SubmitButton 
        localeService={localeService}
        onClick={() => handleSubmit(
          userService, 
          email, 
          password, 
          onSuccess, 
          setError
        )} 
      />
    </Styled.Container>
  );
};

export default SignInForm;

const EmailInput = ({ localeService, error, email, onChange }: any) => (
  <Styled.InputField>
    <Styled.Input
      id="outlined-basic"
      label="Email"
      variant="outlined"
      error={error}
      type="text"
      value={email}
      onChange={onChange}
      size="medium"
      placeholder={localeService.translate("TYPE_EMAIL")}
    />
  </Styled.InputField>
);

const PasswordInput = ({ localeService, error, password, onChange }: any) => (
  <Styled.InputField>
    <Styled.Input
      id="outlined-basic"
      label={localeService.translate("PASSWORD")}
      variant="outlined"
      type="password"
      error={error}
      value={password}
      onChange={onChange}
      size="medium"
      placeholder={localeService.translate("TYPE_PASSWORD")}
    />
  </Styled.InputField>
);

const SubmitButton = ({ localeService, onClick }: any) => (
  <AccentButton
    onClick={onClick}
    title={localeService.translate("SIGN_IN")}
    style={{ width: '100%', marginTop: 20 }}
  />
);


// ----------------------------------------------------------------------------
//         Functions
// ----------------------------------------------------------------------------
function handleEmailChange(event: any, setEmail: any) {
  setEmail(event.target.value);
};

function handlePasswordChange(event: any, setPassword: any) {
  setPassword(event.target.value);
};

async function handleSubmit(
  userService: UserService, 
  email: string, 
  password: string, 
  onSuccess: any, 
  setError: (status: boolean) => void
) {
  const success = await userService.makeLogin(email, password);

  if (success) {
    onSuccess();
  } 
  else {
    setError(true);
  }
}
