/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Styled from "./styled";
import Board from "../../../domain/board.domain";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const FullCard = ({ title, description, icon, onClick, color }: any) => (
  <Styled.ItemBox onClick={onClick} color={color}>
    <Styled.ItemContent>
      <Styled.ItemName>
        { title }
      </Styled.ItemName>
      <Styled.ItemDescription>
        { description }
      </Styled.ItemDescription>
    </Styled.ItemContent>
    <Styled.ItemContent>
      <Styled.IconItem>
        { icon }
      </Styled.IconItem>
    </Styled.ItemContent>
  </Styled.ItemBox>
);

export default FullCard;
