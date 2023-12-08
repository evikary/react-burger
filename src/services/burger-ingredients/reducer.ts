import { IIngredientsAction } from '../../utils/types';
import { GET_IINGREDIENTS_FAILED, GET_IINGREDIENTS_SUCCESS, GET_INGREDIENTS_REQUEST } from './actions';

const initialState = {
    load: false,
    fail: false,
    items: [],
};

export const ingredientsReducer = (state = initialState, action: IIngredientsAction) => {
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
