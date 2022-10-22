/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import GenericNode from "./generic";
import ConditionalNode from "./conditional";


export const nodeTypes = {
  BEGIN: GenericNode,
  CONDITIONAL: ConditionalNode,
  NON_PERIODIC: GenericNode,
  PERIODIC: GenericNode,
}
