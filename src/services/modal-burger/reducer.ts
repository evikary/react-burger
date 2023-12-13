import { IModalIngredientsAction } from '../../utils/types';
import { CLOSE_MODAL_INGREDIENTS, OPEN_MODAL_INGREDIENTS } from './action';

const initialState = {
    ingredientItem: null,
};

export function modalIngredientReducer(state = initialState, action: IModalIngredientsAction) {
    const { type, payload } = action;
    switch (type) {
        case OPEN_MODAL_INGREDIENTS:
            return {
                ...state,
                ingredientItem: payload,
            };
        case CLOSE_MODAL_INGREDIENTS:
            return {
                ...state,
                ingredientItem: null,
            };
        default:
            return state;
    }
}
