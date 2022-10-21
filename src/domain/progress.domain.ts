/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Board from "./board.domain";
import User from "./user.domain";


interface Progress {
  patient: User,
  flow: {
    id: string,
    name: string,
    description: string,
    completed?: Board[],
    ongoing?: Board,
    late?: Board
  }
}

export default Progress;
