import { RootState } from '../store';

export const getOrderModal = (store: RootState) => store.orderModal.num;
