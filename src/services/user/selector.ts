import { IStore } from '../../utils/types';

export const selectUser = (store: IStore) => store.auth.user;
export const selectIsAuthChecked = (store: IStore) => store.auth.isAuthChecked;
