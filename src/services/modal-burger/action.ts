import { IIngredient } from '../../utils/types';

export const OPEN_MODAL_INGREDIENTS = 'INGREDIENTS/OPEN_MODAL';
export const CLOSE_MODAL_INGREDIENTS = 'INGREDIENTS/CLOSE_MODAL';

export const openModalIngredients = (item: IIngredient) => {
    return {
        type: OPEN_MODAL_INGREDIENTS,
        payload: item,
    };
};

export const closeModalIngredients = () => {
    return {
        type: CLOSE_MODAL_INGREDIENTS,
    };
};
