import {remoteRequest} from "../axios";
import {toast} from "react-toastify";
import LocaleService from "../locale.service";

export const makeLogin = async (email, password) => {
    const localeService = new LocaleService();
    const id = toast.loading(localeService.translate("LOGIN_PROGRESS"))
    try {
        const response = await remoteRequest.post('/users/login', {
            email,
            password
        });
        localStorage.setItem('user', JSON.stringify(response.data.userData))
        toast.dismiss(id);
        if(response.data.token) {
            toast.success(localeService.translate("LOGIN_SUCCESS"))
            localStorage.setItem('x_auth_token', response.data.token);
            return true;
        } else {
            return false;
        }
    } catch (e) {
        toast.dismiss(id);
        toast.error(localeService.translate("LOGIN_FAIL"))
    }
}

export const makeLogout = async () => {
    localStorage.clear();
}
