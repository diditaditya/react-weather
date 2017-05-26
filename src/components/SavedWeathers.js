import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchSavedWeathers, deleteSavedWeather } from '../store/weatherCheckAction';

class SavedWeathers extends React.Component {

    constructor(props) {
        super(props);
        this.style = {
            inputFormStyle: {
                borderRadius: 5,
                marginTop: '25px',
                marginRight: '50px'
            }
        };
        this.state = {
            savedWeathers: [],
            searchString: '',
            searchMessage: ''
        }
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

    delete(item) {
        if(window.confirm('Do you want to delete it?')) {
            this.props.deleteSavedWeather(item.id);
        }
    }

    searchStringHandleChange(string) {
        this.setState({
            searchString: string
        });        
    }

    search() {

        if(this.state.searchString.length > 0) {
            console.log(this.state.searchString);
            let pattern = new RegExp(this.state.searchString);
            let filtered = [];
            this.state.savedWeathers.map((item) => {
                item.weathers.map((weather) => {
                    if(pattern.test(weather.name.toLowerCase()) || pattern.test(weather.address.toLowerCase()) || pattern.test(item.title.toLowerCase())  ) {
                        if(filtered.length !== 0) {
                            let found = 0;
                            filtered.map((pushed) => {
                                if(pushed.title === item.title) {
                                    found ++;
                                }
                            });
                            if(found === 0) {
                                filtered.push(item);
                            }
                        } else {
                            filtered.push(item);
                        }
                    }
                });
            });
            if(filtered.length > 0) {
                this.setState({
                    searchString: '',
                    savedWeathers: filtered,
                    searchMessage: ''
                });
            } else {
                this.setState({
                    searchMessage: 'Keyword is not found in the lists'
                });
            }
        }
        
    }

    showAll() {
        this.setState({
            savedWeathers: this.props.savedWeathers,
            searchMessage: ''
        });
    }

    render() {
        if(this.props.savedWeathers) {
            if(this.state.savedWeathers.length > 0) {
                return (
                    <div className="container" style={{marginTop: 25}}>
                        <div style={{height: 100}}>
                            <div className="row">
                                <div className="col-md-4 col-sm-4 col-xs-4" >
                                    <h3>Saved Weathers</h3>
                                </div>
                                <div className="col-md-8 col-sm-8 col-xs-8">
                                    <div className="row">
                                        <input value={this.state.searchString} onChange={ (e) => this.searchStringHandleChange(e.target.value)} type="text" placeholder="Keyword" style={this.style.inputFormStyle} />
                                        <button onClick={ this.search.bind(this) }  className="btn btn-primary">Search</button>
                                        <span> </span>
                                        <button onClick={ this.showAll.bind(this) }  className="btn btn-primary">Show All</button>
                                    </div>
                                    <div className="row" >
                                        <span>{ this.state.searchMessage }</span>
                                    </div>                                    
                                    
                                </div>
                                
                            </div>
                        </div>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Title</th>
                                    <th>Created at</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.savedWeathers.map((saved, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index +1}</td>
                                            <td className="text-capitalize">{saved.title}</td>
                                            <td>{ this.convertDate(saved.createdAt) }</td>
                                            <td>
                                                <Link to={"/savedweathers/" + saved.id} ><button className="btn btn-default">Detail</button></Link>
                                                <span> </span>
                                                <button onClick={this.delete.bind(this, saved)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    );
                                }) }
                            </tbody>
                        </table>
                    </div>
                );
            } else {
                return(
                    <div className="container">
                        <h3>No Saved Weathers ...</h3>
                    </div>
                );    
            }
        } else {
            return(
                <div className="container">
                    <h1>Loading Saved Weathers ...</h1>
                </div>
            );    
        }
        
    }

    componentDidMount() {
        this.props.fetchSavedWeathers();
    }

    componentDidUpdate() {
        if(this.props.savedWeathers) {
            if(this.state.savedWeathers.length === 0) {
                this.setState({
                    savedWeathers: this.props.savedWeathers
                });
            }
        }
    }

}

const mapStateToProps = (state) => {
    return ({
        savedWeathers: state.weatherCheckReducer.savedWeathers
    });
}

const mapDispatchToProps = (dispatch) => {
    return ({
        fetchSavedWeathers: fetchSavedWeathers,
        deleteSavedWeather: deleteSavedWeather
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedWeathers);