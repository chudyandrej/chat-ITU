import React from 'react';
import {hashHistory} from 'react-router';
import ImageLoader from 'react-imageloader';

import Form from './Form.jsx';


export default class LoginForm extends Form {

    static contextTypes = {
        user: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            username: "",
            password: "",
            pending: false,
            error: false
        };

        this._loginAllowed = this._loginAllowed.bind(this);
    }

    componentWillMount() {
        //create listener
        this.context.user.socket.on('loginAllowed', this._loginAllowed);
    }

    handleChange(name, evt) {
        this.console.log("tu");
        switch (name) {
            case "name":
                this.setState({username: evt.target.value});
                break;
            case "password":
                this.setState({password: evt.target.value});
                break;
        }
    }

    _loginAllowed(result) {
        console.log("answer");
        console.log(result);
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
                //valid: false
            });

        }
    }

    login(e) {
        e.preventDefault();
        this.setState({pending: true});
        let data = {
            email: "nieco",//this.state.username,
            password: "niecopasswd"//this.state.password
        };
        console.log(data);
        //send data to backend to authenticate
        this.context.user.socket.emit('login', data);

       // hashHistory.push('/chat'); //JUST DEBUG
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.login(e);
        }
    }

    render() {
        let errorMsg = <strong className="alert alert-danger">Wrong username or password!</strong>;

        return (
            <div className="jumbotron loginForm">
                {this.state.error ? errorMsg : null}
                <div>
                    <h2 className="login">Login</h2>
                    <div className="box">
                        <input placeholder="email"
                               type="text"
                               value={this.state.username}
                               onKeyPress={this._handleKeyPress.bind(this)}
                               onChange={this.handleChange.bind(this, "name")}/>
                        <input placeholder="password"
                               type="password"
                               value={this.state.password}
                               onKeyPress={this._handleKeyPress.bind(this)}
                               onChange={this.handleChange.bind(this, "password")}/>
                        <button onClick={this.login.bind(this)}
                                className="btn btn-default full-width">
                            <ImageLoader src={require("../../public/img/login.png")}/>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}