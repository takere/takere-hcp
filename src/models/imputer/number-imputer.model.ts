/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface NumberImputer {
  label: string, 
  value: number, 
  helperText: string,
  onChange: (newValue: number) => void
}

export default NumberImputer;
