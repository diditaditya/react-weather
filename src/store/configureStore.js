import { createStore, combineReducers, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';

import openWeatherReducer from './openWeatherReducer';

const reducers = combineReducers({
    openWeatherReducer
});

const middlewares = applyMiddleware(thunk);

const store = createStore(reducers, middlewares);

export default store;