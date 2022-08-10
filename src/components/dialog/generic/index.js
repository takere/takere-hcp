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

export const GenericDialog = ({
  open,
  handleClose,
  data,
  onAddElementResultValue,
}) => {
  const [dataForm, setDataForm] = useState(data.data.results || {});
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
        {payloadData?.inputFields.map((i) => (
            inputFactory(
            i.type, 
            {
              label: i.name, 
              value: dataForm[i.slug], 
              helperText: i.description, 
              onChange: (e) => onFormChange(e, i), 
              options: i?.options
            }
          )
        ))}
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
