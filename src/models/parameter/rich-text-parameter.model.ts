/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Page from "../page.model";
import Parameter from "./parameter.model";


interface RichTextParameter {
  parameter: Parameter
  value: Page, 
  onChange: (page: Page) => void, 
}

export default RichTextParameter;
