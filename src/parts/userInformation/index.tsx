/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Styled from "./styled";
import LocaleService from "../../services/locale.service";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const UserInformation = ({ data }: any) => {
  if (!data) {
    return (<></>);
  }

  const localeService = new LocaleService();

  return (
    <>
      <Styled.Spacing />
      <Name data={data} localeService={localeService} />
      <Email data={data} localeService={localeService} />
    </>
  );
}

export default UserInformation;

const Name = ({ data, localeService }: any) => (
  <Styled.TextDescription>
    {localeService.translate("NAME")}: {data.firstName}
  </Styled.TextDescription>
);

const Email = ({ data, localeService }: any) => (
  <Styled.TextDescription>
    {localeService.translate("EMAIL")}: {data.email}
  </Styled.TextDescription>
);
