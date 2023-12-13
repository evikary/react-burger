import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients/reducer';
import { constructorReducer } from './constructor-ingredients/reducer';
import { modalIngredientReducer } from './modal-burger/reducer';
import { modalOrderReducer } from './modal-order/reducer';

export const rootReducer = combineReducers({
    ingredientsConstructor: constructorReducer,
    burgerIngredients: ingredientsReducer,
    orderModal: modalOrderReducer,
    ingredientModal: modalIngredientReducer,
});