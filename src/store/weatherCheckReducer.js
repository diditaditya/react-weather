import { SET_WEATHERCHECK_LOCATIONS, SET_WEATHERCHECK_WEATHER, ADD_CHECKED_WEATHERS, SAVE_WEATHER, FILL_SAVED_WEATHERS, CLEAR_CHECKED_WEATHERS, DELETE_SAVED_WEATHER_SUCCESS } from './constants';

const initialState = {
    locations: [],
    weathers: [],
    checkedWeathers: [],
    savedWeathers: []
};

const WeatherCheckReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHECKED_WEATHERS:
            return {
                ...state,
                checkedWeathers: [...state.checkedWeathers, action.payload]
            }
        case CLEAR_CHECKED_WEATHERS:
            return {
                ...state,
                checkedWeathers: []
            }
        case SAVE_WEATHER:
            return {
                ...state,
                checkedWeathers: [],
                savedWeathers: [...state.savedWeathers, action.payload]
            }
        case DELETE_SAVED_WEATHER_SUCCESS:
            state.savedWeathers.splice(action.payload, 1);
            return {
                ...state, 
                savedWeathers: [...state.savedWeathers]
            }
        case SET_WEATHERCHECK_LOCATIONS:
            return {
                ...state,
                locations: [...state.locations, action.payload]
            }
        case SET_WEATHERCHECK_WEATHER:
            return {
                ...state,
                weathers: [...state.weathers, action.payload]
            }
        case FILL_SAVED_WEATHERS:
            return {
                ...state,
                savedWeathers: action.payload
            }
        default:
            return state;
    }
}

export default WeatherCheckReducer;