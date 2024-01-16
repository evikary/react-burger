import { BURGER_API_URL } from '../utils/ constants';

const checkResponse = async (res: Response) => {
    const json = await res.json();
    if (!res.ok) {
        return Promise.reject(json);
    }
    return json;
};

export const refreshToken = () => {
    return fetch(`${BURGER_API_URL}/auth/token`, {
        method: 'POST',
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(checkResponse)
        .catch((err) => {
            return Promise.reject(err);
        });
};

export const fetchWithRefresh = async (url: string, options: any) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err: any) {
        if (err.message === 'jwt expired') {
            const refreshData = await refreshToken(); // обновляем токен
            localStorage.setItem('refreshToken', refreshData.refreshToken);
            localStorage.setItem('accessToken', refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options); //повторяем запрос
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
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
        })
        .catch((err) => {
            return Promise.reject(err);
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
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

export const resetForgotData = (forgotForm: any) => {
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
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

export const sendForgotData = (forgotForm: any) => {
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
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

export const getUserApi = async (token: string) => {
    try {
        const response = await fetchWithRefresh(BURGER_API_URL + '/auth/user', {
            method: 'GET',
            headers: {
                authorization: token,
            },
        });
        return response;
    } catch (err) {
        return Promise.reject(err);
    }
};

export const updateUserApi = async (forgotForm: any) => {
    try {
        const response = await fetchWithRefresh(BURGER_API_URL + '/auth/user', {
            method: 'PATCH',
            body: JSON.stringify(forgotForm),
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('accessToken'),
            },
        });
        return response;
    } catch (err) {
        return Promise.reject(err);
    }
};

export const logoutRequest = async () => {
    try {
        return await fetch(`${BURGER_API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
        });
    } catch (error) {
        return Promise.reject(error);
    }
};
