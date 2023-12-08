import { IModalAction } from '../../utils/types';
import { CLOSE_MODAL, OPEN_MODAL } from './action';

const initialState = {
    num: null,
};

export function modalOrderReducer(state = initialState, action: IModalAction) {
    const { type, payload } = action;
    switch (type) {
        case OPEN_MODAL:
            return {
                ...state,
                num: payload,
            };
        case CLOSE_MODAL:
            return initialState;
        default:
            return state;
    }
}
