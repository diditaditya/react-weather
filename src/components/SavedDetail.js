import React from 'react';
import { connect } from 'react-redux';

import { searchPlaceInDetail, deleteWeatherInDetail } from '../store/weatherCheckAction';

class SavedDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: '',
            place: '',
            date: ''
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

    setDataToLocalState(savedWeathers) {
        let detailIndex;
        let id = this.props.match.params.id;
        savedWeathers.map((data, index) => {
            if (Number(data.id) === Number(id)) {
                detailIndex = index;
            }
        });
        return (savedWeathers[detailIndex]);
    }

    delete(index, id) {
        if(window.confirm('Do you want to delete it?')) {
            let data = {
                index: index,
                id: id
            }
            deleteWeatherInDetail(data);
            // this.props.deleteWeather(data);
            // console.log('index: ', index);
            // console.log('id: ', id);
        }
    }

    placeHandleChange(place) {
        this.setState({
            place: place
        });
    }

    dateHandleChange(date) {
        this.setState({
            date: date
        });
    }

    search(id) {
        let data = {
            place: this.state.place,
            date: this.state.date,
            time: this.state.time,
        };
        this.props.search(data, id);
        this.setState({
            place: ''
        });
    }

    render() {
        if(this.props.savedWeathers) {
            if(this.props.savedWeathers.length > 0) {
                let id = this.props.match.params.id;
                let data = this.setDataToLocalState(this.props.savedWeathers);
                let minDate = this.convertDate(this.today);
                let maxDate = this.convertDate(this.maxDate);
                return (
                    <div className="container" >
                        <div className="row">
                            <div className="col-md-4 col-sm-4 col-xs-4" >
                                <h3>{ data.title }</h3>
                                <p>Created at: { this.convertDate(data.createdAt) }</p>
                            </div>
                            <div className="col-md-8 col-sm-8 col-xs-8">
                                <input value={this.state.place} onChange={ (e) => this.placeHandleChange(e.target.value)} type="text" placeholder="City name" style={this.style.inputFormStyle} />
                                <input value={this.state.date} onChange={ (e) => this.dateHandleChange(e.target.value)} type="date" min={minDate} max={maxDate}  style={this.style.inputFormStyle}/>
                                {/*<input type="time" style={this.style.inputFormStyle}/>*/}
                                <button onClick={ this.search.bind(this, id) }  className="btn btn-primary">Check and Add to List!</button>
                            </div>
                        </div>
                        
                        <table className="table" >
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Location</th>
                                    <th>Date</th>
                                    <th>Forecast</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                { data.weathers.map((weather, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td className="text-capitalize">{weather.name}</td>
                                            <td>{weather.date}</td>
                                            <td>{weather.weather.weather[0].description}</td>
                                            <td>
                                                <button className="btn btn-default">Edit</button>
                                                <span> </span>
                                                <button onClick={this.delete.bind(this, index, id)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    );
                                }) }
                            </tbody>
                        </table>
                    </div>
                );
            } else {
                return (
                    <div className="container" >
                        <h3>No Data Found </h3>
                    </div>
                );
            }
        } else {
             return (
                <div className="container" >
                    <h3>Loading Detail ... </h3>
                </div>
            );
        }
        
    }

}

const mapStateToProps = (state) => {
    console.log('state.weatherCheckReducer: ', state.weatherCheckReducer);
    return ({
        savedWeathers: state.weatherCheckReducer.savedWeathers
    });
}

const mapDispatchToProps = (dispatch) => {
    return ({
        deleteWeather: (data) => dispatch(deleteWeatherInDetail(data)),
        search: (placeTime, id) => dispatch(searchPlaceInDetail(placeTime, id)),
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedDetail);