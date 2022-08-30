import {remoteRequest} from "./index";
import {toast} from "react-toastify";

export class Requests {

    async getMe(){
        const toastId = toast.loading("Buscando dados...");
        const response = await remoteRequest.get('/users/me');
        toast.dismiss(toastId);
        return response.data.data;
    }

    async getPatients() {
        return [
            { id: 1, firstName: 'William', lastName: 'Niemiec', email: 'william@email.com', profileUrl: '', flow: { id: 1, name: 'Diabetes' } },
            { id: 1, firstName: 'William', lastName: 'Niemiec', email: 'william@email.com', profileUrl: '', flow: { id: 1, name: 'Flow name' } },
        ]
    }

    async getPatient(idPatient, idFlow) {
        return { 
            id: 1, 
            firstName: 'William', 
            lastName: 'Niemiec', 
            email: 'william@email.com', 
            profileUrl: '', 
            flow: { id: 1, name: 'Diabetes', description: 'Patient with diabetes' } ,
            executed: [
                {
                    node: { id: 2, name: 'QUIZ_NODE', icon: 'question'  },
                    result: [
                        { id: 1, question: 'How are you?', answer: 'well' }
                    ]
                }
            ]
        }
    }

    async getMyFlows(){
        const response = await remoteRequest.get('/flows/mines');
        return response.data;
    }

    async getNodes(){
        const response = await remoteRequest.get('/nodes/me');
        return response.data;
    }

    async getFlowById(id){
        const toastId = toast.loading("Buscando fluxo...");
        const response = await remoteRequest.get(`/flows/mine/${id}`);
        toast.dismiss(toastId);
        return response.data;
    }

    async deleteFlowById(id){
        const toastId = toast.loading("Deletando fluxo...");
        const response = await remoteRequest.delete(`/flows/mine/${id}`);
        toast.dismiss(toastId);
        toast.success('Fluxo deletado com sucesso!')
        return response.data;
    }

    async createOrUpdateFlow(data){
        const toastId = toast.loading("Atualizando fluxo...");
        const response = await remoteRequest.post(`/flows/create`, data);
        toast.dismiss(toastId);
        toast.success('Fluxo criado com sucesso!')
        return response.data;
    }

}
