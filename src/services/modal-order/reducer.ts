import { IOrderApi } from '../../utils/types';
import { TStoreActions } from '../store';
import {
    CREATED_ORDER,
    CLOSE_MODAL_ORDER,
    MODAL_ORDER_FAILED,
    OPEN_MODAL_ORDER,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
} from './action';

type TModalOrderState = {
    currentOrder: IOrderApi | null;
    num: number | null;
    isCreatedOrder: boolean;
};

export const initialState: TModalOrderState = {
    currentOrder: null,
    num: null,
    isCreatedOrder: false,
};

export function modalOrderReducer(state = initialState, action: TStoreActions): TModalOrderState {
    const { type } = action;
    switch (type) {
        case GET_ORDER_REQUEST:
            return {
                ...state,
                isCreatedOrder: true,
            };
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                currentOrder: action.payload,
            };
        case GET_ORDER_FAILED:
            return {
                ...state,
                isCreatedOrder: false,
            };
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
