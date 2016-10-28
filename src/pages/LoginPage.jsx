import React from 'react';
import TransitionGroup from 'react-addons-transition-group';

import LoginForm from '../components/LoginForm.jsx';
import RegistrationForm from '../components/RegistrationForm.jsx';

import io from 'socket.io-client';
var socket = io();


export default class LoginPage extends React.Component {

    static contextTypes = {
        user: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            signInClicked: false,
            signUpClicked: false
        };
    }

    componentWillMount() {
        var user = {
            loggedIn: false,
            userName: "",
            token: null,
            socket: socket,
        };
       this.context.user.changeHandler(user)
    }

    closeForm() {
        this.setState({
            signInClicked: false,
            signUpClicked: false
        })
    }

    signInClicked() {
        if (this.state.signInClicked) {
            this.closeForm();
            return;
        }
        this.setState({
            signUpClicked: false,
            signInClicked: true
        });

        console.log(this.context.user);
    }

    signUpClicked() {
        if (this.state.signUpClicked) {
            this.closeForm();
            return;
        }
        this.setState({
            signInClicked: false,
            signUpClicked: true
        })
    }

    render() {
        return (
            <div className="loginPage" id="background-image-login">
                <div id="header">
                    <div id="loginButtons">
                        <button onClick={ this.signInClicked.bind(this) }>Sign In</button>
                        <button onClick={ this.signUpClicked.bind(this) }>Sign Up</button>
                    </div>
                </div>
                {/*<div id="title">
                 <h1><a href="./index.html">Welcome to our CHAT</a></h1>
                 </div>*/}

                <TransitionGroup>
                    { this.state.signInClicked ? <LoginForm close={this.closeForm.bind(this)}/> : null}

                    { this.state.signUpClicked ? <RegistrationForm close={this.closeForm.bind(this)}
                                                                   registerSuccess={this.signInClicked.bind(this)}/> : null}
                </TransitionGroup>

            </div>
        )
    }
}

