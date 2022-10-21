/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Styled from "./styled";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const PatientCard = ({ firstName, lastName, flowName, onClick }: any) => (
  <Styled.ItemBox onClick={onClick}>
    <Styled.ItemContent>
      <PersonInformation 
        firstName={firstName}
        lastName={lastName}
        flowName={flowName}
      />
    </Styled.ItemContent>
    <Styled.ItemContent>
      <PersonIcon />
    </Styled.ItemContent>
  </Styled.ItemBox>
);

const PersonInformation = ({ firstName, lastName, flowName }: any) => (
  <>
    <Styled.ItemName>
      { firstName } { lastName }
    </Styled.ItemName>
    <Styled.ItemDescription>
      { flowName }
    </Styled.ItemDescription>
  </>
);

const PersonIcon = () => (
  <Styled.NameTitle>
    <Styled.IconItem>
      person
    </Styled.IconItem>
  </Styled.NameTitle>
);

export default PatientCard;
