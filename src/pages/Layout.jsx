import React from 'react';


export default class Layout extends React.Component {

    static contextTypes = {
        user: React.PropTypes.object
    };

    componentWillMount(){
        console.log("checking if user is still signed in"); //DEBUG
        //if (!this.context.user.loggedIn){
        //    hashHistory.push('/');
        //}
    }

    render () {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
