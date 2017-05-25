import React from 'react';
import { connect } from 'react-redux';

import { fetchSavedWeathers, deleteSavedWeather } from '../store/weatherCheckAction';

class SavedWeathers extends React.Component {

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

    render() {
        if(this.props.savedWeathers) {
            if(this.props.savedWeathers.length > 0) {
                console.log(this.props.savedWeathers);
                return (
                    <div className="container" style={{marginTop: 25}}>
                        <h3>Saved Weathers</h3>
                        <table className="table" >
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Title</th>
                                    <th>Created at</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.props.savedWeathers.map((saved, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{saved.id}</td>
                                            <td className="text-capitalize">{saved.title}</td>
                                            <td>{ this.convertDate(saved.createdAt) }</td>
                                            <td>
                                                <button className="btn btn-default">Detail</button>
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