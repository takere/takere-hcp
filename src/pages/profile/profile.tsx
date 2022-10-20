/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Styled from "./styled";
import { MenuDrawer } from "../../components/menuDrawer/menuDrawer";
import LocaleService from "../../services/locale.service";
import StorageService from "../../services/storage.service";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const Profile = () => {

  const localeService = new LocaleService();
  const storageService = new StorageService();
  const userData = storageService.getUserData();

  return (
    <Styled.PageWithDrawer>
      <MenuDrawer />
      <Styled.Container>
        <Styled.ContainerData>
          <Title localeService={localeService} />
          <UserData data={userData} localeService={localeService} />
        </Styled.ContainerData>
      </Styled.Container>
    </Styled.PageWithDrawer>
  );
}

export default Profile;

const Title = ({ localeService }: any) => (
  <Styled.NameTitle>
    {localeService.translate("PROFILE")}
  </Styled.NameTitle>
);

const UserData = ({ data, localeService }: any) => {
  if (!data) {
    return (<></>);
  }

  return (
    <>
      <Styled.Spacing />
      <Name data={data} localeService={localeService} />
      <Email data={data} localeService={localeService} />
    </>
  );
}

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
