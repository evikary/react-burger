import { WebSocketStatus } from '../../utils/types';
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from './actions';
import { ordersReducer, initialState } from './reducer';

describe('Orders reducer', () => {
    test('should return initial state', () => {
        const expected = initialState;

        const result = ordersReducer(undefined, {});

        expect(result).toStrictEqual(expected);
    });

    test('should pass when wsConnecting', () => {
        const action = { type: wsConnecting };
        const state = { ...initialState, status: WebSocketStatus.OFFLINE };
        const expected = { ...initialState, status: WebSocketStatus.CONNECTING };

        const result = ordersReducer(state, action);

        expect(result).toStrictEqual(expected);
    });

    test('should pass when wsOpen', () => {
        const action = { type: wsOpen };
        const state = { ...initialState, status: WebSocketStatus.OFFLINE, error: 'Error' };
        const expected = { ...initialState, status: WebSocketStatus.ONLINE, error: '' };

        const result = ordersReducer(state, action);

        expect(result).toStrictEqual(expected);
    });

    test('should pass when wsClose', () => {
        const action = { type: wsClose };
        const state = { ...initialState, status: WebSocketStatus.ONLINE };
        const expected = { ...initialState, status: WebSocketStatus.OFFLINE };

        const result = ordersReducer(state, action);

        expect(result).toStrictEqual(expected);
    });

    test('should pass when wsError', () => {
        const action = { type: wsError, payload: 'Error' };
        const state = { ...initialState, error: '' };
        const expected = { ...initialState, error: 'Error' };

        const result = ordersReducer(state, action);

        expect(result).toStrictEqual(expected);
    });

    test('should pass when wsMessage', () => {
        const orders = [
            {
                _id: '65e376ba97ede0001d05f445',
                ingredients: ['643d69a5c3f7b9001cfa0943', '643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093c'],
                status: 'done',
                name: 'Краторный space люминесцентный бургер',
                createdAt: '2024-03-02T18:58:02.879Z',
                updatedAt: '2024-03-02T18:58:03.280Z',
                number: 35628,
            },
            {
                _id: '65e376ac97ede0001d05f442',
                ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0943', '643d69a5c3f7b9001cfa093c'],
                status: 'done',
                name: 'Краторный space бургер',
                createdAt: '2024-03-02T18:57:48.046Z',
                updatedAt: '2024-03-02T18:57:48.492Z',
                number: 35627,
            },
        ];
        const action = { type: wsMessage, payload: orders };
        const state = { ...initialState, orders: [] };
        const expected = { ...initialState, orders: orders };

        const result = ordersReducer(state, action);

        expect(result).toStrictEqual(expected);
    });
});
