import { initialState, modalIngredientReducer } from './reducer';
import { CLOSE_MODAL_INGREDIENTS, OPEN_MODAL_INGREDIENTS } from './action';

describe('Modal-burger reducer', () => {
    test('should return initial state', () => {
        const expectedState = initialState;
        const result = modalIngredientReducer(undefined, {});

        expect(result).toStrictEqual(expectedState);
    });

    test('should open modal window', () => {
        const action = { type: OPEN_MODAL_INGREDIENTS, payload: null };
        const state = { ...initialState, ingredientItem: null };
        const result = modalIngredientReducer(state, action);

        const expectedState = { ...initialState, ingredientItem: action.payload };

        expect(result).toStrictEqual(expectedState);
    });

    test('should close modal window', () => {
        const action = { type: CLOSE_MODAL_INGREDIENTS, payload: [] };
        const state = { ...initialState, ingredientItem: action.payload };
        const result = modalIngredientReducer(state, action);

        const expectedState = { ...initialState, ingredientItem: null };

        expect(result).toStrictEqual(expectedState);
    });
});
