import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import { EditorState, ContentState } from "draft-js";
import { convertFromHTML, convertToHTML } from "draft-convert";
import SuccessButton from "../../buttons/SuccessButton";
import DefaultButton from "../../buttons/DefaultButton";
import { Header, Body, Footer } from "../";
import NumberInput from "../../../parts/input/NumberInput";
import RichTextInput from "../../../parts/input/RichTextInput";
import RawTextInput from "../../../parts/input/RawTextInput";


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const ExplanationDialog = ({
  open,
  handleClose,
  data,
  onAddElementResultValue,
}) => {
  const { data: payloadData } = data;

  const [name, setName] = useState(loadStoredName(data));
  const [description, setDescription] = useState(loadStoredDescription(data));
  const [dataForm, setDataForm] = useState(loadStoredFields(data));
  const [totalPages, setTotalPages] = useState(loadStoredTotalPages(data));
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(() => loadStoredPages(data));
  const [editorState, setEditorState] = useState(loadEditorState(data));

  const saveInputs = () => {
    const newDataForm = {
      ...dataForm,
      name,
      description,
      pages: convertPagesToHtml(pages),
    };

    setDataForm(newDataForm);
    onAddElementResultValue(data, newDataForm);
    toast.success(`Dados de ${payloadData.label} salvos`);
  };

  const onTotalPagesChange = (rawValue) => {
    let newTotalPages = parseInt(rawValue);

    if (newTotalPages <= 0) {
      return;
    }

    setTotalPages(newTotalPages);
    setCurrentPage(1);
    setPages(updatePagesBasedOnTotalPages(newTotalPages, totalPages, pages));
    setEditorState(pages[0]);
  };

  const onChangeCurrentPage = (rawValue) => {
    let newCurrentPage = parseInt(rawValue);

    if (isPageNumberOutOfBounds(newCurrentPage, totalPages)) {
      return;
    }

    setCurrentPage(newCurrentPage);
    setEditorState(pages[newCurrentPage - 1]);
  };

  const onChangeEditorState = (newState) => {
    setEditorState(newState);

    const updatedPages = pages;

    updatedPages[currentPage - 1] = newState;

    setPages(updatedPages);
  };

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
        <RawTextInput
          label="Name"
          helperText="What's the subject?"
          value={name}
          onChange={setName}
        />
        <RawTextInput
          label="Description"
          helperText="This explanation is about..."
          value={description}
          onChange={setDescription}
        />
        <NumberInput
          label="Total pages"
          helperText="Explanation total pages"
          value={totalPages}
          onChange={onTotalPagesChange}
        />
        <NumberInput
          label="Current page"
          helperText="Page to be edited"
          value={currentPage}
          onChange={onChangeCurrentPage}
        />
        <RichTextInput
          label="Content"
          value={editorState}
          onChange={onChangeEditorState}
        />
      </Body>
      <Footer>
        <SuccessButton title="Save" onClick={saveInputs} />
        <DefaultButton title="Close" onClick={handleClose} />
      </Footer>
    </Dialog>
  );
};

export default ExplanationDialog;


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function loadStoredName(data) {
  if (!hasResults(data) || !data.data.results.name) {
    return '';
  }

  return data.data.results.name;
}

function hasResults(data) {
  return  data
          && data.data 
          && data.data.results;
}

function loadStoredDescription(data) {
  if (!hasResults(data) || !data.data.results.description) {
    return '';
  }

  return data.data.results.description;
}

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

  storedPages.forEach((page) => {
    parsedPages.push(EditorState.createWithContent(convertFromHTML(page)));
  });

  return parsedPages;
}

function loadEditorState(data) {
  const loadedPages = data.data.results?.pages;
  let content = "";

  if (loadedPages !== undefined) {
    content = convertFromHTML(loadedPages[0]);
  } else {
    content = ContentState.createFromText("");
  }

  return EditorState.createWithContent(content);
}

function convertPagesToHtml(pages) {
  const parsedPages = [];

  pages.forEach((page) => {
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
  } else if (newTotalPages > 1) {
    updatedPages = updatedPages.slice(0, newTotalPages);
  }

  return updatedPages;
}

function isPageNumberOutOfBounds(value, total) {
  return value <= 0 || value > total;
}
