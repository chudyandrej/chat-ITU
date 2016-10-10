import React from 'react';

import CloseFormButton from './CloseFormButton.jsx';
import Form from './Form.jsx';

var token = null;  //user's token, obtain after successful login

class LoginForm extends Form {

    constructor(props, context) {
        super(props, context);

        this.state = {
            username: null,
            password: null,
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.login = this.login.bind(this);
        this._loginAllowed = this._loginAllowed.bind(this);
    }

    handleUsernameChange(evt) {
        this.setState({
            username: evt.target.value
        });
    }

    handlePasswordChange(evt) {
        this.setState({
            password: evt.target.value
        });
    }

    componentDidMount() {
        this.props.socket.on('loginAllowed', this._loginAllowed);
    }

    _loginAllowed(result) {
        if (result.status) {     //continue to chat
            //TODO continue to chat
        }
        else {          //wrong username or password
            //TODO show error
        }
    }

    login(e) {
        e.preventDefault();
        var data = {
            email: this.state.username,
            password: this.state.password
        };

        //send data to backend to authenticate
        this.props.socket.emit('login', data);

    }

    render() {
        return (
            <div className="formContainer">
                <div className="form">
                    <CloseFormButton close={ this.props.close }/>
                    <label>Username:</label>
                    <input type="text"
                           ref="name"
                           onChange={ this.handleUsernameChange }
                           placeholder="username"/>

                    <label>Password:</label>
                    <input type="password"
                           ref="password"
                           onChange={ this.handlePasswordChange }
                           placeholder="password"/>

                    <button onClick={ this.login }>Sign In</button>
                </div>
            </div>
        );
    }
}

export default LoginForm;