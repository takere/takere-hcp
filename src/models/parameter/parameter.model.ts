/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Option from "../option.model";


interface Parameter {
  slug: string,
  name: string,
  description: string,
  required: boolean,
  type: string,
  options?: Option[]
}

export default Parameter;
