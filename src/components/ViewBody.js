import React from 'react';
import {Route, Link} from 'react-router-dom';

import WeatherList from './WeatherList';
import WeatherCheck from './WeatherCheck';

class ViewBody extends React.Component {

    render() {
        return (
            <div className="container" >
                <div>
                    <Link to="/"><button className="btn btn-primary">3-Hourly</button></Link>
                    <span> </span>
                    <Link to="/daily"><button className="btn btn-primary">Daily</button></Link>
                    <Link to="/weatherchecker"><button className="btn btn-warning" style={{float:'right'}} >Weather Checker</button></Link>
                </div>
                
                <Route path="/" component={WeatherList} />
                <Route path="/weatherchecker" component={WeatherCheck} />
            </div>
        );
    }

}

export default ViewBody;