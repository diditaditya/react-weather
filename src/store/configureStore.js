import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import openWeatherReducer from './openWeatherReducer';
import weatherCheckReducer from './weatherCheckReducer';

const reducers = combineReducers({
    openWeatherReducer,
    weatherCheckReducer
});

const middlewares = applyMiddleware(logger, thunk);

const store = createStore(reducers, middlewares);

export default store;