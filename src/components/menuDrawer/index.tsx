/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Styled from "./styled";
import { Link, useHistory } from "react-router-dom";
import UserService from "../../services/user.service";


// ----------------------------------------------------------------------------
//         Constants
// ----------------------------------------------------------------------------
const menuList = [
  {
    icon: "home",
    path: "/",
  },
  {
    icon: "person",
    path: "/profile",
  },
  {
    icon: "healing",
    path: "/patients",
  },
];


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const MenuDrawer = () => {
  
  const history = useHistory();
  const userService = new UserService();

  return (
    <Styled.SideContainer>
      <Styled.Spacing />
      {menuList.map((m, i) => (
        <MenuElement menuItem={m} key={i} />
      ))}
      <AddButton onClick={() => handleNew(history)} />
      <SignOutButton onClick={() => handleLogout(history, userService)} />
    </Styled.SideContainer>
  );
};

export default MenuDrawer;

const MenuElement = ({ menuItem }: any) => (
  <Link to={`${menuItem.path}`}>
    <Styled.SideItem>
      <Styled.IconItem>
        { menuItem.icon }
      </Styled.IconItem>
    </Styled.SideItem>
  </Link>
);

const AddButton = ({ onClick }: any) => (
  <Styled.SideAddItem onClick={onClick}>
    <Styled.IconHighlight>
      add
    </Styled.IconHighlight>
  </Styled.SideAddItem>
);

const SignOutButton = ({ onClick }: any) => (
  <Styled.ExitSideItem onClick={onClick}>
    <Styled.IconExit>
      logout
    </Styled.IconExit>
  </Styled.ExitSideItem>
);


// ----------------------------------------------------------------------------
//         Functions
// ----------------------------------------------------------------------------
function handleLogout(history: any, userService: UserService) {
  userService.makeLogout();
  history.push("/login");
}

function handleNew(history: any) {
  history.push("/dash");
}
