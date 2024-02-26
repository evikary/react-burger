import { ActionCreator, applyMiddleware, createStore } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
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

import {
    connect as profileConnect,
    disconnect as profileDisconnect,
    wsConnecting as profileWSConnecting,
    wsOpen as profileWSOpen,
    wsClose as profileWSClose,
    wsMessage as profileWSMessage,
    wsError as profileWSError,
    TProfileOrdersActions,
} from './profile-orders/actions';
import { socketMiddleware } from './middleware/socket-middleware';
import { configureStore } from '@reduxjs/toolkit';

export const feedMiddleware = socketMiddleware({
    wsConnect: feedConnect,
    wsDisconnect: feedDisconnect,
    wsConnecting: feedWSConnecting,
    onOpen: feedWSOpen,
    onClose: feedWSClose,
    onError: feedWSError,
    onMessage: feedWSMessage,
});

export const profileMiddleware = socketMiddleware({
    wsConnect: profileConnect,
    wsDisconnect: profileDisconnect,
    wsConnecting: profileWSConnecting,
    onOpen: profileWSOpen,
    onClose: profileWSClose,
    onError: profileWSError,
    onMessage: profileWSMessage,
});

const enhancer = composeEnhancers(applyMiddleware(feedMiddleware), applyMiddleware(profileMiddleware), applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);
// export const store = configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, feedMiddleware, profileMiddleware),
// });

// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;

export type TStoreActions =
    | TBurgerIngredientsActions
    | TConstructorIngredientsActions
    | TModalBurgerActions
    | TModalOrderActions
    | TUserActions
    | TOrdersActions
    | TProfileOrdersActions;

// export type StoreDispatch = ThunkDispatch<RootState, unknown, TStoreActions>;
export type StoreDispatch = typeof store.dispatch;

// export type StoreThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TStoreActions>;
export type StoreThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, RootState, unknown, TStoreActions>>;

export const useDispatch = () => dispatchHook<StoreDispatch | StoreThunk>();

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
