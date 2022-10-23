/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


// ----------------------------------------------------------------------------
//         Constants
// ----------------------------------------------------------------------------
const width = {
  small: '50px',
  big: '100%'
}

export function buildWidth(type: string) {
  if (width[type as keyof typeof width] === undefined) {
    return null;
  }

  return { width: width[type as keyof typeof width] };
}
