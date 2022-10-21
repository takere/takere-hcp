/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Options from "../options.model";


interface OptionsParameter {
  value: Options[], 
  onChange: (newOptions: Options[]) => void
}


export default OptionsParameter;
