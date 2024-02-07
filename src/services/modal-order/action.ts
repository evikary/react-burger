import { IBodyPost } from '../../utils/types';
import { createOrder } from '../api';
import { resetIngredients } from '../constructor-ingredients/actions';
import { StoreDispatch, StoreThunk } from '../store';

export const OPEN_MODAL_ORDER: 'ORDER/OPEN_MODAL' = 'ORDER/OPEN_MODAL';
export const CLOSE_MODAL_ORDER: 'ORDER/CLOSE_MODAL' = 'ORDER/CLOSE_MODAL';
export const MODAL_ORDER_FAILED: 'ORDER/MODAL_FAILED' = 'ORDER/MODAL_FAILED';

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

export type TModalOrderActions = IOpenModalOrderAction | ICloseModalOrderAction | IModalOrderFailedAction;

export const openModalOrder = (order: number): IOpenModalOrderAction => ({
    type: OPEN_MODAL_ORDER,
    payload: order,
});

export const closeModalOrder = (): ICloseModalOrderAction => ({
    type: CLOSE_MODAL_ORDER,
});

export const sendIngredients =
    (data: IBodyPost): StoreThunk =>
    (dispatch: StoreDispatch) => {
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
