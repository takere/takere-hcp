import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {theme} from "../../utils/colors";
import * as Styled from "../sidebar/sidebar.styled";
import {Requests} from "../../services/axios/requests";


export const SaveDialogPop = ({open, handleClose, data}) => {
    const [name, setName] = useState( '');
    const [description, setDescription] = useState('');
    const [dataFlow, setDataFlow] = useState([]);
    const [userEmail, setUserEmail] = useState( '');


    useEffect(() => {
        console.log(data)
        if(data?.flow?.flowName){
            setName(data.flow.flowName)
        }
        if(data?.flow?.flowDescription){
            setDescription(data.flow.flowDescription)
        }
        console.log(data?.elements)
        setDataFlow(data?.elements)
    }, [data]);

    const onNameChange = (e) => {
        const keyword = e.target.value;
        setName(keyword)
    }

    const onUserEmailChange = (e) => {
        const keyword = e.target.value;
        setUserEmail(keyword)
    }

    const handleSave = () => {
        const payload = {
            name,
            description,
            userEmail,
            data: dataFlow
        }

        new Requests().createOrUpdateFlow(payload).then(r => {
            handleClose()
        })
    }

    const onDescriptionChange = (e) => {
        const keyword = e.target.value;
        setDescription(keyword)
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
                Savar Fluxo
                <DialogContentText>
                Criar um fluxo novo, use esse popup para salvar seu fluxo!
            </DialogContentText></DialogTitle>
            <DialogContent>
                <Styled.TitleContainer>
                    <Styled.Spacing />
                    <Styled.InputDefault
                        id="outlined-basic"
                        label="Nome do fluxo"
                        variant="outlined"
                        type="text"
                        helperText="Adicione aqui um nome para o fluxo"
                        value={name}
                        onChange={onNameChange}
                        size="small"
                        placeholder="Fluxo para tratamento de dor"
                    />
                    <Styled.Spacing />
                    <Styled.InputDefault
                        id="outlined-basic"
                        label="Descrição"
                        variant="outlined"
                        type="text-area"
                        value={description}
                        helperText="Adicione aqui uma descrição do fluxo"
                        onChange={onDescriptionChange}
                        size="small"
                        placeholder="Descrição"
                    />
                    <Styled.Spacing />
                    <Styled.InputDefault
                        id="outlined-basic"
                        label="Email do paciente"
                        variant="outlined"
                        type="text-area"
                        value={userEmail}
                        helperText="Adicione aqui o email do usuário do fluxo"
                        onChange={onUserEmailChange}
                        size="small"
                        placeholder="joao@gmail.com"
                    />
                    <Styled.Spacing />
                </Styled.TitleContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSave} variant="contained" style={{backgroundColor: theme.colors.feedback.success.x1}}>
                    Salvar
                </Button>
                <Button onClick={handleClose} variant="contained" color="default">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
