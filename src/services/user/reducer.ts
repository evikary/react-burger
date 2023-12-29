import { ILoginAction } from '../../utils/types';
import { AUTH_CHECKED, SEND_LOGIN_FAILED, SEND_LOGIN_STARTED, SEND_LOGIN_SUCCESS } from './action';

const initialState = {
    user: null,
    isAuthChecked: false,
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
        default:
            return state;
    }
}
