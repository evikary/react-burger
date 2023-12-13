import { IIngredient } from '../../utils/types';
import { v4 as uuidv4 } from 'uuid';

export const ADD_INGREDIENT = 'CONSTRUCTOR/ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'CONSTRUCTOR/REMOVE_INGREDIENT';

export const SEND_IINGREDIENTS_REQUEST = 'CONSTRUCTOR/SEND_IINGREDIENTS_REQUEST';
export const SEND_IINGREDIENTS_SUCCESS = 'CONSTRUCTOR/SEND_IINGREDIENTS_SUCCESS';
export const SEND_IINGREDIENTS_FAILED = 'CONSTRUCTOR/SEND_IINGREDIENTS_FAILED';

export const removeIngredient = (ingredient: IIngredient) => ({
    type: REMOVE_INGREDIENT,
    payload: ingredient,
});

export const addIngredient = (ingredient: IIngredient) => ({
    type: ADD_INGREDIENT,
    payload: { ...ingredient, key: uuidv4() },
});
