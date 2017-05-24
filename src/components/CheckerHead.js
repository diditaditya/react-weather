import React from 'react';

class CheckerHead extends React.Component {

    constructor(props) {
        super(props);
        this.style = {
            divStyle: {
                paddingBottom: 150
            },
            checkerTitle: {
                fontSize: '4em',
                fontWeight: 'bold',
                color: 'black'
            }
        }
    }

    render() {
        return (
            <div className="container">
                <div style={this.style.divStyle}>
                    <h1 style={this.style.checkerTitle}>Weather Checker</h1>
                    <p>self explanatory ..</p>
                </div>
                <hr/>
            </div>
        );
    }

}

export default CheckerHead;