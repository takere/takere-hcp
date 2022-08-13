import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import { inputFactory } from "../../input";
import { EditorState, ContentState } from 'draft-js';
import { convertFromHTML, convertToHTML } from "draft-convert";
import SuccessButton from '../../buttons/SuccessButton';
import DefaultButton from '../../buttons/DefaultButton';
import { Header, Body, Footer } from '../'


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
export const ExplanationDialog = ({
  open,
  handleClose,
  data,
  onAddElementResultValue,
}) => {
  const { data: payloadData } = data;
  
  const [dataForm, setDataForm] = useState(loadStoredFields(data));
  const [totalPages, setTotalPages] = useState(loadStoredTotalPages(data));
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(() => loadStoredPages(data));
  const [editorState, setEditorState] = useState(loadEditorState(data));
  
  const saveInputs = () => {
    const newDataForm = {
      ...dataForm,
      pages: convertPagesToHtml(pages)
    };

    setDataForm(newDataForm);
    onAddElementResultValue(data, newDataForm);
    toast.success(`Dados de ${payloadData.label} salvos`);
  };

  const onTotalPagesChange = (event) => {
    let newTotalPages = parseInt(event.target.value);

    if (newTotalPages <= 0) {
      return;
    }

    setTotalPages(newTotalPages);
    setCurrentPage(1);
    setPages(updatePagesBasedOnTotalPages(newTotalPages, totalPages, pages));
    setEditorState(pages[0]);
  }

  const onChangeCurrentPage = (event) => {
    let newCurrentPage = parseInt(event.target.value);

    if (isPageNumberOutOfBounds(newCurrentPage, totalPages)) {
      return;
    }

    setCurrentPage(newCurrentPage);
    setEditorState(pages[newCurrentPage-1]);
  }

  const onChangeEditorState = (newState) => {
    setEditorState(newState);

    const updatedPages = pages;
    
    updatedPages[currentPage-1] = newState;
    
    setPages(updatedPages);
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <Header title={payloadData.label} subtitle={payloadData.description} />
      <Body>
        <TotalPagesInput value={totalPages} onChange={onTotalPagesChange} />
        <CurrentPageInput value={currentPage} onChange={onChangeCurrentPage} />
        <ContentInput value={editorState} onChange={onChangeEditorState} />
      </Body>
      <Footer>
        <SuccessButton title='Save' onClick={saveInputs} />
        <DefaultButton title='Close' onClick={handleClose} />
      </Footer>
    </Dialog>
  );
};

const TotalPagesInput = ({ value, onChange }) => (
  inputFactory(
    "NUMBER_INPUT", 
    {
      label: "Total pages",
      value,
      helperText: "Explanation total pages",
      onChange
    }
  )
);

const CurrentPageInput = ({ value, onChange }) => (
  inputFactory(
    "NUMBER_INPUT", 
    {
      label: "Current page",
      value,
      helperText: "Page to be edited",
      onChange
    }
  )
);

const ContentInput = ({ value, onChange }) => (
  inputFactory(
    "RICH_TEXT_INPUT", 
    {
      label: "content",
      editorState: value, 
      setEditorState: onChange
    }
  )
);


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function loadStoredFields(data) {
  if (!data || !data.data || !data.data.results) {
    return {};
  }

  return data.data.results;
}

function loadStoredTotalPages(data) {
  if (!data || !data.data || !data.data.results || !data.data.results.pages) {
    return 1;
  }

  return data.data.results.pages.length;
}

function loadStoredPages(data) {
  const storedPages = data.data.results?.pages ?? [];
  const parsedPages = []; // Set of editor states

  storedPages.forEach(page => {
    parsedPages.push(EditorState.createWithContent(convertFromHTML(page)));
  });

  return parsedPages;
}

function loadEditorState(data) {
  const loadedPages = data.data.results?.pages;
  let content = '';

  if (loadedPages !== undefined) {
    content = convertFromHTML(loadedPages[0]);
  }
  else {
    content = ContentState.createFromText('');
  }

  return EditorState.createWithContent(content);
}

function convertPagesToHtml(pages) {
  const parsedPages = [];

  pages.forEach(page => {
    parsedPages.push(convertToHTML(page.getCurrentContent()));
  });

  return parsedPages;
}

function updatePagesBasedOnTotalPages(newTotalPages, oldTotalPages, pages) {
  let updatedPages = pages;

  if (newTotalPages > oldTotalPages) {
    let totalNewPages = newTotalPages - oldTotalPages;

    for (let i = 0; i < totalNewPages; i++) {
      updatedPages.push("");
    }
  }
  else if (newTotalPages > 1) {
    updatedPages = updatedPages.slice(0, newTotalPages);
  }

  return updatedPages;
}

function isPageNumberOutOfBounds(value, total) {
  return (value <= 0) || (value > total);
}
