import { Dispatch } from 'redux';
import { sendLinkIngredients } from '../../utils/ constants';
import { IBodyPost } from '../../utils/types';

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
        fetch(sendLinkIngredients, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Произошла ошибка по адресу ${sendLinkIngredients}, статус ошибки ${res}`);
                }

                return res.json();
            })
            .then((json) => {
                dispatch(openModalOrder(json.order.number));
            })
            .catch((error) => {
                dispatch({
                    type: MODAL_ORDER_FAILED,
                });
            });
    };
}
