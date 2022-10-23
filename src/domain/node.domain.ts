/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Parameter from "../models/parameter/parameter.model";


interface Node {
  slug: string,
  id?: string,
  name: string,
  description: string,
  type: string,
  color: string,
  icon: string,
  shape: string,
  input_list: string[],
  output_list: string[],
  content_type?: string,
  parameters: Parameter[],
  icons?: string[],
  arguments?: any[],
  position: any,
  flow: any
}

export default Node;
