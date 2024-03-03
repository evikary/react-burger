import { initialState, userReducer } from './reducer';
import {
    AUTH_CHECKED,
    REGISTER_USER_STARTED,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    SEND_LOGIN_STARTED,
    SEND_LOGIN_SUCCESS,
    SEND_LOGIN_FAILED,
    SEND_LOGOUT_SUCCESS,
    UPDATE_FORM_STARTED,
    UPDATE_FORM_SUCCESS,
    UPDATE_FORM_FAILED,
} from './action';

describe('User reducer', () => {
    test('should return initial state', () => {
        const expectedState = initialState;
        const result = userReducer(undefined, {});

        expect(result).toStrictEqual(expectedState);
    });

    test('should pass checked auth', () => {
        const action = { type: AUTH_CHECKED };
        const state = { ...initialState, isAuthChecked: false };
        const result = userReducer(state, action);

        const expectedState = { ...initialState, isAuthChecked: true };

        expect(result).toStrictEqual(expectedState);
    });

    test('should pass register user started', () => {
        const action = { type: REGISTER_USER_STARTED };
        const state = { ...initialState, registerUserError: null, registerUserRequest: false };
        const result = userReducer(state, action);

        const expectedState = { ...initialState, registerUserError: null, registerUserRequest: true };

        expect(result).toStrictEqual(expectedState);
    });

    test('should pass register user success', () => {
        const action = { type: REGISTER_USER_SUCCESS, payload: {} };
        const state = { ...initialState, registerUserError: null, registerUserRequest: true, user: null };
        const result = userReducer(state, action);

        const expectedState = { ...initialState, registerUserError: null, registerUserRequest: false, user: {} };

        expect(result).toStrictEqual(expectedState);
    });

    test('should pass register user failed', () => {
        const action = { type: REGISTER_USER_FAILED, payload: 'Error' };
        const state = { ...initialState, updateUserRequest: false, registerUserError: null };
        const result = userReducer(state, action);

        const expectedState = { ...initialState, updateUserRequest: false, registerUserError: 'Error' };

        expect(result).toStrictEqual(expectedState);
    });

    test('should pass send login started', () => {
        const action = { type: SEND_LOGIN_STARTED };
        const state = { ...initialState, loginUserError: null, loginUserRequest: false };
        const result = userReducer(state, action);

        const expectedState = { ...initialState, loginUserError: null, loginUserRequest: true };

        expect(result).toStrictEqual(expectedState);
    });

    test('should pass send login success', () => {
        const action = { type: SEND_LOGIN_SUCCESS, payload: {} };
        const state = { ...initialState, loginUserError: null, loginUserRequest: true, user: null };
        const result = userReducer(state, action);

        const expectedState = { ...initialState, loginUserError: null, loginUserRequest: false, user: {} };

        expect(result).toStrictEqual(expectedState);
    });

    test('should pass send login failed', () => {
        const action = { type: SEND_LOGIN_FAILED, payload: 'Error' };
        const state = { ...initialState, loginUserRequest: false, loginUserError: null };
        const result = userReducer(state, action);

        const expectedState = { ...initialState, loginUserRequest: false, loginUserError: 'Error' };

        expect(result).toStrictEqual(expectedState);
    });

    test('should pass send logout success', () => {
        const action = { type: SEND_LOGOUT_SUCCESS, payload: {} };
        const state = { ...initialState, user: {} };
        const result = userReducer(state, action);

        const expectedState = { ...initialState, user: null };

        expect(result).toStrictEqual(expectedState);
    });

    test('should pass update form started', () => {
        const action = { type: UPDATE_FORM_STARTED };
        const state = { ...initialState, updateUserError: null, updateUserRequest: false };
        const result = userReducer(state, action);

        const expectedState = { ...initialState, updateUserError: null, updateUserRequest: true };

        expect(result).toStrictEqual(expectedState);
    });

    test('should pass update form success', () => {
        const action = { type: UPDATE_FORM_SUCCESS, payload: {} };
        const state = { ...initialState, updateUserError: null, updateUserRequest: true, user: null };
        const result = userReducer(state, action);

        const expectedState = { ...initialState, updateUserError: null, updateUserRequest: false, user: {} };

        expect(result).toStrictEqual(expectedState);
    });

    test('should pass update form failed', () => {
        const action = { type: UPDATE_FORM_FAILED, payload: 'Error' };
        const state = { ...initialState, updateUserRequest: false, updateUserError: null };
        const result = userReducer(state, action);

        const expectedState = { ...initialState, updateUserRequest: false, updateUserError: 'Error' };

        expect(result).toStrictEqual(expectedState);
    });
});
