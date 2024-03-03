import { initialState, modalOrderReducer } from './reducer';
import {
    GET_ORDER_REQUEST,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    CREATED_ORDER,
    OPEN_MODAL_ORDER,
    CLOSE_MODAL_ORDER,
    MODAL_ORDER_FAILED,
} from './action';

describe('Modal-order reducer', () => {
    test('should return initial state', () => {
        const expectedState = initialState;
        const result = modalOrderReducer(undefined, {});

        expect(result).toStrictEqual(expectedState);
    });

    test('should pass order request', () => {
        const action = { type: GET_ORDER_REQUEST };
        const state = { ...initialState, isCreatedOrder: false };
        const result = modalOrderReducer(state, action);

        const expectedState = { ...initialState, isCreatedOrder: true };

        expect(result).toStrictEqual(expectedState);
    });

    test('should pass order success', () => {
        const action = { type: GET_ORDER_SUCCESS, payload: [] };
        const state = { ...initialState, currentOrder: null };
        const result = modalOrderReducer(state, action);

        const expectedState = { ...initialState, currentOrder: [] };

        expect(result).toStrictEqual(expectedState);
    });

    test('should pass order request', () => {
        const action = { type: GET_ORDER_FAILED };
        const state = { ...initialState, isCreatedOrder: true };
        const result = modalOrderReducer(state, action);

        const expectedState = { ...initialState, isCreatedOrder: false };

        expect(result).toStrictEqual(expectedState);
    });

    test('should pass created order', () => {
        const action = { type: CREATED_ORDER };
        const state = { ...initialState, isCreatedOrder: false };
        const result = modalOrderReducer(state, action);

        const expectedState = { ...initialState, isCreatedOrder: true };

        expect(result).toStrictEqual(expectedState);
    });

    test('should open modal window', () => {
        const action = { type: OPEN_MODAL_ORDER };
        const state = { ...initialState, num: null };
        const result = modalOrderReducer(state, action);

        const expectedState = { ...initialState, num: action.payload };

        expect(result).toStrictEqual(expectedState);
    });

    test('should close modal window', () => {
        const action = { type: CLOSE_MODAL_ORDER, payload: 10 };
        const state = { ...initialState, num: 10, isCreatedOrder: true };
        const result = modalOrderReducer(state, action);

        const expectedState = { ...initialState, num: null, isCreatedOrder: false };

        expect(result).toStrictEqual(expectedState);
    });

    test('should failed modal window', () => {
        const action = { type: MODAL_ORDER_FAILED };
        const state = { ...initialState, num: null };
        const result = modalOrderReducer(state, action);

        const expectedState = initialState;

        expect(result).toStrictEqual(expectedState);
    });
});
