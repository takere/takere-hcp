import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {theme} from "../../utils/colors";
import * as Styled from "./dialog.styled";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Checkbox from "@material-ui/core/Checkbox";
import {toast} from "react-toastify";


export const DialogPop = ({open, handleClose, data, onAddElementResultValue}) => {
    const [dataForm, setDataForm] = useState( data.data.results || {});
    const { data: payloadData } = data;

    console.log(data)

    const onFormChange = (e, i) => {
        let value = null;

        value = e?.target?.value
        if(i.type === 'DATE_INPUT'){
            value = e.toISOString();
        } else if (i.type === 'BOOLEAN_INPUT') {
            value = e.target.checked;
        } else if (i.type === 'NUMBER_INPUT') {
            value = parseInt(e?.target?.value)
        }

        setDataForm({
            ...dataForm,
            [i.slug]: value
        })
    }

    const saveInputs = () => {
        onAddElementResultValue(data, dataForm);
        toast.success(`Dados de ${payloadData.label} salvos`
)
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
                <DialogContentText>
                {payloadData.description}
            </DialogContentText></DialogTitle>
            <DialogContent>
                {
                    payloadData?.inputFields.map(i => {
                        switch (i.type) {
                            case 'RAW_TEXT':
                                return (
                                    <>
                                        <Styled.InputDefault
                                            id="outlined-basic"
                                            label={i.name}
                                            variant="outlined"
                                            type="text"
                                            helperText={i.description}
                                            value={dataForm[i.slug]}
                                            onChange={e => onFormChange(e, i)}
                                            size="small"
                                        />
                                        <Styled.Spacing />
                                    </>
                                )
                            case 'DATE_INPUT':
                                return (
                                    <>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Styled.InputDatePicker
                                            variant="outlined"
                                            label={i.name}
                                            value={dataForm[i.slug]}
                                            onChange={e => onFormChange(e, i)}
                                        />
                                    </MuiPickersUtilsProvider>
                                        <Styled.Spacing />
                                    </>
                                )
                            case 'BOOLEAN_INPUT':
                                return (
                                    <>
                                        <Styled.TextName>
                                            {i.name}
                                        </Styled.TextName>
                                        <Checkbox
                                            checked={dataForm[i.slug]}
                                            onChange={e => onFormChange(e, i)}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <Styled.Spacing />
                                    </>
                                )
                            case 'MULTISELECT':
                                return (
                                    <>
                                        <Styled.InputDefault
                                            label={i.name}
                                            id="outlined-select-currency-native"
                                            select
                                            variant="outlined"
                                            value={dataForm[i.slug]}
                                            onChange={e => onFormChange(e, i)}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            helperText={i.description}
                                        >
                                            {i?.options?.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </Styled.InputDefault>
                                        <Styled.Spacing />
                                    </>
                                )
                            case 'NUMBER_INPUT':
                                return (
                                    <>
                                        <Styled.InputDefault
                                            id="outlined-basic"
                                            label={i.name}
                                            variant="outlined"
                                            type="number"
                                            helperText={i.description}
                                            value={dataForm[i.slug]}
                                            onChange={e => onFormChange(e, i)}
                                            size="small"
                                        />
                                        <Styled.Spacing />
                                    </>
                                )
                            default:
                                return (
                                    <>
                                        <Styled.InputDefault
                                            id="outlined-basic"
                                            label={i.name}
                                            variant="outlined"
                                            type="text"
                                            helperText={i.description}
                                            value={dataForm[i.slug]}
                                            onChange={e => onFormChange(e, i)}
                                            size="small"
                                        />
                                        <Styled.Spacing />
                                    </>
                                )
                        }
                    })
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={saveInputs} variant="contained" style={{backgroundColor: theme.colors.feedback.success.x1}}>
                    Salvar
                </Button>
                <Button onClick={handleClose} variant="contained" color="default">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
