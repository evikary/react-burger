import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Middleware } from 'redux';

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

export const socketMiddleware = (wsActions: TWSActionsTypes) => {
    return ((store) => {
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
                    dispatch(onMessage(parsedData));
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
    }) as Middleware;
};
