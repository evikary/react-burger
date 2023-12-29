import { Dispatch } from 'redux';
import { getUserApi, sendLoginData } from '../api';

export const AUTH_CHECKED = 'AUTH/CHECKED';

export const SEND_LOGIN_STARTED = 'SEND/LOGIN/STARTED';
export const SEND_LOGIN_SUCCESS = 'SEND/LOGIN/SUCCESS';
export const SEND_LOGIN_FAILED = 'SEND/LOGIN/FAILED';

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
        console.log('SEND_LOGIN_STARTED');
        sendLoginData(data)
            .then((data) => {
                console.log('data', data);
                dispatch({ type: SEND_LOGIN_SUCCESS, payload: data.user });
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
            })
            .catch((error) => {
                console.log('err', error);
                dispatch({ type: SEND_LOGIN_FAILED });
            });
    };
}
