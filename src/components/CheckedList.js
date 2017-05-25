import React from 'react';
import { connect } from 'react-redux';

class CheckedList extends React.Component {

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

export default connect(mapStateToProps, null)(CheckedList);