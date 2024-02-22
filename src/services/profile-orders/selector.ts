import { RootState } from '../store';

export const getProfileOrders = (store: RootState) => store.profile.orders;
