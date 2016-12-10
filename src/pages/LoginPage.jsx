import React from 'react';
import TransitionGroup from 'react-addons-transition-group';

import LoginForm from '../components/LoginForm.jsx';
import RegistrationForm from '../components/RegistrationForm.jsx';

import io from 'socket.io-client';
let socket = io();


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
        let user = {
            loggedIn: false,
            socket: socket,
        };
       this.context.user.changeHandler(user);
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
                <div className='btn-toolbar pull-right'>
                    <div className='btn-group'>
                        <button type='button'
                                className='btn btn-primary'
                                onClick={ this.signInClicked.bind(this) }>Sign In</button>
                        <button type='button'
                                className='btn btn-primary'
                                onClick={ this.signUpClicked.bind(this) }>Sign Up</button>
                    </div>
                </div>
                {/*<div id="title">
                 <h1><a href="./index.html">Welcome to our CHAT</a></h1>
                 </div>*/}

                <TransitionGroup>
                    { this.state.signInClicked ? <LoginForm /> : null}

                    { this.state.signUpClicked ? <RegistrationForm /> : null}
                </TransitionGroup>

            </div>
        )
    }
}

