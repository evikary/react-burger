import { RootState } from '../store';

export const getOrderAll = (store: RootState) => store.orderModal;
export const getOrderModal = (store: RootState) => store.orderModal.num;
export const getOrderStatus = (store: RootState) => store.orderModal.isCreatedOrder;
export const getApiOrder = (store: RootState) => store.orderModal.currentOrder;
