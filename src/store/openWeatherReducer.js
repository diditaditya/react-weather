import { SET_OWFC5DAYS, SET_OWFC16DAYS, SET_CITY, SET_SEARCH_CITY, SET_FETCH_STATUS } from "./constants";


const initialState = {
    city: 'Jakarta',
    status: '',
    cityData: '',
    owData5Days: '',
    owData16Days: ''
};


const OpenWeatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_OWFC5DAYS:
            return {
                ...state,
                owData5Days: action.payload
            };
        case SET_OWFC16DAYS:
            return {
                ...state,
                owData16Days: action.payload
            }
        case SET_CITY:
            return {
                ...state,
                cityData: action.payload
            }
        case SET_SEARCH_CITY:
            return {
                ...state,
                city: action.payload
            }
        case SET_FETCH_STATUS:
            return {
                ...state,
                status: action.payload
            }
        default:
            return state;
    }
} ;



export default OpenWeatherReducer;