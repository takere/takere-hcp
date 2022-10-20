/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState } from "react";
import NumberInput from "../NumberInput";
import LocaleService from "../../../services/locale.service";
import RichTextInput from "../RichTextInput";
import { EditorState, ContentState } from "draft-js";
import { convertFromHTML, convertToHTML } from "draft-convert";
import Parameter from "../../../models/parameter/parameter.model";
import Page from "../../../models/page.model";
import BookParameter from "../../../models/book-parameter.model";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const BookParameterInput = ({ parameter, value, onChange }: BookParameter) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(loadPages(parameter, value));
  const [totalPages, setTotalPages] = useState(loadTotalPages(parameter, value));
  const [editorState, setEditorState] = useState(loadEditorContentFromLoadedPages(parameter, value));

  const localeService = new LocaleService();
  
  const onTotalPagesChange = (newTotalPages: number) => {
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

  const onChangeCurrentPage = (newCurrentPage: number) => {
    if (isPageNumberOutOfBounds(newCurrentPage, totalPages)) {
      return;
    }

    setCurrentPage(newCurrentPage);
    setEditorState(pages[newCurrentPage - 1].structure);
  };

  const onChangeEditorState = (newState: any) => {
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


// ----------------------------------------------------------------------------
//         Functions
// ----------------------------------------------------------------------------
function loadPages(parameter: Parameter, value: any[]) {
  if (!value || value.length === 0 || parameter.type !== 'book') {
    return [];
  }

  return value;
}

function loadTotalPages(parameter: Parameter, value: Page[]) {
  if (!value || value.length === 0 || parameter.type !== 'book') {
    return 1;
  }

  return value.length;
}

function loadEditorContentFromLoadedPages(parameter: Parameter, value: Page[]) {
  if (!value || value.length === 0 || parameter.type !== 'book') {
    return EditorState.createWithContent(ContentState.createFromText(""));
  }

  return EditorState.createWithContent(convertFromHTML(value[0].structure));
}

function convertPagesToHtml(pages: any): any[] {
  const parsedPages: any[] = [];

  pages.forEach((page: any) => {
    parsedPages.push({structure: convertToHTML(page.getCurrentContent()), style: null});
  });

  return parsedPages;
}


function updatePagesBasedOnTotalPages(newTotalPages: number, oldTotalPages: number, pages: any) {
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

function isPageNumberOutOfBounds(value: number, total: number) {
  return value <= 0 || value > total;
}