import { IStore } from '../../utils/types';

export const selectUser = (store: IStore) => store.auth.user;
export const selectRegisterError = (store: IStore) => store.auth.registerUserError;
export const selectLoginError = (store: IStore) => store.auth.loginUserError;
export const selectIsAuthChecked = (store: IStore) => store.auth.isAuthChecked;
