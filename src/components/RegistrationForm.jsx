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
            username: null,
            password: null,
            passwordCheck: null,
            email: null,
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
        let data = {
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

        let errorMsg = <strong className="alert alert-danger">Wrong username or password!</strong>;

        return (
        <div className="jumbotron regForm">
            {this.state.error ? errorMsg : null}
            <div className="container">
                <h2 className="login">Registration</h2>
                <div className="box">

                    <input placeholder="username"
                           type="text"
                           value={this.state.username}
                           onChange={this.handleChange.bind(this, "name")}/>

                    <input placeholder="password"
                           type="password"
                           value={this.state.password}
                           onChange={this.handleChange.bind(this, "password")}/>

                    <input placeholder="password"
                           type="password"
                           id={this.state.valid ? "valid" : "invalid"}
                           onChange={ this.handleChange.bind(this, "passwordCheck") }
                           onBlur={ this.checkPasswordMatch.bind(this) } />

                    <input placeholder="email"
                           type="text"
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