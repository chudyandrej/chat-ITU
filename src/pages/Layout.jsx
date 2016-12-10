import React from 'react';
import {hashHistory} from 'react-router';


export default class Layout extends React.Component {

    static contextTypes = {
        user: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        console.log("checking if user is still signed in"); //DEBUG
        if (!this.context.user.loggedIn) {
            hashHistory.push('/');
        }
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
