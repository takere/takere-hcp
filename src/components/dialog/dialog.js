import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {theme} from "../../utils/colors";


export const DialogPop = ({open, handleClose, data}) => {
    const { data: payloadData } = data;

    console.log('data dialog', payloadData, data)

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"md"}
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle id="max-width-dialog-title">
                {payloadData.data.label}
                <DialogContentText>
                {payloadData.data.description}
            </DialogContentText></DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {payloadData.data.description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="contained" style={{backgroundColor: theme.colors.feedback.success.x1}}>
                    Salvar
                </Button>
                <Button onClick={handleClose} variant="contained" color="default">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    )
}