/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Styled from "./styled";
import { MenuDrawer } from "../../components/menuDrawer";
import LocaleService from "../../services/locale.service";
import StorageService from "../../services/storage.service";
import UserInformation from "../../parts/userInformation";


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
          <UserInformation data={userData} />
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
