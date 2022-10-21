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
const CarePlans = ({ flows, onClick }: any) => (
  <Styled.Gallery>
      <CarePlanCards 
        flows={flows} 
        onClick={onClick} 
      />
  </Styled.Gallery>
);

export default CarePlans;

const CarePlanCards = ({ flows, onClick }: any) => {
  return flows.map((flow: any) => (
    <Styled.ItemBox
      id={"box"}
      key={flow.id}
      onClick={onClick}
    >
      <DeleteButton />
      <Styled.ItemName id={"box"}>
        { flow.name }
      </Styled.ItemName>
      <Styled.ItemDescription id={"box"}>
        { flow.description }
      </Styled.ItemDescription>
    </Styled.ItemBox>
  ));
};

const DeleteButton = () => (
  <Styled.DeleteButton id={"close"}>
    <Styled.IconItem id={"close"}>
      close
    </Styled.IconItem>
  </Styled.DeleteButton>
);