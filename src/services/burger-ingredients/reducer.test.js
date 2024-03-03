import { GET_INGREDIENTS_REQUEST, GET_IINGREDIENTS_FAILED, GET_IINGREDIENTS_SUCCESS } from './actions';
import { initialState, ingredientsReducer } from './reducer';

describe('Ingredients reducer', () => {
    test('should return initial state', () => {
        const expectedState = initialState;
        const result = ingredientsReducer(undefined, {});

        expect(result).toStrictEqual(expectedState);
    });

    test('should pass load ingredients started', () => {
        const action = { type: GET_INGREDIENTS_REQUEST };
        const state = { ...initialState, load: false, fail: true };
        const expectedState = { ...initialState, load: true, fail: false };
        const result = ingredientsReducer(state, action);

        expect(result).toStrictEqual(expectedState);
    });

    test('should pass load ingredients success', () => {
        const action = { type: GET_IINGREDIENTS_SUCCESS, payload: [] };
        const expectedState = { ...initialState, load: false, fail: false, items: action.payload };
        const result = ingredientsReducer(undefined, action);

        expect(result).toStrictEqual(expectedState);
    });

    test('should pass load ingredients failed', () => {
        const action = { type: GET_IINGREDIENTS_FAILED };
        const state = { ...initialState, load: true, fail: false };
        const expectedState = { ...initialState, load: false, fail: true };
        const result = ingredientsReducer(state, action);

        expect(result).toStrictEqual(expectedState);
    });
});
