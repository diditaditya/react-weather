import React from 'react';
import { Route } from 'react-router-dom';

import City from './City';
import CheckerHead from './CheckerHead';

class ViewHead extends React.Component {

    render() {
        return (
            <div>
                <Route exact path="/" component={City} />
                <Route path="/daily" component={City} />
                <Route path="/weatherchecker" component={CheckerHead} />
                <Route exact path="/savedweathers" component={CheckerHead} />
                <Route path="/savedweathers/:id" component={CheckerHead} />
            </div>
        );
    }

}

export default ViewHead;