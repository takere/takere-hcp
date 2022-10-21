/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Option from "./option.model";


interface Options {
  label: string, 
  type: string, 
  options: Option[]
}

export default Options;
