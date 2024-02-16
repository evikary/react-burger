import { applyMiddleware, createStore, Middleware } from 'redux';
import { thunk, ThunkAction, ThunkDispatch } from 'redux-thunk';
import { composeEnhancers } from '../utils/devtools';
import { TBurgerIngredientsActions } from './burger-ingredients/actions';
import { TConstructorIngredientsActions } from './constructor-ingredients/actions';
import { TModalBurgerActions } from './modal-burger/action';
import { TModalOrderActions } from './modal-order/action';
import { rootReducer } from './rootReducer';
import { TUserActions } from './user/action';
import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';
import {
    connect as feedConnect,
    disconnect as feedDisconnect,
    wsConnecting as feedWSConnecting,
    wsOpen as feedWSOpen,
    wsClose as feedWSClose,
    wsMessage as feedWSMessage,
    wsError as feedWSError,
    TOrdersActions,
} from './orders/actions';
import { socketMiddleware } from './middleware/socket-middleware';

export const feedMiddleware = socketMiddleware({
    wsConnect: feedConnect,
    wsDisconnect: feedDisconnect,
    wsConnecting: feedWSConnecting,
    onOpen: feedWSOpen,
    onClose: feedWSClose,
    onError: feedWSError,
    onMessage: feedWSMessage,
});

const enhancer = composeEnhancers(applyMiddleware(thunk), applyMiddleware(feedMiddleware));

export const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;

export type TStoreActions =
    | TBurgerIngredientsActions
    | TConstructorIngredientsActions
    | TModalBurgerActions
    | TModalOrderActions
    | TUserActions
    | TOrdersActions;

export type StoreDispatch = ThunkDispatch<RootState, unknown, TStoreActions>;

export type StoreThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TStoreActions>;

export const useDispatch = () => dispatchHook<StoreDispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
