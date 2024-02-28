import { RootState } from '../store';

export const getFeedOrders = (store: RootState) => store.feed.orders;
