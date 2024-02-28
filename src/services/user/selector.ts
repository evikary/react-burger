import { RootState } from '../store';

export const selectUser = (store: RootState) => store.auth.user;
export const selectRegisterError = (store: RootState) => store.auth.registerUserError;
export const selectLoginError = (store: RootState) => store.auth.loginUserError;
export const selectIsAuthChecked = (store: RootState) => store.auth.isAuthChecked;
