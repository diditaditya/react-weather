import React from 'react';
import { connect } from 'react-redux';

class SavedDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: ''
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

    render() {
        if(this.props.savedWeathers) {
            if(this.props.savedWeathers.length > 0) {
                let data = this.setDataToLocalState(this.props.savedWeathers);
                console.log('data: ', data);
                return (
                    <div className="container" >
                        <h3>{ data.title }</h3>
                        <p>Created at: { this.convertDate(data.createdAt) }</p>
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
                                { data.weathers.map((weather, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td className="text-capitalize">{weather.name}</td>
                                            <td>{weather.date}</td>
                                            <td>{weather.weather.weather[0].description}</td>
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

    });
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedDetail);