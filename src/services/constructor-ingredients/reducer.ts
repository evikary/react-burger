import { IIngredient } from '../../utils/types';
import { TStoreActions } from '../store';
import { CONSTRUCTOR_ADD_INGREDIENT, CONSTRUCTOR_REORDER, CONSTRUCTOR_REMOVE_INGREDIENT, CONSTRUCTOR_RESET_INGREDIENTS } from './actions';

type TConstructorState = {
    bun: IIngredient | null;
    toppings: ReadonlyArray<IIngredient>;
};

export const initialState: TConstructorState = {
    bun: null,
    toppings: [],
};

export function constructorReducer(state = initialState, action: TStoreActions): TConstructorState {
    const { type } = action;
    switch (type) {
        case CONSTRUCTOR_ADD_INGREDIENT:
            if (action.payload.type === 'bun') {
                return { ...state, bun: action.payload };
            } else {
                return { ...state, toppings: [...state.toppings, action.payload] };
            }
        case CONSTRUCTOR_REMOVE_INGREDIENT:
            return { ...state, toppings: state.toppings.filter((item) => item.key !== action.payload.key) };
        case CONSTRUCTOR_RESET_INGREDIENTS:
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
