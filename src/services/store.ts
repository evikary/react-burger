import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { composeEnhancers } from '../utils/devtools';
import { rootReducer } from './rootReducer';

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);
