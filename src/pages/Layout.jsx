import React from 'react';


export default class Layout extends React.Component {

    componentWillMount(){
        //TODO check if user is still logged in
        //hashHistory.push('/');
        console.log("checking if user is still signed in");
    }

    render () {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
