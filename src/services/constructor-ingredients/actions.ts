import { IIngredient } from '../../utils/types';
import { v4 as uuidv4 } from 'uuid';

export const CONSTRUCTOR_ADD_INGREDIENT: 'CONSTRUCTOR/ADD_INGREDIENT' = 'CONSTRUCTOR/ADD_INGREDIENT';
export const CONSTRUCTOR_REMOVE_INGREDIENT: 'CONSTRUCTOR/REMOVE_INGREDIENT' = 'CONSTRUCTOR/REMOVE_INGREDIENT';
export const CONSTRUCTOR_RESET_INGREDIENTS: 'CONSTRUCTOR/RESET_INGREDIENTS' = 'CONSTRUCTOR/RESET_INGREDIENTS';
export const CONSTRUCTOR_REORDER: 'CONSTRUCTOR/REORDER' = 'CONSTRUCTOR/REORDER';

export interface IRemoveIngredientAction {
    readonly type: typeof CONSTRUCTOR_REMOVE_INGREDIENT;
    readonly payload: IIngredient;
}

export interface IAddIngredientAction {
    readonly type: typeof CONSTRUCTOR_ADD_INGREDIENT;
    readonly payload: IIngredient;
}

export interface IResetIngredientsAction {
    readonly type: typeof CONSTRUCTOR_RESET_INGREDIENTS;
}

export interface IAddMoveAction {
    readonly type: typeof CONSTRUCTOR_REORDER;
    readonly from: number;
    readonly to: number;
}

export type TConstructorIngredientsActions = IRemoveIngredientAction | IAddIngredientAction | IResetIngredientsAction | IAddMoveAction;

export const removeIngredient = (ingredient: IIngredient): IRemoveIngredientAction => ({
    type: CONSTRUCTOR_REMOVE_INGREDIENT,
    payload: ingredient,
});

export const addIngredient = (ingredient: IIngredient): IAddIngredientAction => ({
    type: CONSTRUCTOR_ADD_INGREDIENT,
    payload: { ...ingredient, key: uuidv4() },
});

export const resetIngredients = (): IResetIngredientsAction => ({
    type: CONSTRUCTOR_RESET_INGREDIENTS,
});

export const addMove = (dragIndex: number, hoverIndex: number): IAddMoveAction => ({
    type: CONSTRUCTOR_REORDER,
    from: dragIndex,
    to: hoverIndex,
});
