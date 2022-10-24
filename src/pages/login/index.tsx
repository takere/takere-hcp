/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Styled from "./styled";
import { useHistory } from "react-router-dom";
import SignInForm from "../../components/forms/signIn";
import TakereHeader from "../../components/takere/header";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const Login = () => {

  const history = useHistory();

  return (
    <Styled.Container>
      <TakereHeader />
      <SignInForm onSuccess={() => handleSignIn(history)} />
    </Styled.Container>
  );
};

export default Login;


// ----------------------------------------------------------------------------
//         Functions
// ----------------------------------------------------------------------------
function handleSignIn(history: any) {
  history.push("/");
}
