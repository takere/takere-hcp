/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Styled from "./styled";
import { useHistory } from "react-router-dom";
import SignInForm from "../../components/forms/signIn";

// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const Login = () => {

  const history = useHistory();

  return (
    <Styled.Container>
      <Title />
      <SignInForm onSuccess={() => handleSignIn(history)} />
    </Styled.Container>
  );
};

export default Login;

const Title = ({ localeService }: any) => (
  <Styled.NameTitle>
    Takere - HCP: {localeService.translate("LOGIN")}
  </Styled.NameTitle>
);


// ----------------------------------------------------------------------------
//         Functions
// ----------------------------------------------------------------------------
function handleSignIn(history: any) {
  history.push("/");
}
