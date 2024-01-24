import { IConstructor, IConstructorAction } from '../../utils/types';
import { ADD_INGREDIENT, CONSTRUCTOR_REORDER, REMOVE_INGREDIENT, RESET_INGREDIENTS } from './actions';

const initialState: IConstructor = {
    bun: null,
    toppings: [],
};

export function constructorReducer(state = initialState, action: IConstructorAction) {
    const { type, payload } = action;
    switch (type) {
        case ADD_INGREDIENT:
            if (payload.type === 'bun') {
                return { ...state, bun: payload };
            } else {
                return { ...state, toppings: [...state.toppings, payload] };
            }
        case REMOVE_INGREDIENT:
            return { ...state, toppings: state.toppings.filter((item) => item.key !== payload.key) };
        case RESET_INGREDIENTS:
            return { ...initialState };
        case CONSTRUCTOR_REORDER:
            const { from, to } = action;
            const tmp = state.toppings[to];
            const arr = [...state.toppings];
            arr[to] = arr[from];
            arr[from] = tmp;
            return {
                ...state,
                toppings: arr,
            };
        default:
            return state;
    }
}
