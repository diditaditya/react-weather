import React from 'react';
import {Route, Link} from 'react-router-dom';

import WeatherList from './WeatherList';
import WeatherCheck from './WeatherCheck';
import SavedWeathers from './SavedWeathers';
import SavedDetail from './SavedDetail';

class ViewBody extends React.Component {

    render() {
        return (
            <div className="container" >
                <div>
                    <Link to="/"><button className="btn btn-primary">3-Hourly</button></Link>
                    <span> </span>
                    <Link to="/daily"><button className="btn btn-primary">Daily</button></Link>
                    <Link to="/weatherchecker"><button className="btn btn-warning" style={{float:'right', marginLeft: 5}} >Daily Weather Checker</button></Link>
                    <Link to="/savedweathers"><button className="btn btn-warning" style={{float:'right'}} >Saved Weathers</button></Link>
                </div>
                
                <Route path="/" component={WeatherList} />
                <Route path="/weatherchecker" component={WeatherCheck} />
                <Route exact path="/savedweathers" component={SavedWeathers} />
                <Route path="/savedweathers/:id" component={SavedDetail} />
            </div>
        );
    }

}

export default ViewBody;