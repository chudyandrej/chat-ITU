import React from 'react';
import {hashHistory} from 'react-router';

import CloseFormButton from './CloseFormButton.jsx';
import Form from './Form.jsx';


class LoginForm extends Form {

    static contextTypes = {
        user: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            username: null,
            password: null,
            valid: true
        };

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

    componentWillMount() {
        //create listener
        this.context.user.socket.on('loginAllowed', this._loginAllowed);
    }

    _loginAllowed(result) {
        if (result.status) {     //continue to chat
            token = result.token;

            //fill user structure
            //const {user} = this.context;
            //var user = {
            //    loggedIn: true,
            //    userName: result.name,
            //    token: result.token,
            //}
            //user.changeHandler();

            hashHistory.push('/chat');
        }
        else {          //wrong username or password
            this.setState({
                valid: false
            });

        }
    }

    login(e) {
        e.preventDefault();
        var data = {
            email: this.state.username,
            password: this.state.password
        };

        //send data to backend to authenticate
        //this.context.user.socket.emit('login', data);

        hashHistory.push('/chat'); //JUST DEBUG
    }

    render() {
        return (
            <div className="formContainer">
                <div className="form">
                    <CloseFormButton close={ this.props.close }/>
                    <label>Username:</label>
                    <input type="text"
                           ref="name"
                           id={this.state.valid ? "valid" : "invalid"}
                           onChange={ this.handleUsernameChange.bind(this) }
                           placeholder="username"/>

                    <label>Password:</label>
                    <input type="password"
                           ref="password"
                           id={this.state.valid ? "valid" : "invalid"}
                           onChange={ this.handlePasswordChange.bind(this) }
                           placeholder="password"/>

                    {this.state.valid ? null : <div id="alert">Wrong username or password!</div>}

                        <button onClick={ this.login.bind(this) }>Sign In</button>

                </div>
            </div>
        );
    }
}

export default LoginForm;
