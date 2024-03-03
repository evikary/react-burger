import { IUser } from '../../utils/types';
import { TStoreActions } from '../store';
import {
    AUTH_CHECKED,
    REGISTER_USER_FAILED,
    REGISTER_USER_STARTED,
    REGISTER_USER_SUCCESS,
    SEND_LOGIN_FAILED,
    SEND_LOGIN_STARTED,
    SEND_LOGIN_SUCCESS,
    SEND_LOGOUT_SUCCESS,
    UPDATE_FORM_FAILED,
    UPDATE_FORM_STARTED,
    UPDATE_FORM_SUCCESS,
} from './action';

type TUserState = {
    user: IUser | null;
    isAuthChecked: boolean;

    registerUserError: string | null;
    registerUserRequest: boolean;

    loginUserError: string | null;
    loginUserRequest: boolean;

    updateUserError: string | null;
    updateUserRequest: boolean;
};

export const initialState: TUserState = {
    user: null,
    isAuthChecked: false,

    registerUserError: null,
    registerUserRequest: false,

    loginUserError: null,
    loginUserRequest: false,

    updateUserError: null,
    updateUserRequest: false,
};

export function userReducer(state = initialState, action: TStoreActions): TUserState {
    const { type } = action;
    switch (type) {
        case AUTH_CHECKED:
            return {
                ...state,
                isAuthChecked: true,
            };
        case REGISTER_USER_STARTED:
            return {
                ...state,
                registerUserError: null,
                registerUserRequest: true,
            };
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                registerUserError: null,
                registerUserRequest: false,
                user: action.payload,
            };
        case REGISTER_USER_FAILED:
            return {
                ...state,
                registerUserError: action.payload,
                updateUserRequest: false,
            };
        case SEND_LOGIN_STARTED:
            return {
                ...state,
                loginUserError: null,
                loginUserRequest: true,
            };
        case SEND_LOGIN_SUCCESS:
            return {
                ...state,
                loginUserError: null,
                loginUserRequest: false,
                user: action.payload,
            };
        case SEND_LOGIN_FAILED:
            return {
                ...state,
                loginUserError: action.payload,
                loginUserRequest: false,
            };
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
                user: action.payload,
            };
        case UPDATE_FORM_FAILED:
            return {
                ...state,
                updateUserRequest: false,
                updateUserError: action.payload,
            };
        default:
            return state;
    }
}
