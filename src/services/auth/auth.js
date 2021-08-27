
export const makeLogin = async (email, passowrd) => {
    const hasAccess = true;
    if(hasAccess) {
        localStorage.setItem('isAuthenticated', 'true');
        return true;
    } else {
        return false;
    }

}

export const makeLogout = async () => {
    localStorage.clear();
}
