import React, { useEffect, useState } from "react";
import RichTextInput from "../RichTextInput";
import { EditorState, ContentState } from "draft-js";
import { convertFromHTML, convertToHTML } from "draft-convert";

const RichTextParameterInput = ({ parameter, value, onChange }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(loadPages(parameter, value));
  const [editorState, setEditorState] = useState(loadEditorContentFromLoadedPages(parameter, value));

  const onChangeEditorState = (newState) => {
    setEditorState(newState);

    const updatedPages = pages;

    updatedPages[currentPage - 1] = newState;

    setPages(updatedPages);

    onChange(convertPagesToHtml(updatedPages));
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

function loadEditorContentFromLoadedPages(parameter, value) {
  if (!value || value.length === 0 || parameter.type !== 'book') {
    return EditorState.createWithContent(ContentState.createFromText(""));
  }

  return EditorState.createWithContent(convertFromHTML(value[0].structure));
}

function loadPages(parameter, value) {
  if (!value || value.length === 0 || parameter.type !== 'book') {
    return [];
  }

  return value;
}

function convertPagesToHtml(pages) {
  const parsedPages = [];

  pages.forEach((page) => {
    parsedPages.push({structure: convertToHTML(page.getCurrentContent()), style: null});
  });

  return parsedPages;
}

