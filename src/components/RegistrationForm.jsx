import React from 'react';
import ImageLoader from 'react-imageloader';

import Form from './Form.jsx';


class RegistrationForm extends Form {

    static contextTypes = {
        user: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            username: "",
            password: "",
            passwordCheck: "",
            email: "",
            valid: true,
            validUsername: true,
            weakPassword: false,
            registerSuccess: false,
            buttonName: "Register",

            error: false
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

    _registerAllowed(response) {
        console.log(response);
        if (response.result) {     //continue to login
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
        let data = {
            name: this.state.username,
            password: this.state.password,
            email: this.state.email
        };

        //send data to backend
        //TODO send data only if it is valid!

        console.log(data);
        if (this.state.buttonName === "Register") {
            this.context.user.socket.emit('join', data);
        }
        else {   //successful registration
            this.props.registerSuccess()
        }
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.register(e);
        }
    }


    render() {

        let errorMsg = <strong className="alert alert-danger">Wrong username or password!</strong>;

        return (
        <div className="jumbotron regForm">
            {this.state.error ? errorMsg : null}
            <div>
                <h2 className="login">Registration</h2>
                <div className="box">

                    <input placeholder="username"
                           type="text"
                           value={this.state.username}
                           onKeyPress={this._handleKeyPress.bind(this)}
                           onChange={this.handleChange.bind(this, "username")}/>

                    <input placeholder="password"
                           type="password"
                           value={this.state.password}
                           onKeyPress={this._handleKeyPress.bind(this)}
                           onChange={this.handleChange.bind(this, "password")}/>

                    <input placeholder="password"
                           type="password"
                           id={this.state.valid ? "valid" : "invalid"}
                           onKeyPress={this._handleKeyPress.bind(this)}
                           onChange={ this.handleChange.bind(this, "passwordCheck") }
                           onBlur={ this.checkPasswordMatch.bind(this) } />

                    <input placeholder="email"
                           type="text"
                           onKeyPress={this._handleKeyPress.bind(this)}
                           onChange={ this.handleChange.bind(this, "email") }/>

                    <button onClick={this.register.bind(this)}
                            className="btn btn-default full-width">
                        <ImageLoader src={require("../../public/img/login.png")}/>
                    </button>
                </div>
            </div>
        </div>
        );
    }
}

export default RegistrationForm;