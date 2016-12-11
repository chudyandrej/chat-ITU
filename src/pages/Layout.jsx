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
        if (this.context.user.socket === null && !this.context.user.loggedIn) {
            //if context.user.socket is null, user did refresh the site
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
