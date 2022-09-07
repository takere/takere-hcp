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
            flow: { 
                id: 1, 
                name: 'Diabetes',
                description: 'Patient with diabetes',
                completed: [
                    {
                        node: { id: 2, type: 'QUIZ', icon: 'help', bgColor: '#be96fb'  },
                        result: [
                            { id: 1, question: 'How are you?', answer: 'I\'m always tired and I don\'t feel hungry' }
                        ],
                        date: new Date()
                    }
                ],
                ongoing: [
                    {
                        node: { id: 2, type: 'MEDICATION CONTROL', icon: 'healing', bgColor:'#db594f'  },
                        result: [
                            
                        ],
                        deadline: undefined
                    }
                ],
                late: [
                    {
                        node: { id: 2, type: 'QUIZ', icon: 'help', bgColor:'#be96fb'  },
                        result: [
                            { id: 1, question: 'How are you?', answer: 'well' }
                        ],
                        deadline: new Date()
                    }
                ]
            },
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
