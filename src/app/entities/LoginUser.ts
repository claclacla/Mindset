export interface LoginUser {
    email: string,
    password: string
}

export function initLoginUser(): LoginUser {
    return {
        email: "",
        password: "",
    };
}