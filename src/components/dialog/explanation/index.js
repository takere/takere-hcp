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
  const [dataForm, setDataForm] = useState(data.data.results || {});
  const [totalPages, setTotalPages] = useState(data.data.results?.pages?.length ?? 1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(() => {
    const storedPages = data.data.results?.pages ?? [];
    const parsedPages = []; // Set of editor states

    storedPages.forEach(page => {
      parsedPages.push(EditorState.createWithContent(convertFromHTML(page)));
    });

    return parsedPages;
  });
  const [editorState, setEditorState] = useState(() => {
    const loadedPages = data.data.results?.pages;
    let content;

    if (loadedPages != undefined) {
      content = convertFromHTML(loadedPages[0]);
    }
    else {
      content = ContentState.createFromText('');
    }

    return EditorState.createWithContent(content);
  });
  
  const { data: payloadData } = data;

  const saveInputs = () => {
    const parsedPages = [];

    pages.forEach(page => {
      parsedPages.push(convertToHTML(page.getCurrentContent()));
    })

    const newDataForm = {
      ...dataForm,
      pages: parsedPages
    };

    setDataForm(newDataForm);
    onAddElementResultValue(data, newDataForm);
    toast.success(`Dados de ${payloadData.label} salvos`);
  };

  const onTotalPagesChange = (newTotalPages) => {
    let newTotalPageNumber = parseInt(newTotalPages.target.value);

    if (newTotalPageNumber <= 0) {
      return;
    }

    let updatedPages = pages;

    if (newTotalPageNumber > totalPages) {
      let totalNewPages = newTotalPageNumber - totalPages;

      for (let i = 0; i < totalNewPages; i++) {
        updatedPages.push("");
      }
    }
    else if (newTotalPageNumber > 1) {
      updatedPages = updatedPages.slice(0, newTotalPageNumber);
    }

    setTotalPages(newTotalPageNumber);
    setCurrentPage(1);

    setPages(updatedPages);
    setEditorState(pages[0]);
  }

  const onChangeCurrentPage = (newCurrentPage) => {
    let newCurrentPageNumber = parseInt(newCurrentPage.target.value);

    if (newCurrentPageNumber <= 0 || newCurrentPageNumber > totalPages) {
      return;
    }

    setCurrentPage(newCurrentPageNumber);
    setEditorState(pages[newCurrentPageNumber-1]);
  }

  const onChangeState = (newState) => {
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
        <ContentInput value={editorState} onChange={onChangeState} />
      </Body>
      <Footer>
        <SuccessButton title='Salvar' onClick={saveInputs} />
        <DefaultButton title='Fechar' onClick={handleClose} />
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
