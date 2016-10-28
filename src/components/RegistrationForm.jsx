import React from 'react';

import CloseFormButton from './CloseFormButton.jsx';
import Form from './Form.jsx';


class RegistrationForm extends Form {

    static contextTypes = {
        user: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            username: null,
            password: null,
            passwordCheck: null,
            email: null,
            valid: true,
            validUsername: true,
            weakPassword: false,
            registerSuccess: false,
            buttonName: "Register"
        };

        this._registerAllowed = this._registerAllowed.bind(this);
    }

    handleChange(type, evt) {
        switch (type){
            case "username":
                this.setState({ username: evt.target.value });
                break;
            case "password":
                //TODO check length of password
                //TODO if short =>  this.state.weakPassword = true
                this.setState({ password: evt.target.value });
                break;
            case "passwordCheck":
                this.setState({ passwordCheck: evt.target.value });
                break;
            case "email":
                this.setState({ email: evt.target.value });
                break;
        }
    }

    checkPasswordMatch() {
        if (this.state.password == this.state.passwordCheck) {
            this.setState({valid: true});
        }
        else {
            this.setState({valid: false});
        }
    }

    //TODO check email validity ?

    componentWillMount() {
        //create listener
        this.context.user.socket.on('registerAllowed', this._registerAllowed);
    }

    _registerAllowed(result) {
        if (result.status) {     //continue to login
            this.setState({
                buttonName: "Login",
                registerSuccess: true
            })
        }
        else {          //username already exists
            this.set.state({
                validUsername: false
            })
        }
    }

    register(e) {
        e.preventDefault();
        var data = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        };

        //send data to backend
        //TODO send data only if it is valid!

        if (this.state.buttonName == "Register") {
            this.context.user.socket.emit('join', data);
        }
        else {   //successful registration
            this.props.registerSuccess()
        }
    }

    render() {
        return (
            <div className="formContainer">
                <div className="form">
                    <CloseFormButton close={ this.props.close }/>
                    <label>Username:</label>
                    <input type="text"
                           ref="name"
                           onChange={ this.handleChange.bind(this, "username") }
                           placeholder="username"/>

                    {this.state.validUsername ? null : <div id="alert">Username already exists!</div>}

                    <label>Password:</label>
                    <input type="password"
                           ref="password"
                           onChange={ this.handleChange.bind(this, "password") }
                           placeholder="password"/>

                    {this.state.weakPassword ? <div id="alert">Password is too weak!</div> : null}

                    <label>Password:</label>
                    <input type="password"
                           ref="password"
                           id={this.state.valid ? "valid" : "invalid"}
                           onChange={ this.handleChange.bind(this, "passwordCheck") }
                           onBlur={ this.checkPasswordMatch.bind(this) }
                           placeholder="password"/>

                    {this.state.valid ? null : <div id="alert">Passwords do not match!</div>}

                    <label>Email:</label>
                    <input type="text"
                           ref="email"
                           onChange={ this.handleChange.bind(this, "email") }
                           placeholder="email"/>

                    {this.state.registerSuccess ? <label id="success">Registration was successful!</label> : null}

                    <button onClick={ this.register.bind(this) }>{this.state.buttonName}</button>
                </div>
            </div>
        );
    }
}

export default RegistrationForm;