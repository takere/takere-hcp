import {remoteRequest} from "./index";
import {toast} from "react-toastify";

export class Requests {

    async getMe(){
        const toastId = toast.loading("Buscando dados...");
        const response = await remoteRequest.get('/users/me');
        toast.dismiss(toastId);
        return response.data.data;
    }

    async getMyFlows(){
        const response = await remoteRequest.get('/tasks/mines');
        return response.data;
    }

    async getNodes(){
        const response = await remoteRequest.get('/nodes/me');
        return response.data;
    }

    async getFlowById(id){
        const toastId = toast.loading("Buscando fluxo...");
        const response = await remoteRequest.get(`/tasks/mine/${id}`);
        toast.dismiss(toastId);
        return response.data;
    }

    async deleteFlowById(id){
        const toastId = toast.loading("Deletando fluxo...");
        const response = await remoteRequest.delete(`/tasks/mine/${id}`);
        toast.dismiss(toastId);
        toast.success('Fluxo deletado com sucesso!')
        return response.data;
    }

    async createOrUpdateFlow(data){
        const toastId = toast.loading("Atualizando fluxo...");
        const response = await remoteRequest.post(`/tasks/create`, data);
        toast.dismiss(toastId);
        toast.success('Fluxo criado com sucesso!')
        return response.data;
    }

}
