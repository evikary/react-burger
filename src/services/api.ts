import { BURGER_API_URL } from '../utils/ constants';

const checkResponse = (res: Response) => {
    if (!res.ok) {
        throw new Error(`Произошла ошибка! Cтатус ошибки ${res}`);
    }

    return res.json();
};

export const sendRegisterData = (dataForm: any) => {
    return fetch(`${BURGER_API_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(dataForm),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(checkResponse)
        .then((json) => {
            return json;
        });
};

export const sendLoginData = (loginForm: any) => {
    return fetch(`${BURGER_API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(loginForm),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(checkResponse)
        .then((json) => {
            return json;
        });
};

export const resetForgotData = (forgotForm: any) => {
    return fetch(`${BURGER_API_URL}/password-reset`, {
        method: 'POST',
        body: JSON.stringify(forgotForm),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(checkResponse)
        .then((json) => {
            return json;
        });
};

export const sendForgotData = (forgotForm: any) => {
    return fetch(`${BURGER_API_URL}/password-reset/reset`, {
        method: 'POST',
        body: JSON.stringify(forgotForm),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(checkResponse)
        .then((json) => {
            return json;
        });
};

export const getUserApi = (token: string) => {
    return fetch(`${BURGER_API_URL}/auth/user`, {
        method: 'GET',
        headers: {
            authorization: token,
        },
    })
        .then(checkResponse)
        .then((json) => {
            return json;
        });
};
