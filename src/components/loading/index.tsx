/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ClipLoader } from "react-spinners";
import Board from "../../domain/board.domain";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const Loading = ({ display }: any) => {
  if (!display) {
    return (
      <></>
    );
  }

  return (
    <ClipLoader />
  );
}

export default Loading;
