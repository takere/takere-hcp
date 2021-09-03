import {remoteRequest} from "../axios";
import {toast} from "react-toastify";

export const makeLogin = async (email, password) => {
    const id = toast.loading("Fazendo login...")
    try {
        const response = await remoteRequest.post('/users/login', {
            email,
            password
        });
        toast.dismiss(id);
        if(response.data.token) {
            toast.success("Login com sucesso!")
            localStorage.setItem('x_auth_token', response.data.token);
            return true;
        } else {
            return false;
        }
    } catch (e) {
        toast.dismiss(id);
        toast.error('Opps.. Algo está errado!')
    }
}

export const makeLogout = async () => {
    localStorage.clear();
}
