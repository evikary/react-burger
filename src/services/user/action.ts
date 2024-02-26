import { IFormLogin, IFormRegister, IUser } from '../../utils/types';
import { getUserApi, logoutRequest, sendLoginData, sendRegisterData, updateUserApi } from '../api';
import { StoreDispatch, StoreThunk } from '../store';

export const AUTH_CHECKED: 'AUTH/CHECKED' = 'AUTH/CHECKED';

export const REGISTER_USER_STARTED: 'REGISTER/USER/STARTED' = 'REGISTER/USER/STARTED';
export const REGISTER_USER_SUCCESS: 'REGISTER/USER/SUCCESS' = 'REGISTER/USER/SUCCESS';
export const REGISTER_USER_FAILED: 'REGISTER/USER/FAILED' = 'REGISTER/USER/FAILED';

export const SEND_LOGIN_STARTED: 'SEND/LOGIN/STARTED' = 'SEND/LOGIN/STARTED';
export const SEND_LOGIN_SUCCESS: 'SEND/LOGIN/SUCCESS' = 'SEND/LOGIN/SUCCESS';
export const SEND_LOGIN_FAILED: 'SEND/LOGIN/FAILED' = 'SEND/LOGIN/FAILED';

export const SEND_LOGOUT_SUCCESS: 'SEND/LOGOUT/SUCCESS' = 'SEND/LOGOUT/SUCCESS';
export const SEND_LOGOUT_FAILED: 'SEND/LOGOUT/FAILED' = 'SEND/LOGOUT/FAILED';

export const UPDATE_FORM_STARTED: 'UPDATE/FORM/STARTED' = 'UPDATE/FORM/STARTED';
export const UPDATE_FORM_SUCCESS: 'UPDATE/FORM/SUCCESS' = 'UPDATE/FORM/SUCCESS';
export const UPDATE_FORM_FAILED: 'UPDATE/FORM/FAILED' = 'UPDATE/FORM/FAILED';

export interface IAuthCheckedAction {
    readonly type: typeof AUTH_CHECKED;
}

export interface IRegisterUserStartedAction {
    readonly type: typeof REGISTER_USER_STARTED;
}

export interface IRegisterUserSuccessAction {
    readonly type: typeof REGISTER_USER_SUCCESS;
    readonly payload: IUser;
}

export interface IRegisterUserFailedAction {
    readonly type: typeof REGISTER_USER_FAILED;
    readonly payload: string;
}

export interface ISendLoginStartedAction {
    readonly type: typeof SEND_LOGIN_STARTED;
}

export interface ISendLoginSuccessAction {
    readonly type: typeof SEND_LOGIN_SUCCESS;
    readonly payload: IUser;
}

export interface ISendLoginFailedAction {
    readonly type: typeof SEND_LOGIN_FAILED;
    readonly payload: string;
}

export interface ISendLogoutSuccessAction {
    readonly type: typeof SEND_LOGOUT_SUCCESS;
}

export interface ISendLogoutFailedAction {
    readonly type: typeof SEND_LOGOUT_FAILED;
}

export interface IUpdateFormStartedAction {
    readonly type: typeof UPDATE_FORM_STARTED;
}

export interface IUpdateFormSuccessAction {
    readonly type: typeof UPDATE_FORM_SUCCESS;
    readonly payload: IUser;
}

export interface IUpdateFormFailedAction {
    readonly type: typeof UPDATE_FORM_FAILED;
    readonly payload: string;
}

export type TUserActions =
    | IAuthCheckedAction
    | IRegisterUserStartedAction
    | IRegisterUserSuccessAction
    | IRegisterUserFailedAction
    | ISendLoginStartedAction
    | ISendLoginSuccessAction
    | ISendLoginFailedAction
    | ISendLogoutSuccessAction
    | ISendLogoutFailedAction
    | IUpdateFormStartedAction
    | IUpdateFormSuccessAction
    | IUpdateFormFailedAction;

export const checkAuth: StoreThunk = () => (dispatch) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        dispatch(getUser(token)).finally(() => {
            dispatch({ type: AUTH_CHECKED });
        });
    } else {
        dispatch({ type: AUTH_CHECKED });
    }
};

export const getUser: StoreThunk<Promise<unknown>> = (token: string) => (dispatch) => {
    return getUserApi(token)
        .then((data) => {
            dispatch({ type: SEND_LOGIN_SUCCESS, payload: data.user });
        })
        .catch((error) => {
            dispatch({ type: SEND_LOGIN_FAILED, payload: error.message });
        });
};

export const sendLogin: StoreThunk = (data: IFormLogin) => (dispatch) => {
    dispatch({ type: SEND_LOGIN_STARTED });
    sendLoginData(data)
        .then((data) => {
            dispatch({ type: SEND_LOGIN_SUCCESS, payload: data.user });
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
        })
        .catch((error) => {
            dispatch({ type: SEND_LOGIN_FAILED, payload: error.message });
        });
};

export const sendLogout: StoreThunk = () => (dispatch) => {
    logoutRequest()
        .then((data) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch({ type: SEND_LOGOUT_SUCCESS });
        })
        .catch((error) => {});
};

export const updateUser: StoreThunk = (forgotForm: IFormRegister) => (dispatch) => {
    dispatch({ type: UPDATE_FORM_STARTED });
    updateUserApi(forgotForm)
        .then((data) => {
            dispatch({ type: UPDATE_FORM_SUCCESS, payload: data.user });
        })
        .catch((error) => {
            dispatch({ type: UPDATE_FORM_FAILED, payload: error.message });
        });
};

export const registerUser: StoreThunk = (forgotForm: IFormRegister) => (dispatch) => {
    dispatch({ type: REGISTER_USER_STARTED });
    sendRegisterData(forgotForm)
        .then((data) => {
            dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
        })
        .catch((error) => {
            dispatch({ type: REGISTER_USER_FAILED, payload: error.message });
        });
};
