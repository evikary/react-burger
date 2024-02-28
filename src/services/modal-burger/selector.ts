import { RootState } from '../store';

export const getIngredientModal = (store: RootState) => store.ingredientModal.ingredientItem;
