import { IIngredient } from '../../utils/types';
import { TStoreActions } from '../store';
import { CLOSE_MODAL_INGREDIENTS, OPEN_MODAL_INGREDIENTS } from './action';

type TModalBurgerState = {
    ingredientItem: IIngredient | null;
};

export const initialState: TModalBurgerState = {
    ingredientItem: null,
};

export function modalIngredientReducer(state = initialState, action: TStoreActions): TModalBurgerState {
    const { type } = action;
    switch (type) {
        case OPEN_MODAL_INGREDIENTS:
            return {
                ...state,
                ingredientItem: action.payload,
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
