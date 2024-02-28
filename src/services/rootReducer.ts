import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients/reducer';
import { constructorReducer } from './constructor-ingredients/reducer';
import { modalIngredientReducer } from './modal-burger/reducer';
import { modalOrderReducer } from './modal-order/reducer';
import { ordersReducer } from './orders/reducer';
import { profileOrdersReducer } from './profile-orders/reducer';
import { userReducer } from './user/reducer';

export const rootReducer = combineReducers({
    ingredientsConstructor: constructorReducer,
    burgerIngredients: ingredientsReducer,
    orderModal: modalOrderReducer,
    ingredientModal: modalIngredientReducer,
    auth: userReducer,
    feed: ordersReducer,
    profile: profileOrdersReducer,
});
