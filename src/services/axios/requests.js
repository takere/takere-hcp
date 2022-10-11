import {remoteRequest} from "./index";
import {toast} from "react-toastify";
import LocaleService from "../locale.service";

export class Requests {

    constructor() {
        this.localeService = new LocaleService();
    }

    async getMe(){
        const toastId = toast.loading(this.localeService.translate("FETCHING_DATA"));
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
        const toastId = toast.loading(this.localeService.translate("FETCHING_FLOW"));
        const response = await remoteRequest.get(`/flows/mine/${id}`);
        toast.dismiss(toastId);
        return response.data;
    }

    async deleteFlowById(id){
        const toastId = toast.loading(this.localeService.translate("REMOVING_FLOW"));
        const response = await remoteRequest.delete(`/flows/mine/${id}`);
        toast.dismiss(toastId);
        toast.success(this.localeService.translate("FLOW_REMOVED_SUCCESS"))
        return response.data;
    }

    async createOrUpdateFlow(data){
        const toastId = toast.loading(this.localeService.translate("CREATING_FLOW"));
        const response = await remoteRequest.post(`/flows/create`, data);
        toast.dismiss(toastId);
        toast.success(this.localeService.translate("FLOW_CREATED_SUCCESS"))
        return response.data;
    }

}
