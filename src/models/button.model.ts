/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


interface Button {
  iconName?: string, 
  title?: string, 
  onClick: () => void, 
  type?: string, 
  style?: any
}

export default Button;
