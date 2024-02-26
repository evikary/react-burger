import { TStoreActions } from '../store';
import { CREATED_ORDER, CLOSE_MODAL_ORDER, MODAL_ORDER_FAILED, OPEN_MODAL_ORDER } from './action';

type TModalOrderState = {
    num: number | null;
    isCreatedOrder: boolean;
};

const initialState: TModalOrderState = {
    num: null,
    isCreatedOrder: false,
};

export function modalOrderReducer(state = initialState, action: TStoreActions): TModalOrderState {
    const { type } = action;
    switch (type) {
        case CREATED_ORDER:
            return {
                ...state,
                isCreatedOrder: true,
            };
        case OPEN_MODAL_ORDER:
            return {
                ...state,
                num: action.payload,
            };
        case CLOSE_MODAL_ORDER:
            return {
                ...state,
                num: null,
                isCreatedOrder: false,
            };
        case MODAL_ORDER_FAILED:
            return initialState;
        default:
            return state;
    }
}
