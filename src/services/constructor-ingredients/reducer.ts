import { IConstructor, IConstructorAction } from '../../utils/types';
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from './actions';

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
        default:
            return state;
    }
}
