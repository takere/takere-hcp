import React, { useEffect, useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import 'draft-js/dist/Draft.css';
import { Spacing } from './styled';

const RichTextInput = ({ label, value, helperText, onChange }) => {
  
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  useEffect(() => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    
    onChange(currentContentAsHTML);

  }, [editorState]);

  return (
    <>
      <Editor editorState={editorState} onChange={setEditorState} />
      <Spacing />
    </>
  );
};

export default RichTextInput;
