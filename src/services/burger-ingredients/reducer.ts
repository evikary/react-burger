import { IIngredient } from '../../utils/types';
import { TStoreActions } from '../store';
import { GET_IINGREDIENTS_FAILED, GET_IINGREDIENTS_SUCCESS, GET_INGREDIENTS_REQUEST } from './actions';

type TIngredientsState = {
    load: boolean;
    fail: boolean;
    items: ReadonlyArray<IIngredient>;
};

const initialState: TIngredientsState = {
    load: false,
    fail: false,
    items: [],
};

export const ingredientsReducer = (state = initialState, action: TStoreActions): TIngredientsState => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                load: true,
                fail: false,
            };
        }
        case GET_IINGREDIENTS_SUCCESS: {
            return {
                ...state,
                items: action.payload,
                load: false,
                fail: false,
            };
        }
        case GET_IINGREDIENTS_FAILED: {
            return {
                ...state,
                load: false,
                fail: true,
            };
        }
        default: {
            return state;
        }
    }
};
