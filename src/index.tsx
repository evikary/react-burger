import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app-component/app-component';
import { Provider } from 'react-redux';
import { store } from './services/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);
