import React from 'react';
import { connect } from 'react-redux';

import { deleteCheckedWeather } from '../store/weatherCheckAction';

class CheckedList extends React.Component {

    delete(index) {
        if(window.confirm('Do you want to delete it?')) {
            this.props.deleteCheckedWeather(index);
        }
    }

    render() {

        if(this.props.checkedWeathers) {
            console.log(this.props.checkedWeathers);
            if (this.props.checkedWeathers.length > 0) {
                return (
                    <div>
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
                                { this.props.checkedWeathers.map((checked, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td className="text-capitalize">{checked.name}</td>
                                            <td>{checked.date}</td>
                                            <td>{checked.weather.weather[0].description}</td>
                                            <td>
                                                <button onClick={this.delete.bind(this, index)} className="btn btn-danger">Delete</button>
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
                    <div>
                        <h3>Please add some locations to check</h3>
                    </div>
                );
            }

        } else {

            return (
                <div>
                    <h3>Loading ... </h3>
                </div>
            );
            
        }
    }

}

const mapStateToProps = (state) => {
    return ({
        checkedWeathers: state.weatherCheckReducer.checkedWeathers
    });
}

const mapDispatchtoProps = (dispatch) => {
    return ({
        deleteCheckedWeather: (index) => dispatch(deleteCheckedWeather(index))
    });
}

export default connect(mapStateToProps, mapDispatchtoProps)(CheckedList);