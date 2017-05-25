import React from 'react';
import { connect } from 'react-redux';

import { searchPlace, fetchWeather, saveWeathers, clearCheckedWeathers } from '../store/weatherCheckAction';
import CheckedList from './CheckedList';

class WeatherCheck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            place: '',
            date: '',
            time: '',
            checkedWeathers: [],
            savedWeathers: [],
            listTitle: '',
            message: ''
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

    search() {
        let data = {
            place: this.state.place,
            date: this.state.date,
            time: this.state.time
        };
        this.props.search(data);
        this.setState({
            place: ''
        });
    }

    listTitleHandleChange(title) {
        this.setState({
            listTitle: title
        });
    }

    saveList() {
        if(this.state.listTitle.length > 0) {
            if(this.props.checkedWeathers.length > 0) {
                let data = {};
                data.title = this.state.listTitle;
                data.createdAt = new Date();
                data.weathers = this.props.checkedWeathers;
                console.log(data);
                this.props.saveWeathers(data);
                this.props.clearList();
                this.setState({
                    listTitle: '',
                    message: '',
                    date: ''
                });
            } else {
                this.setState({
                    message: 'The list is empty'
                });
            }
        } else {
            this.setState({
                message: 'Title is required'
            });
        }
    }

    clearList() {
        this.props.clearList();
    }

    render() {
        // console.log(this.props);
        let minDate = this.convertDate(this.today);
        let maxDate = this.convertDate(this.maxDate);
        return (
            <div className="container" style={{marginTop: 25}}>
                <h3>Daily Weather Checker</h3>
                <input value={this.state.place} onChange={ (e) => this.placeHandleChange(e.target.value)} type="text" placeholder="City name" style={this.style.inputFormStyle} />
                <input value={this.state.date} onChange={ (e) => this.dateHandleChange(e.target.value)} type="date" min={minDate} max={maxDate}  style={this.style.inputFormStyle}/>
                {/*<input type="time" style={this.style.inputFormStyle}/>*/}
                <button onClick={ () => this.search() }  className="btn btn-primary">Check and Add to List!</button>
                <hr/>
                <CheckedList/>
                <hr/>
                <div className="container">
                    <input value={this.state.listTitle} onChange={ (e) => this.listTitleHandleChange(e.target.value)} type="text" placeholder="Title" style={this.style.inputFormStyle}/>
                    <button onClick={()=> this.saveList()} className="btn btn-primary" >Save List</button>
                    <span> </span>
                    <button onClick={()=> this.clearList()} className="btn btn-danger" >Clear List</button>
                    <p>{ this.state.message }</p>
                </div>
            </div>
        );
    }

    componentDidMount() {
    }

    componentDidUpdate() {

    }

    
}

const mapStateToProps = (state) => {
    return ({
        checkedWeathers: state.weatherCheckReducer.checkedWeathers,
        savedWeathers: state.weatherCheckReducer.savedWeathers
    });
}

const mapDispatchToProps = (dispatch) => {
    return ({
        search: (placeTime) => dispatch(searchPlace(placeTime)),
        checkWeather: (coordinate) => dispatch(fetchWeather(coordinate)),
        clearList: () => dispatch(clearCheckedWeathers()),
        saveWeathers: (data) => dispatch(saveWeathers(data))
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherCheck);