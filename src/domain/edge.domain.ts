/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface Edge {
  id: string,
  source: string,
  target: string,
  animated: boolean,
  flow: any
}

export default Edge;
