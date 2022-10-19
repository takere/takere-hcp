import React, { useEffect, useState } from "react";
import MultiSelectionInput from "../MultiSelectionInput";
import NumberInput from "../NumberInput";
import RawTextInput from "../RawTextInput";
import LocaleService from "../../../services/locale.service";
import RichTextInput from "../RichTextInput";
import { EditorState, ContentState } from "draft-js";
import { convertFromHTML, convertToHTML } from "draft-convert";

const BookParameterInput = ({ parameter, value, onChange }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(loadPages(parameter, value));
  const [totalPages, setTotalPages] = useState(loadTotalPages(parameter, value));
  const [editorState, setEditorState] = useState(loadEditorContentFromLoadedPages(parameter, value));

  const localeService = new LocaleService();
  
  const onTotalPagesChange = (rawValue) => {
    let newTotalPages = parseInt(rawValue);

    if (newTotalPages <= 0) {
      return;
    }

    const newPages = updatePagesBasedOnTotalPages(newTotalPages, totalPages, pages);

    setTotalPages(newTotalPages);
    setCurrentPage(1);
    setPages(newPages);
    setEditorState(pages[0].structure);
    onChange(convertPagesToHtml(newPages));
  };

  const onChangeCurrentPage = (rawValue) => {
    let newCurrentPage = parseInt(rawValue);

    if (isPageNumberOutOfBounds(newCurrentPage, totalPages)) {
      return;
    }

    setCurrentPage(newCurrentPage);
    setEditorState(pages[newCurrentPage - 1].structure);
  };

  const onChangeEditorState = (newState) => {
    setEditorState(newState);

    const updatedPages = pages;

    updatedPages[currentPage - 1] = newState;

    setPages(updatedPages);

    onChange(convertPagesToHtml(updatedPages));
  };

  return (
    <>
      <NumberInput
        label={localeService.translate("TOTAL_PAGES")}
        helperText={localeService.translate("TOTAL_PAGES_DESCRIPTION")}
        value={totalPages}
        onChange={onTotalPagesChange}
      />
      <NumberInput
        label={localeService.translate("CURRENT_PAGE")}
        helperText={localeService.translate("CURRENT_PAGE_DESCRIPTION")}
        value={currentPage}
        onChange={onChangeCurrentPage}
      />
      <RichTextInput
        label={parameter.name}
        value={editorState}
        onChange={onChangeEditorState}
      />
    </>
  );
}

export default BookParameterInput;


function loadPages(parameter, value) {
  if (!value || value.length === 0 || parameter.type !== 'book') {
    return [];
  }

  return value;
}

function loadTotalPages(parameter, value) {
  if (!value || value.length === 0 || parameter.type !== 'book') {
    return 1;
  }

  return value.length;
}

function loadEditorContentFromLoadedPages(parameter, value) {
  if (!value || value.length === 0 || parameter.type !== 'book') {
    return EditorState.createWithContent(ContentState.createFromText(""));
  }

  return EditorState.createWithContent(convertFromHTML(value[0].structure));
}

function convertPagesToHtml(pages) {
  const parsedPages = [];

  pages.forEach((page) => {
    parsedPages.push({structure: convertToHTML(page.getCurrentContent()), style: null});
  });

  return parsedPages;
}


function updatePagesBasedOnTotalPages(newTotalPages, oldTotalPages, pages) {
  let updatedPages = pages;

  if (newTotalPages > oldTotalPages) {
    let totalNewPages = newTotalPages - oldTotalPages;

    for (let i = 0; i < totalNewPages; i++) {
      updatedPages.push(EditorState.createWithContent(ContentState.createFromText("")));
    }
  } else if (newTotalPages > 1) {
    updatedPages = updatedPages.slice(0, newTotalPages);
  }

  return updatedPages;
}

function isPageNumberOutOfBounds(value, total) {
  return value <= 0 || value > total;
}