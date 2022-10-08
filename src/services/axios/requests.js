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
        const response = await remoteRequest.get('/progress/patients');
        
        return response.data;
    }

    async getPatient(idPatient, idFlow) {
        const response = await remoteRequest.get(`/progress/patients/${idPatient}/${idFlow}`);
        
        return response.data;
        // return { 
        //     id: 1, 
        //     firstName: 'U1', 
        //     lastName: '', 
        //     email: 'u1@email.com', 
        //     profileUrl: '', 
        //     flow: { 
        //         id: 1, 
        //         name: 'Urolithiasis',
        //         description: 'Fluid monitoring',
        //         completed: [
        //             {
        //                 node: { id: 2, type: 'QUIZ', icon: 'help', bgColor: '#be96fb'  },
        //                 result: [
        //                     { id: 1, question: 'How much fluid did you intake in the last 24 hours? (in liters)', answer: 'Around 2 liters' }
        //                 ],
        //                 date: new Date()
        //             }
        //         ],
        //         ongoing: [
        //             {
        //                 node: { id: 2, type: 'MEDICATION CONTROL', icon: 'healing', bgColor:'#db594f'  },
        //                 result: [
                            
        //                 ],
        //                 deadline: undefined
        //             }
        //         ],
        //         late: [
        //             {
        //                 node: { id: 2, type: 'QUIZ', icon: 'help', bgColor:'#be96fb'  },
        //                 result: [
        //                     { id: 1, question: 'How are you?', answer: 'well' }
        //                 ],
        //                 deadline: new Date()
        //             }
        //         ]
        //     },
        // }
    }

    async getMyFlows(){
        const response = await remoteRequest.get('/flows/mines');
        return response.data;
    }

    async getNodes(){
        const response = await remoteRequest.get('/nodes/me');
        return response.data;
    }

    async getNodeConnections() {
        const response = await remoteRequest.get('/nodes/connections');
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
