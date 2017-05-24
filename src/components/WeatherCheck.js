import React from 'react';
import { connect } from 'react-redux';

import { searchPlace } from '../store/openWeatherAction';

class WeatherCheck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            place: ''
        };
        this.style = {
            inputFormStyle: {
                borderRadius: 5,
                marginTop: '25px',
                marginRight: '50px'
            }
        };
        this.today = new Date();
        this.newDate = new Date();
        this.maxDate = new Date(this.newDate.setDate(this.newDate.getDate() + 16));
    }

    convertDate(oriDate) {
        let fullDate = new Date(oriDate);
        let year = fullDate.getFullYear();
        let month = String(fullDate.getMonth() + 1);
        if(month.length === 1) {
            month = '0' + month;
        }
        let date = String(fullDate.getDate());
        if(date.length === 1) {
            date = '0' + date;
        }
        return `${year}-${month}-${date}`;
    }

    onHandleChange(place) {
        this.setState({
            place: place
        });
    }

    render() {
        let minDate = this.convertDate(this.today);
        let maxDate = this.convertDate(this.maxDate);
        return (
            <div>
                <input value={this.state.place} onChange={ (e) => this.onHandleChange(e.target.value)} type="text" placeholder="City name" style={this.style.inputFormStyle} />
                <input type="date" min={minDate} max={maxDate}  style={this.style.inputFormStyle}/>
                <input type="time" style={this.style.inputFormStyle}/>
                <button onClick={ () => this.search() }  className="btn btn-danger">Check!</button>
            </div>
        );
    }

    componentDidMount() {
    }

    search() {
        this.props.search(this.state.place);

    }

}

const mapDispatchToProps = (dispatch) => {
    return ({
        search: (place) => dispatch(searchPlace(place))
    });
}

export default connect(null, mapDispatchToProps)(WeatherCheck);