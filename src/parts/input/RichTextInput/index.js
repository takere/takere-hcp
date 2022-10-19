/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.css'
import { Spacing } from '../styled';


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const RichTextInput = ({ label, value, onChange }) => (
  <fieldset>
    <legend className='title'>
      { label }
    </legend>
    <Editor 
      editorState={value} 
      onEditorStateChange={onChange}
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      toolbarClassName="toolbar-class"
    />
    <Spacing />
  </fieldset>
);

export default RichTextInput;
