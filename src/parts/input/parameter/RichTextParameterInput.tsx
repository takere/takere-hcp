/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState } from "react";
import RichTextInput from "../RichTextInput";
import { EditorState, ContentState } from "draft-js";
import { convertFromHTML, convertToHTML } from "draft-convert";
import Parameter from "../../../models/parameter/parameter.model";
import Page from "../../../models/page.model";
import RichTextParameter from "../../../models/parameter/rich-text-parameter.model";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const RichTextParameterInput = ({ 
  parameter, 
  value, 
  onChange 
}: RichTextParameter) => {

  const [editorState, setEditorState] = useState(loadEditorState(parameter, value));

  const onChangeEditorState = (newState: EditorState) => {
    setEditorState(newState);
    onChange(convertEditorStateToHtml(newState));
  };
  
  return (
    <RichTextInput
      label={parameter.name}
      value={editorState}
      onChange={onChangeEditorState}
    />
  );
}

export default RichTextParameterInput;


// ----------------------------------------------------------------------------
//         Functions
// ----------------------------------------------------------------------------
function loadEditorState(parameter: Parameter, value: Page) {
  if (!value || parameter.type !== 'book') {
    return EditorState.createWithContent(ContentState.createFromText(""));
  }

  return EditorState.createWithContent(convertFromHTML(value.structure));
}

function convertEditorStateToHtml(state: EditorState): Page {
  return {
    structure: convertToHTML(state.getCurrentContent()), 
    style: null
  };
}

