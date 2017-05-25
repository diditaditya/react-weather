import Axios from 'axios';

import store from './configureStore';
import { SET_WEATHERCHECK_LOCATIONS, 
    SET_WEATHERCHECK_WEATHER, 
    ADD_CHECKED_WEATHERS, 
    SAVE_WEATHER, 
    FILL_SAVED_WEATHERS, 
    CLEAR_CHECKED_WEATHERS,
    DELETE_CHECKED_WEATHER, 
    DELETE_SAVED_WEATHER, 
    DELETE_SAVED_WEATHER_SUCCESS,
    DELETE_WEATHER_IN_DETAIL,
    DELETE_WEATHER_IN_DETAIL_SUCCESS } from './constants';

export const setLocation = (response) => {
    return {
        type: SET_WEATHERCHECK_LOCATIONS,
        payload: response
    }
}

export const setWeather = (response) => {
    return {
        type: SET_WEATHERCHECK_WEATHER,
        payload: response
    }
}

export const fillSavedWeathers = (data) => {
    console.log('filling saved weathers');
    console.log(data);
    return {
            type: FILL_SAVED_WEATHERS,
            payload: data
        }
}

export const deleteSavedWeatherSuccess = (id) => {
    console.log('in savedweathersuccess action');
    let savedWeathers = (store.getState()).weatherCheckReducer.savedWeathers;
    let indexToBeDeleted;
    savedWeathers.map((weather, index) => {
        if(weather.id === id) {
            indexToBeDeleted = index
        }
    });
    console.log('index: ', indexToBeDeleted);
    return {
        type: DELETE_SAVED_WEATHER_SUCCESS,
        payload: indexToBeDeleted
    }
}

export const addCheckedWeathers = (data) => {
    console.log('in addCheckedWeather action');
    return {
        type: ADD_CHECKED_WEATHERS,
        payload: data
    }
}

export const clearCheckedWeathers = () => {
    console.log('in addCheckedWeather action');
    return {
        type: CLEAR_CHECKED_WEATHERS,
    }
}

export const deleteCheckedWeather = (index) => {
    return {
        type: DELETE_CHECKED_WEATHER,
        payload: index
    }
}

export const setSaveWeathers = (data) => {
    return {
        type: SAVE_WEATHER,
        payload: data
    }
}

export const deleteWeatherInDetailSuccess = (data) => {
    console.log('in deleteWeatherInDetailSuccess')
    let savedWeathers = (store.getState()).weatherCheckReducer.savedWeathers;
    let indexToBeUpdated;
    savedWeathers.map((weather, index) => {
        if(Number(weather.id) === Number(data.id)) {
            indexToBeUpdated = index
        }
    });
    console.log('indexToBeUpdated: ', indexToBeUpdated);
    console.log('original savedWeathers: ', savedWeathers[indexToBeUpdated]);
    savedWeathers[indexToBeUpdated].weathers.splice(data.index, 1);
    console.log('updated savedWeathers: ', savedWeathers[indexToBeUpdated]);
    return {
        type: DELETE_WEATHER_IN_DETAIL_SUCCESS,
        payload: savedWeathers
    }
}

export const saveWeathers = (data) => {
    console.log('in saveweather action');
    console.log(data);
    let port = 4000;
    let url = `http://localhost:${port}/savedWeathers`;
    return dispatch => {
        return Axios.post(url, data)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
}

export const fetchSavedWeathers = () => {
    let port = 4000;
    let url = `http://localhost:${port}/savedWeathers`;
    console.log('in fetchsavedweathers')
    Axios.get(url)
            .then((response) => {
                console.log(response.data);
                store.dispatch(fillSavedWeathers(response.data));
            })
            .catch((err) => {
                console.log(err);
            });
    
}

export const deleteSavedWeather = (id) => {
    console.log('in deletesavedweather');
    let port = 4000;
    let url = `http://localhost:${port}/savedWeathers/${id}`;
    Axios.delete(url)
            .then((response) => {
                store.dispatch(deleteSavedWeatherSuccess(id))
            })
            .catch((err) => {
                console.log(err);
            });
}

export const deleteWeatherInDetail = (data) => {
    console.log('in deleteWeatherInDetail action');
    let port = 4000;
    let url = `http://localhost:${port}/savedWeathers/${data.id}`;
    Axios.get(url)
            .then((response) => {
                console.log('in deleteWeatherInDetail first axios')
                console.log(response.data);
                response.data.weathers.splice(data.index, 1);
                let newData = {
                    createdAt: response.data.createdAt,
                    id: response.data.id,
                    title: response.data.title,
                    weathers: response.data.weathers
                };
                Axios.put(url, newData)
                        .then((response) => {
                            console.log('in deleteWeatherInDetail second axios')
                            store.dispatch(deleteWeatherInDetailSuccess(data));
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                
            })
            .catch((err) => {
                console.log(err);
            });
}





export const fetchWeather = (data) => {
    console.log('in fetchweather');
    let lat = data.coordinate.lat;
    let lon = data.coordinate.lng;
    // let urlHourly = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&mode=json&units=metric&APPID=8b8926b398fdba5ce76701d649c783f8`
    let urlDaily = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=16&mode=json&units=metric&APPID=8b8926b398fdba5ce76701d649c783f8`;
    return dispatch => {
        return Axios.get(urlDaily)
            .then((response) => {
                // data.weathers = response.data.list;
                let index = Math.round((new Date(data.date) - new Date())/(60*60*24*1000));
                data.weather = response.data.list[index];
                dispatch(addCheckedWeathers(data))
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export const searchPlace = (placeTime) => {
    console.log('in searchPlace');
    let place = placeTime.place.replace(' ', '%20');
    let url = `http://maps.googleapis.com/maps/api/geocode/json?address=${place}`
    return dispatch => {
        return Axios.get(url)
        .then((response) => {
            // console.log(response.data);
            let data = {
                name: placeTime.place,
                date: placeTime.date,
                time: placeTime.time,
                address: response.data.results[0].formatted_address,
                coordinate: response.data.results[0].geometry.location
            }
            // dispatch(setLocation(data));
            dispatch(fetchWeather(data));
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

