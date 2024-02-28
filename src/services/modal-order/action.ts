import { ThunkAction } from 'redux-thunk';
import { IBodyPost, IOrderApi } from '../../utils/types';
import { createOrder, getOrderApi } from '../api';
import { resetIngredients } from '../constructor-ingredients/actions';
import { RootState, StoreDispatch, StoreThunk, TStoreActions } from '../store';

export const CREATED_ORDER: 'ORDER/CREATED_ORDER' = 'ORDER/CREATED_ORDER';
export const OPEN_MODAL_ORDER: 'ORDER/OPEN_MODAL' = 'ORDER/OPEN_MODAL';
export const CLOSE_MODAL_ORDER: 'ORDER/CLOSE_MODAL' = 'ORDER/CLOSE_MODAL';
export const MODAL_ORDER_FAILED: 'ORDER/MODAL_FAILED' = 'ORDER/MODAL_FAILED';

export const GET_ORDER_REQUEST: 'ORDER/GET_ORDER_REQUEST' = 'ORDER/GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'ORDER/GET_ORDER_SUCCESS' = 'ORDER/GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'ORDER/GET_ORDER_FAILED' = 'ORDER/GET_ORDER_FAILED';

export interface ICreatedOrderAction {
    readonly type: typeof CREATED_ORDER;
}

export interface IOpenModalOrderAction {
    readonly type: typeof OPEN_MODAL_ORDER;
    readonly payload: number;
}

export interface ICloseModalOrderAction {
    readonly type: typeof CLOSE_MODAL_ORDER;
}

export interface IModalOrderFailedAction {
    readonly type: typeof MODAL_ORDER_FAILED;
}

export interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly payload: IOrderApi;
}

export interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
}

export type TModalOrderActions =
    | ICreatedOrderAction
    | IOpenModalOrderAction
    | ICloseModalOrderAction
    | IModalOrderFailedAction
    | IGetOrderRequestAction
    | IGetOrderSuccessAction
    | IGetOrderFailedAction;

export const createdOrder = (): ICreatedOrderAction => ({
    type: CREATED_ORDER,
});

export const openModalOrder = (order: number): IOpenModalOrderAction => ({
    type: OPEN_MODAL_ORDER,
    payload: order,
});

export const closeModalOrder = (): ICloseModalOrderAction => ({
    type: CLOSE_MODAL_ORDER,
});

export const sendIngredients =
    (data: IBodyPost): ThunkAction<void, RootState, unknown, TStoreActions> =>
    (dispatch: StoreDispatch) => {
        dispatch(createdOrder());
        createOrder(data)
            .then((json) => {
                dispatch(openModalOrder(json.order.number));
                dispatch(resetIngredients());
            })
            .catch((error) => {
                dispatch({
                    type: MODAL_ORDER_FAILED,
                });
            });
    };

export const getAllOrderApi =
    (numberOrder: string): ThunkAction<void, RootState, unknown, TStoreActions> =>
    (dispatch: StoreDispatch) => {
        dispatch({
            type: GET_ORDER_REQUEST,
        });
        getOrderApi(numberOrder)
            .then((json) => {
                dispatch({ type: GET_ORDER_SUCCESS, payload: json });
            })
            .catch((error) => {
                dispatch({ type: GET_ORDER_FAILED });
            });
    };
