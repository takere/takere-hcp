/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { EditorState } from 'draft-js';


interface RichTextImputer {
  label: string, 
  value: EditorState, 
  onChange: (newValue: EditorState) => void
}

export default RichTextImputer;
