import { IIngredient } from '../../utils/types';
import { getIngredientsApi } from '../api';
import { StoreDispatch, StoreThunk } from '../store';

export const GET_INGREDIENTS_REQUEST: 'INGREDIENTS/GET_ITEMS_REQUEST' = 'INGREDIENTS/GET_ITEMS_REQUEST';
export const GET_IINGREDIENTS_SUCCESS: 'INGREDIENTS/GET_ITEMS_SUCCESS' = 'INGREDIENTS/GET_ITEMS_SUCCESS';
export const GET_IINGREDIENTS_FAILED: 'INGREDIENTS/GET_ITEMS_FAILED' = 'INGREDIENTS/GET_ITEMS_FAILED';

export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_IINGREDIENTS_SUCCESS;
    readonly payload: IIngredient[];
}

export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_IINGREDIENTS_FAILED;
}

export type TBurgerIngredientsActions = IGetIngredientsRequestAction | IGetIngredientsSuccessAction | IGetIngredientsFailedAction;

export const getIngredients = (): StoreThunk => (dispatch: StoreDispatch) => {
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
