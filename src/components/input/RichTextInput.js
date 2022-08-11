import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.css'

import { Spacing } from './styled';

const RichTextInput = ({ label, value, helperText, onChange }) => {
  
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const onChangeState = (state) => {
    setEditorState(state);
    let currentContentAsHTML = convertToHTML(state.getCurrentContent());
    
    onChange(currentContentAsHTML);

    console.log()
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
