/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface BooleanImputer {
  label: string, 
  value: boolean, 
  onChange: (newValue: boolean) => void
}

export default BooleanImputer;
