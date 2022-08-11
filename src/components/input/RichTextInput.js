import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.css'

import { Spacing } from './styled';

const RichTextInput = ({ label, editorState, setEditorState }) => {
  
  
  const onChangeState = (state) => {
    setEditorState(state);
  };

  return (
    <fieldset>
      <legend className='title'>{label}</legend>
      <Editor 
        editorState={editorState} 
        onEditorStateChange={onChangeState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      <Spacing />
    </fieldset>
  );
};

export default RichTextInput;
