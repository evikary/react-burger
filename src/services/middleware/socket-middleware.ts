import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { RootState } from '../store';
import { checkAuth } from '../user/action';

export type TWSActionsTypes = {
    wsConnect: ActionCreatorWithPayload<string>;
    wsDisconnect: ActionCreatorWithoutPayload;
    wsSendMessage?: ActionCreatorWithPayload<any>;
    wsConnecting: ActionCreatorWithoutPayload;
    onOpen: ActionCreatorWithoutPayload;
    onClose: ActionCreatorWithoutPayload;
    onError: ActionCreatorWithPayload<string>;
    onMessage: ActionCreatorWithPayload<any>;
};

export const socketMiddleware = (wsActions: TWSActionsTypes): Middleware<{}, RootState> => {
    return (store: MiddlewareAPI<Dispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return (next) => (action) => {
            const { dispatch } = store;
            const { wsConnect, wsDisconnect, wsConnecting, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

            if (wsConnect.match(action)) {
                socket = new WebSocket(action.payload);
                dispatch(wsConnecting());
            }

            if (socket) {
                socket.onopen = (event) => {
                    dispatch(onOpen());
                };

                socket.onerror = (event) => {
                    dispatch(onError('Error'));
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    if (parsedData.message === 'Invalid or missing token') {
                        console.log('Invalid or missing token');
                        dispatch(checkAuth() as unknown as AnyAction);
                    } else {
                        dispatch(onMessage(parsedData));
                    }
                };

                socket.onclose = (event) => {
                    dispatch(onClose());
                };

                if (wsSendMessage && wsSendMessage.match(action)) {
                    socket.send(JSON.stringify(action.payload));
                }

                if (wsDisconnect.match(action)) {
                    socket.close();
                    socket = null;
                }
            }

            next(action);
        };
    };
};
