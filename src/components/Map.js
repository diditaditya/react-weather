import React from 'react';
import { connect } from 'react-redux';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: -6.2147,
            lng: 106.8451
        };
        this.mapStyle = {
            height: props.height,
            width: props.width
        }
    }

    setCoord(lat, lng) {
        this.setState({
            lat: Number(lat),
            lng: Number(lng)
        });
    }

    render() {        
        return (
            <div ref="map" className="container" style={this.mapStyle}>
                This should be the map..
            </div>
        );
    }


    componentDidMount() {

        let lat = this.state.lat;
        let lng = this.state.lng;
        this.map = new window.google.maps.Map(this.refs.map, {
            center: {lat: lat, lng: lng},
            zoom: 7,
            disableDefaultUI: true,
            draggable: false
        });
    }

    componentDidUpdate() {

        if(this.props.cityData.coord) {
            let newLat = this.props.cityData.coord.lat;
            let newLng = this.props.cityData.coord.lon;
            if(this.state.lat !== Number(newLat) && this.state.lng !== Number(newLng)) {
                this.setCoord(this.props.cityData.coord.lat, this.props.cityData.coord.lon);
                this.map.panTo({lat: newLat, lng: newLng})
            }
        }
        
    }

}

const mapStateToProps = (state) => {
    return ({
        cityData: state.openWeatherReducer.cityData
    });
}

export default  connect(mapStateToProps, null)(Map);