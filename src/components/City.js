import React from 'react';
import { connect } from 'react-redux';

import Map from './Map';

const style = {
    cityTitle: {
        fontSize: '4em',
        fontWeight: 'bold',
        color: 'black'
    }
}

class City extends React.Component {

    render() {
        let city = this.props.cityData;
        if(city.name) {
            return (
                <div className="container">
                    <div className="row" >
                        <div className="col-md-4 col-xs-4">
                            <h1 style={style.cityTitle} > {city.name} </h1>
                            <p> lat: {city.coord.lat}, lon: {city.coord.lon} </p>
                        </div>
                        <div className="col-md-4 col-xs-4" ></div>
                        <div className="col-md-4 col-xs-4" >
                            <Map height='250px' width='250px' />
                        </div>
                    </div>
                    <hr/>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <h3>Loading city data..</h3>                
                </div>
            );
        }
    }

}

const mapStateToProps = (state) => {
    return ({
        cityData: state.openWeatherReducer.cityData
    });
}

export default connect(mapStateToProps, null)(City);