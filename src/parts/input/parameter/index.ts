/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import BookParameterInput from "./BookParameterInput";
import OptionsParameterInput from './OptionsParameterInput';
import DateParameterInput from "./DateParameterInput";
import FormParameterInput from "./FormParameterInput";
import NumberParameterInput from "./NumberParameterInput";
import RichTextParameterInput from "./RichTextParameterInput";
import SelectAndNumberParameterInput from "./SelectAndNumberParameterInput";
import SelectParameterInput from "./SelectParameterInput";
import SelectOrTextParameterInput from "./SelectOrTextParameterInput";
import TextParameterInput from "./TextParameterInput";


// --------------------------------------------------------------------------
//     Constants
// --------------------------------------------------------------------------
const parameters = {
  BOOK: BookParameterInput,
  CHECKBOX: OptionsParameterInput,
  DATE: DateParameterInput,
  FORM: FormParameterInput,
  NUMBER: NumberParameterInput,
  SELECT: SelectParameterInput,
  SELECT_AND_NUMBER: SelectAndNumberParameterInput,
  SELECT_OR_TEXT: SelectOrTextParameterInput,
  RADIO: OptionsParameterInput,
  RICH_TEXT: RichTextParameterInput,
  TEXT: TextParameterInput
}

export default parameters
