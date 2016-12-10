import React from 'react';


export default class Layout extends React.Component {

    static contextTypes = {
        user: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        //this.context.user.socket.emit('getUsers', {layout: "layout"});
    }


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
