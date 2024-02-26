import { IBodyPost } from '../../utils/types';
import { createOrder } from '../api';
import { resetIngredients } from '../constructor-ingredients/actions';
import { StoreDispatch, StoreThunk } from '../store';

export const CREATED_ORDER: 'ORDER/CREATED_ORDER' = 'ORDER/CREATED_ORDER';
export const OPEN_MODAL_ORDER: 'ORDER/OPEN_MODAL' = 'ORDER/OPEN_MODAL';
export const CLOSE_MODAL_ORDER: 'ORDER/CLOSE_MODAL' = 'ORDER/CLOSE_MODAL';
export const MODAL_ORDER_FAILED: 'ORDER/MODAL_FAILED' = 'ORDER/MODAL_FAILED';

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

export type TModalOrderActions = ICreatedOrderAction | IOpenModalOrderAction | ICloseModalOrderAction | IModalOrderFailedAction;

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

export const sendIngredients: StoreThunk = (data: IBodyPost) => (dispatch) => {
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
