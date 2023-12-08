import { IIngredient } from '../../utils/types';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export const SEND_IINGREDIENTS_REQUEST = 'SEND_IINGREDIENTS_REQUEST';
export const SEND_IINGREDIENTS_SUCCESS = 'SEND_IINGREDIENTS_SUCCESS';
export const SEND_IINGREDIENTS_FAILED = 'SEND_IINGREDIENTS_FAILED';

export const removeIngredient = (ingredient: IIngredient) => ({
    type: REMOVE_INGREDIENT,
    payload: ingredient,
});

export const addIngredient = (ingredient: IIngredient) => ({
    type: ADD_INGREDIENT,
    payload: ingredient,
});
