import { IConstructor, IIngredient } from '../utils/types';

export enum typeActions {
    ADD = 'ADD',
    REMOVE = 'REMOVE',
}

export interface IConstructorAction {
    type: typeActions;
    payload: IIngredient;
}

export function constructorReducer(state: IConstructor, action: IConstructorAction) {
    const { type, payload } = action;
    switch (type) {
        case typeActions.ADD:
            if (payload.type === 'bun') {
                return { ...state, bun: payload };
            } else {
                return { ...state, toppings: [...state.toppings, payload] };
            }
        case typeActions.REMOVE:
            return { ...state, toppings: state.toppings.filter((item) => item.key !== payload.key) };
        default:
            return state;
    }
}
