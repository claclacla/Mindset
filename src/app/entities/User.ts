export interface User {
    username: string,
    password: string
}

export function initUser(): User {
    return {
        username: "",
        password: ""
    };
}