import { SET_WEATHERCHECK_LOCATIONS, SET_WEATHERCHECK_WEATHER } from './constants';

const initialState = {
    locations: [],
    weathers: []
};

const WeatherCheckReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WEATHERCHECK_LOCATIONS:
            let locations = state.locations;
            return {
                ...state,
                locations: [...locations, action.payload]
            }
        case SET_WEATHERCHECK_WEATHER:
            let weathers = state.weathers;
            return {
                ...state,
                weathers: [...weathers, action.payload]
            }
        default:
            return state;
    }
}

export default WeatherCheckReducer;