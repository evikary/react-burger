import { IIngredient } from '../../utils/types';

export const OPEN_MODAL_INGREDIENTS: 'INGREDIENTS/OPEN_MODAL' = 'INGREDIENTS/OPEN_MODAL';
export const CLOSE_MODAL_INGREDIENTS: 'INGREDIENTS/CLOSE_MODAL' = 'INGREDIENTS/CLOSE_MODAL';

export interface IOpenModalIngredientsAction {
    readonly type: typeof OPEN_MODAL_INGREDIENTS;
    readonly payload: IIngredient;
}

export interface ICloseModalIngredientsAction {
    readonly type: typeof CLOSE_MODAL_INGREDIENTS;
}

export type TModalBurgerActions = IOpenModalIngredientsAction | ICloseModalIngredientsAction;

export const openModalIngredients = (item: IIngredient): IOpenModalIngredientsAction => {
    return {
        type: OPEN_MODAL_INGREDIENTS,
        payload: item,
    };
};

export const closeModalIngredients = (): ICloseModalIngredientsAction => {
    return {
        type: CLOSE_MODAL_INGREDIENTS,
    };
};
