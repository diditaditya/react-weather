import Axios from 'axios';

import { SET_WEATHERCHECK_LOCATIONS, SET_WEATHERCHECK_WEATHER } from './constants';

export const fetchLocation = (response) => {
    return {
        type: SET_WEATHERCHECK_LOCATIONS,
        payload: response
    }
}

export const fetchWeather = (response) => {
    return {
        type: SET_WEATHERCHECK_WEATHER,
        payload: response
    }
}

export const checkWeather = (coord) => {
    console.log('in checkweather');
    let lat = coord.lat;
    let lon = coord.lng;
    console.log(lat);
    console.log(lon);
    let url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&mode=json&units=metric&APPID=8b8926b398fdba5ce76701d649c783f8`
    return dispatch => {
        return Axios.get(url)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export const searchPlace = (placeName) => {
    console.log('in searchPlace');
    let place = placeName.replace(' ', '%20');
    let url = `http://maps.googleapis.com/maps/api/geocode/json?address=${place}`
    return dispatch => {
        return Axios.get(url)
        .then((response) => {
            console.log(response.data);
            let data = {
                name: response.data.results[0].formatted_address,
                coordinate: response.data.results[0].geometry.location
            }
            // dispatch(fetchLocation(data));
            dispatch(checkWeather(data.coordinate));
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

