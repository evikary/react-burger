import { BURGER_API_URL } from '../utils/ constants';
import {
    IBodyPost,
    IFormForgotData,
    IFormLogin,
    IFormRegister,
    IFormResetPassword,
    IOrder,
    IRegisterResponse,
    IResetResponse,
    IDataIngredients,
    IOptionsResponse,
    IFeedOrders,
    IIngredientsOrder,
    IOrderApi,
    IallOrderApi,
} from '../utils/types';

export const getIngredientsApi = (): Promise<IDataIngredients> => {
    return fetch(`${BURGER_API_URL}/ingredients`)
        .then((data) => checkResponse<IDataIngredients>(data))
        .then((json) => {
            return json;
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

const checkResponse = async <T>(res: Response): Promise<T> => {
    const json: T = await res.json();
    if (!res.ok) {
        return Promise.reject(json);
    }
    return json;
};

export const refreshToken = (): Promise<Pick<IRegisterResponse, 'success' | 'accessToken' | 'refreshToken'>> => {
    return fetch(`${BURGER_API_URL}/auth/token`, {
        method: 'POST',
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((data) => checkResponse<Pick<IRegisterResponse, 'success' | 'accessToken' | 'refreshToken'>>(data))
        .catch((err) => {
            return Promise.reject(err);
        });
};

export const fetchWithRefresh = async <T>(url: string, options: IOptionsResponse): Promise<T> => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err: unknown) {
        if ((err as IResetResponse).message === 'jwt expired') {
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

export const sendRegisterData = (dataForm: IFormRegister): Promise<IRegisterResponse> => {
    return fetch(`${BURGER_API_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(dataForm),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((data) => checkResponse<IRegisterResponse>(data))
        .then((json) => {
            return json;
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

export const sendLoginData = (loginForm: IFormLogin): Promise<IRegisterResponse> => {
    return fetch(`${BURGER_API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(loginForm),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((data) => checkResponse<IRegisterResponse>(data))
        .then((json) => {
            return json;
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

export const resetForgotData = (forgotForm: IFormResetPassword): Promise<IResetResponse> => {
    return fetch(`${BURGER_API_URL}/password-reset/reset`, {
        method: 'POST',
        body: JSON.stringify(forgotForm),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((data) => checkResponse<IResetResponse>(data))
        .then((json) => {
            return json;
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

export const sendForgotData = (forgotForm: IFormForgotData): Promise<IResetResponse> => {
    return fetch(`${BURGER_API_URL}/password-reset`, {
        method: 'POST',
        body: JSON.stringify(forgotForm),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((data) => checkResponse<IResetResponse>(data))
        .then((json) => {
            return json;
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

export const getUserApi = async (token: string): Promise<Pick<IRegisterResponse, 'success' | 'user'>> => {
    try {
        const response = await fetchWithRefresh<Pick<IRegisterResponse, 'success' | 'user'>>(BURGER_API_URL + '/auth/user', {
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

export const updateUserApi = async (forgotForm: IFormForgotData): Promise<Pick<IRegisterResponse, 'success' | 'user'>> => {
    try {
        const response = await fetchWithRefresh<Pick<IRegisterResponse, 'success' | 'user'>>(BURGER_API_URL + '/auth/user', {
            method: 'PATCH',
            body: JSON.stringify(forgotForm),
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('accessToken') || '',
            },
        });
        return response;
    } catch (err) {
        return Promise.reject(err);
    }
};

export const logoutRequest = async (): Promise<IResetResponse> => {
    try {
        const response = await fetch(`${BURGER_API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
        });
        return checkResponse<IResetResponse>(response);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const createOrder = async (data: IBodyPost): Promise<IOrder> => {
    try {
        const response = await fetchWithRefresh<IOrder>(`${BURGER_API_URL}/orders`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('accessToken') || '',
            },
        });
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getOrderApi = async (num: string): Promise<IOrderApi> => {
    return fetch(`${BURGER_API_URL}/orders/${num}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((data) => checkResponse<IallOrderApi>(data))
        .then((json) => {
            return json.orders[0];
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};
