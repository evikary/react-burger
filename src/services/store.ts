import { applyMiddleware, createStore } from 'redux';
import { thunk, ThunkAction, ThunkDispatch } from 'redux-thunk';
import { composeEnhancers } from '../utils/devtools';
import { TBurgerIngredientsActions } from './burger-ingredients/actions';
import { TConstructorIngredientsActions } from './constructor-ingredients/actions';
import { TModalBurgerActions } from './modal-burger/action';
import { TModalOrderActions } from './modal-order/action';
import { rootReducer } from './rootReducer';
import { TUserActions } from './user/action';
import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;

export type TStoreActions = TBurgerIngredientsActions | TConstructorIngredientsActions | TModalBurgerActions | TModalOrderActions | TUserActions;

export type StoreDispatch = ThunkDispatch<RootState, unknown, TStoreActions>;

export type StoreThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TStoreActions>;

export const useDispatch = () => dispatchHook<StoreDispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
