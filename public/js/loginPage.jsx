import React from 'react';
import TransitionGroup from 'react-addons-transition-group';

import LoginForm from './components/LoginForm.jsx';
import RegistrationForm from './components/RegistrationForm.jsx';

var io = require('socket.io-client');
var socket = io();


var LoginPage = React.createClass({

    getInitialState() {
        return {
            signInClicked: false,
            signUpClicked: false
        }
    },

    closeForm() {
        this.setState({
            signInClicked: false,
            signUpClicked: false
        })
    },

    signInClicked() {
        if (this.state.signInClicked) {
            this.closeForm();
            return;
        }
        this.setState({
            signUpClicked: false,
            signInClicked: true
        })
    },

    signUpClicked() {
        if (this.state.signUpClicked) {
            this.closeForm();
            return;
        }
        this.setState({
            signInClicked: false,
            signUpClicked: true
        })
    },

    render() {
        return (
            <div className="loginPage">
                <div id="header">
                    <div id="loginButtons">
                        <button onClick={ this.signInClicked }>Sign In</button>
                        <button onClick={ this.signUpClicked }>Sign Up</button>
                    </div>
                </div>
                {/*<div id="title">
                 <h1><a href="./index.html">Welcome to our CHAT</a></h1>
                 </div>*/}

                <TransitionGroup>
                    { this.state.signInClicked ? <LoginForm socket={socket} close={this.closeForm}/> : null}
                    { this.state.signUpClicked ? <RegistrationForm socket={socket} close={this.closeForm}/> : null}
                </TransitionGroup>

            </div>
        )
    }
});

export default LoginPage
