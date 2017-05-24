import React from 'react';
import { Route } from 'react-router-dom';
import FC5Days from './Forecast5Days';
import FC16Days from './Forecast16Days';

class WeatherList extends React.Component {

    render() {

        return (
                <div className="container">
                    <Route exact path="/" component={FC5Days} />
                    <Route path="/daily" component={FC16Days} />
                </div>
            );

    }
    
}

export default WeatherList;