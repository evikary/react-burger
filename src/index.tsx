import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app-component/app-component';
import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { Provider } from 'react-redux';
import { rootReducer } from './services/rootReducer';
import { composeEnhancers } from './utils/devtools';

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);
