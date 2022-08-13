import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.css'
import { Spacing } from '../styled';


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
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
