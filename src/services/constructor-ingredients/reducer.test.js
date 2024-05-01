import { initialState, constructorReducer } from './reducer';
import { CONSTRUCTOR_RESET_INGREDIENTS, CONSTRUCTOR_ADD_INGREDIENT, CONSTRUCTOR_REMOVE_INGREDIENT, CONSTRUCTOR_REORDER } from './actions';

const bun = {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0,
    key: '8b0c6cdb-a07d-4ea2-ba28-e559e7ed0b7b',
};

const ingredient1 = {
    _id: '643d69a5c3f7b9001cfa0945',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
    __v: 0,
    key: '3146280b-7041-4e61-83b2-3d1bbfe67545',
};

const ingredient2 = {
    _id: '643d69a5c3f7b9001cfa094a',
    name: 'Сыр с астероидной плесенью',
    type: 'main',
    proteins: 84,
    fat: 48,
    carbohydrates: 420,
    calories: 3377,
    price: 4142,
    image: 'https://code.s3.yandex.net/react/code/cheese.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
    __v: 0,
    key: '53691ce2-b100-45bb-bedc-a0ff7ffc1802',
};

describe('Constructor-ingredients reducer', () => {
    test('should return initial state', () => {
        const expectedState = initialState;
        const result = constructorReducer(undefined, {});

        expect(result).toStrictEqual(expectedState);
    });

    test('should reset constructor-ingredients', () => {
        const action = { type: CONSTRUCTOR_RESET_INGREDIENTS, payload: [] };
        const state = { ...initialState, bun: action.payload, toppings: action.payload };
        const result = constructorReducer(state, action);

        const expectedState = initialState;

        expect(result).toStrictEqual(expectedState);
    });

    test('should add bun in constructor-ingredients', () => {
        const action = { type: CONSTRUCTOR_ADD_INGREDIENT, payload: bun };
        const state = { ...initialState, bun: null, toppings: [] };
        const expected = { ...initialState, bun: bun, toppings: [] };

        const result = constructorReducer(state, action);

        expect(result).toStrictEqual(expected);
    });

    test('should add ingredient in constructor-ingredients', () => {
        const action = { type: CONSTRUCTOR_ADD_INGREDIENT, payload: ingredient1 };
        const state = { ...initialState, bun: bun, toppings: [] };
        const expected = { ...initialState, bun: bun, toppings: [ingredient1] };

        const result = constructorReducer(state, action);

        expect(result).toStrictEqual(expected);
    });

    test('should remove ingredient in constructor-ingredients', () => {
        const action = { type: CONSTRUCTOR_REMOVE_INGREDIENT, payload: ingredient2 };
        const state = { ...initialState, bun: bun, toppings: [ingredient1, ingredient2] };
        const expected = { ...initialState, bun: bun, toppings: [ingredient1] };

        const result = constructorReducer(state, action);

        expect(result).toStrictEqual(expected);
    });

    test('should reorder ingredients', () => {
        const action = { type: CONSTRUCTOR_REORDER, from: 1, to: 0 };
        const state = { ...initialState, bun: bun, toppings: [ingredient1, ingredient2] };
        const expected = { ...initialState, bun: bun, toppings: [ingredient2, ingredient1] };

        const result = constructorReducer(state, action);

        expect(result).toStrictEqual(expected);
    });
});
