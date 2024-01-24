import { Dispatch } from 'redux';
import { getIngredientsApi } from '../api';

export const GET_INGREDIENTS_REQUEST = 'INGREDIENTS/GET_ITEMS_REQUEST';
export const GET_IINGREDIENTS_SUCCESS = 'INGREDIENTS/GET_ITEMS_SUCCESS';
export const GET_IINGREDIENTS_FAILED = 'INGREDIENTS/GET_ITEMS_FAILED';

export function getIngredients() {
    return function (dispatch: Dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST,
        });
        getIngredientsApi()
            .then((json) => {
                dispatch({ type: GET_IINGREDIENTS_SUCCESS, payload: json.data });
            })
            .catch((error) => {
                dispatch({ type: GET_IINGREDIENTS_FAILED });
            });
    };
}
