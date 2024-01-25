import { Dispatch } from 'redux';
import { IBodyPost } from '../../utils/types';
import { createOrder } from '../api';
import { resetIngredients } from '../constructor-ingredients/actions';

export const OPEN_MODAL_ORDER = 'ORDER/OPEN_MODAL';
export const CLOSE_MODAL_ORDER = 'ORDER/CLOSE_MODAL';
export const MODAL_ORDER_FAILED = 'ORDER/MODAL_FAILED';

export const openModalOrder = (order: number) => ({
    type: OPEN_MODAL_ORDER,
    payload: order,
});

export const closeModalOrder = () => ({
    type: CLOSE_MODAL_ORDER,
});

export function sendIngredients(data: IBodyPost) {
    return function (dispatch: Dispatch) {
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
}
