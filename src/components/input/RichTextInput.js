import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.css'

import { Spacing } from './styled';

const RichTextInput = ({ label, editorState, setEditorState, onChange }) => {
  
  
  const onChangeState = (state) => {
    setEditorState(state);
    
    // let currentContentAsHTML = convertToHTML(state.getCurrentContent());
    
    // onChange(currentContentAsHTML);
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
