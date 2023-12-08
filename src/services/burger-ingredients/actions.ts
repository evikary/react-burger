import { linkIngredients } from '../../utils/ constants';

export const GET_INGREDIENTS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_IINGREDIENTS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_IINGREDIENTS_FAILED = 'GET_ITEMS_FAILED';

export function getIngredients() {
    return function (dispatch: any) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST,
        });
        fetch(linkIngredients)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Произошла ошибка...');
                }

                return res.json();
            })
            .then((json) => {
                dispatch({
                    type: GET_IINGREDIENTS_SUCCESS,
                    payload: json.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: GET_IINGREDIENTS_FAILED,
                });
            });
    };
}
