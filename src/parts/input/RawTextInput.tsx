/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import RawTextImputer from '../../models/raw-text-imputer.model';
import { InputDefault, Spacing } from './styled';


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const RawTextInput = ({ label, value, helperText, onChange, style }: RawTextImputer) => (
  <>
    <InputDefault
      id="outlined-basic"
      label={label}
      style={style}
      variant="outlined"
      type="text"
      helperText={helperText}
      value={value}
      onChange={event => onChange(event.target.value)}
      size="small"
    />
    <Spacing />
  </>
);

export default RawTextInput;
