import { IIngredient } from '../../utils/types';

export const OPEN_MODAL_INGREDIENTS = 'OPEN_MODAL_INGREDIENTS';
export const CLOSE_MODAL_INGREDIENTS = 'CLOSE_MODAL_INGREDIENTS';

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
