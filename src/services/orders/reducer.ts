import { createReducer } from '@reduxjs/toolkit';
import { IFeedOrders, WebSocketStatus } from '../../utils/types';
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from './actions';

type TOrderState = {
    status: WebSocketStatus;
    orders: IFeedOrders;
    error: string;
};

export const initialState: TOrderState = {
    status: WebSocketStatus.OFFLINE,
    orders: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
    },
    error: '',
};

export const ordersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsConnecting, (state) => {
            state.status = WebSocketStatus.CONNECTING;
        })
        .addCase(wsOpen, (state) => {
            state.status = WebSocketStatus.ONLINE;
            state.error = '';
        })
        .addCase(wsClose, (state) => {
            state.status = WebSocketStatus.OFFLINE;
        })
        .addCase(wsError, (state, action) => {
            state.error = action.payload;
        })
        .addCase(wsMessage, (state, action) => {
            state.orders = action.payload;
        });
});
