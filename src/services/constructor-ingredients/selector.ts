import { createSelector } from 'reselect';
import { IStore } from '../../utils/types';

export const allIngredients = (store: IStore) => store.ingredientsConstructor;

export const getIngredientsCounter = createSelector(allIngredients, ({ bun, toppings }) => {
    const counter: Record<string, number> = {};

    toppings.forEach((item) => {
        if (!counter[item._id]) {
            counter[item._id] = 0;
        }
        counter[item._id]++;
    });
    if (bun) {
        counter[bun._id] = 2;
    }
    return counter;
});
