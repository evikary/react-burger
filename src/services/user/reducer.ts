import { ILoginAction } from '../../utils/types';
import {
    AUTH_CHECKED,
    SEND_LOGIN_FAILED,
    SEND_LOGIN_STARTED,
    SEND_LOGIN_SUCCESS,
    SEND_LOGOUT_SUCCESS,
    UPDATE_FORM_FAILED,
    UPDATE_FORM_STARTED,
    UPDATE_FORM_SUCCESS,
} from './action';

const initialState = {
    user: null,
    isAuthChecked: false,

    updateUserError: null,
    updateUserRequest: false,
};

export function userReducer(state = initialState, action: ILoginAction) {
    const { type, payload } = action;
    switch (type) {
        case AUTH_CHECKED:
            return {
                ...state,
                isAuthChecked: true,
            };
        case SEND_LOGIN_STARTED:
            return {
                ...state,
            };
        case SEND_LOGIN_SUCCESS:
            return {
                ...state,
                user: payload,
            };
        case SEND_LOGIN_FAILED:
            return initialState;
        case SEND_LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
            };
        case UPDATE_FORM_STARTED:
            return {
                ...state,
                updateUserError: null,
                updateUserRequest: true,
            };
        case UPDATE_FORM_SUCCESS:
            return {
                ...state,
                updateUserError: null,
                updateUserRequest: false,
                user: payload,
            };
        case UPDATE_FORM_FAILED:
            return {
                ...state,
                updateUserRequest: false,
                updateUserError: payload,
            };
        default:
            return state;
    }
}
