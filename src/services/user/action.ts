import { Dispatch } from 'redux';
import { getUserApi, logoutRequest, sendLoginData, updateUserApi } from '../api';

export const AUTH_CHECKED = 'AUTH/CHECKED';

export const SEND_LOGIN_STARTED = 'SEND/LOGIN/STARTED';
export const SEND_LOGIN_SUCCESS = 'SEND/LOGIN/SUCCESS';
export const SEND_LOGIN_FAILED = 'SEND/LOGIN/FAILED';

export const SEND_LOGOUT_SUCCESS = 'SEND/LOGOUT/SUCCESS';
export const SEND_LOGOUT_FAILED = 'SEND/LOGOUT/FAILED';

export const UPDATE_FORM_STARTED = 'UPDATE/FORM/STARTED';
export const UPDATE_FORM_SUCCESS = 'UPDATE/FORM/SUCCESS';
export const UPDATE_FORM_FAILED = 'UPDATE/FORM/FAILED';

export function checkAuth() {
    return function (dispatch: Dispatch) {
        const token = localStorage.getItem('accessToken');
        if (token) {
            dispatch(getUser(token)).finally(() => {
                dispatch({ type: AUTH_CHECKED });
            });
        } else {
            dispatch({ type: AUTH_CHECKED });
        }
    };
}

export function getUser(token: string): any {
    return function (dispatch: Dispatch) {
        return getUserApi(token)
            .then((data) => {
                dispatch({ type: SEND_LOGIN_SUCCESS, payload: data.user });
            })
            .catch((error) => {
                // dispatch({ type: SEND_LOGIN_FAILED });
            });
    };
}

export function sendLogin(data: any) {
    return function (dispatch: Dispatch) {
        dispatch({ type: SEND_LOGIN_STARTED });
        sendLoginData(data)
            .then((data) => {
                dispatch({ type: SEND_LOGIN_SUCCESS, payload: data.user });
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
            })
            .catch((error) => {
                dispatch({ type: SEND_LOGIN_FAILED });
            });
    };
}

export function sendLogout() {
    return function (dispatch: Dispatch) {
        logoutRequest()
            .then((data) => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                dispatch({ type: SEND_LOGOUT_SUCCESS });
            })
            .catch((error) => {
                // dispatch({ type: SEND_LOGOUT_FAILED });
            });
    };
}

export function updateUser(forgotForm: any) {
    return function (dispatch: Dispatch) {
        dispatch({ type: UPDATE_FORM_STARTED });
        updateUserApi(forgotForm)
            .then((data) => {
                dispatch({ type: UPDATE_FORM_SUCCESS, payload: data.user });
            })
            .catch((error) => {
                dispatch({ type: UPDATE_FORM_FAILED });
            });
    };
}
