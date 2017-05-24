import React from 'react';
import { connect } from 'react-redux';

import openWeatherAction from '../store/openWeatherAction';
import { fetchOW5 } from '../store/openWeatherAction';

class FC5Days extends React.Component {

    render() {
        let weathers = this.props.weathers;

        if(weathers) {

            return (

                <div>
                    <h2>5-Day 3-Hourly Weather Forecast</h2>

                    <table className="table">
                        <thead>
                            <tr>
                                <td><b>Date</b></td>
                                <td><b>Time</b></td>
                                <td><b>Forecast</b></td>
                            </tr>
                        </thead>
                        <tbody>
                            { weathers.map((weather, index) => {
                                let dateTime = weather.dt_txt.split(' ');
                                return (
                                    <tr key={index}>
                                        <td>{dateTime[0]}</td>
                                        <td>{dateTime[1]}</td>
                                        <td>{weather.weather[0].description}</td>
                                    </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                    <hr/>

                </div>

            
            );

        } else {
            return (
                <h3>Loading forecast data..</h3>
            );
        }
    }

    componentDidMount() {
        this.props.fetchOW5(this.props.city);
    }

}

const mapStateToProps = (state) => {
    return ({
        city: state.openWeatherReducer.city,
        weathers: state.openWeatherReducer.owData5Days
    });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        fill5DaysForecast: (forecast) => dispatch(openWeatherAction.setOWFC5DaysData(forecast)),
        setCity: (city) => dispatch(openWeatherAction.setCity(city)),
        fetchOW5: (city) => dispatch(fetchOW5(city))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(FC5Days);

                