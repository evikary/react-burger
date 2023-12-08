import { sendLinkIngredients } from '../../utils/ constants';
import { IBodyPost } from '../../utils/types';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (order: number) => ({
    type: OPEN_MODAL,
    payload: order,
});

export const closeModal = () => ({
    type: CLOSE_MODAL,
});

export function sendIngredients(data: IBodyPost) {
    return function (dispatch: any) {
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
                dispatch({
                    type: OPEN_MODAL,
                    payload: json.order.number,
                });
            })
            .catch((error) => {
                // dispatch({
                //     type: SEND_IINGREDIENTS_FAILED,
                // });
            });
    };
}
