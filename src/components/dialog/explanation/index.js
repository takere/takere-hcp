import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { theme } from "../../../utils/colors";
import { toast } from "react-toastify";
import inputFactory from "../../input/inputFactory";

export const ExplanationDialog = ({
  open,
  handleClose,
  data,
  onAddElementResultValue,
}) => {
  const [dataForm, setDataForm] = useState(data.data.results || {});
  const [totalPages, setTotalPages] = useState(data.data.results?.totalPages || 1);
  const [currentPage, setCurrentPage] = useState(1);
  const [content, setContent] = useState('');
  const [pages, setPages] = useState(['']);
  const { data: payloadData } = data;

  console.log(payloadData);

  const onFormChange = (e, i) => {
    let value = null;

    value = e?.target?.value;
    if (i.type === "DATE_INPUT") {
      value = e.toISOString();
    } else if (i.type === "BOOLEAN_INPUT") {
      value = e.target.checked;
    } else if (i.type === "NUMBER_INPUT") {
      value = parseInt(e?.target?.value);
    }

    setDataForm({
      ...dataForm,
      [i.slug]: value,
    });
  };

  const saveInputs = () => {
    onAddElementResultValue(data, dataForm);
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
    setContent(pages[0]);

    setPages(updatedPages);
  }

  const onChangeCurrentPage = (newCurrentPage) => {
    let newCurrentPageNumber = parseInt(newCurrentPage.target.value);

    if (newCurrentPageNumber <= 0 || newCurrentPageNumber > totalPages) {
      return;
    }

    setCurrentPage(newCurrentPageNumber);
    setContent(pages[newCurrentPageNumber-1]);
  }

  const onChangeContent = (newContent) => {
    const updatedPages = pages;
    
    updatedPages[currentPage-1] = newContent.target.value;

    setContent(newContent.target.value);
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
      <DialogTitle id="max-width-dialog-title">
        {payloadData.label}
        <DialogContentText>{payloadData.description}</DialogContentText>
      </DialogTitle>

      <DialogContent>
        {inputFactory(
          "NUMBER_INPUT", 
          {
            label: "Total pages",
            value: totalPages,
            helperText: "Explanation total pages",
            onChange: (newTotalPages) => onTotalPagesChange(newTotalPages)
          }
        )}
        {inputFactory(
          "NUMBER_INPUT", 
          {
            label: "Current page",
            value: currentPage,
            helperText: "Page to be edited",
            onChange: (newCurrentPage) => onChangeCurrentPage(newCurrentPage)
          }
        )}
        {inputFactory(
          "RAW_TEXT_INPUT", 
          {
            label: "content",
            value: content,
            helperText: "Page content",
            onChange: (newContent) => onChangeContent(newContent)
          }
        )}
      </DialogContent>

      <DialogActions>
        <Button
          onClick={saveInputs}
          variant="contained"
          style={{ backgroundColor: theme.colors.feedback.success.x1 }}
        >
          Salvar
        </Button>
        <Button onClick={handleClose} variant="contained" color="default">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
