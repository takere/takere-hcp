/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Option from "../option.model";


interface MultiSelectionImputer {
  label: string, 
  value: string | number, 
  helperText: string, 
  onChange: (newValue: string) => void, 
  options: Option[]
}

export default MultiSelectionImputer;
