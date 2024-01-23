import { IModalAction } from '../../utils/types';
import { CLOSE_MODAL_ORDER, MODAL_ORDER_FAILED, OPEN_MODAL_ORDER } from './action';

const initialState = {
    num: null,
};

export function modalOrderReducer(state = initialState, action: IModalAction) {
    const { type, payload } = action;
    switch (type) {
        case OPEN_MODAL_ORDER:
            return {
                ...state,
                num: payload,
            };
        case CLOSE_MODAL_ORDER:
            return initialState;
        case MODAL_ORDER_FAILED:
            return initialState;
        default:
            return state;
    }
}
