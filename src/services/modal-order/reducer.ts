import { TStoreActions } from '../store';
import { CLOSE_MODAL_ORDER, MODAL_ORDER_FAILED, OPEN_MODAL_ORDER } from './action';

type TModalOrderState = {
    num: number | null;
};

const initialState: TModalOrderState = {
    num: null,
};

export function modalOrderReducer(state = initialState, action: TStoreActions): TModalOrderState {
    const { type } = action;
    switch (type) {
        case OPEN_MODAL_ORDER:
            return {
                ...state,
                num: action.payload,
            };
        case CLOSE_MODAL_ORDER:
            return initialState;
        case MODAL_ORDER_FAILED:
            return initialState;
        default:
            return state;
    }
}
