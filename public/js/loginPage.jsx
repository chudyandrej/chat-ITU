import React from 'react';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import TweenMax from 'gsap'

var CloseFormButton = React.createClass({
    render(){
        return (
            <div id="exitBtnContainer">
                <button id="exitBtn" onClick={ this.props.close }>X</button>
            </div>
        )
    }
});

var RegistrationForm = React.createClass({
    getInitialState() {
        return {
            username: null,
            password: null,
            passwordCheck: null,
            email: null
        }
    },

    componentWillEnter (callback) {
        const el = ReactDOM.findDOMNode(this);
        TweenMax.fromTo(el, 0.5, {y: 0, opacity: 0}, {y: 100, opacity: 1, onComplete: callback});
    },

    componentWillLeave (callback) {
        const el = ReactDOM.findDOMNode(this);
        TweenMax.fromTo(el, 0.5, {y: 100, opacity: 1}, {y: 0, opacity: 0, onComplete: callback});
    },

    handleUsernameChange (evt) {
        this.setState({
            username: evt.target.value
        });
    },

    handlePasswordChange (evt) {
        this.setState({
            password: evt.target.value
        });
    },

    handlePasswordCheckChange (evt) {
        this.setState({
            passwordCheck: evt.target.value
        });
    },

    handleEmailChange (evt) {
        this.setState({
            email: evt.target.value
        });
    },

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

                    <label>Password:</label>
                    <input type="password"
                           ref="password"
                           onChange={ this.handlePasswordCheckChange }
                           placeholder="password"/>

                    <label>Email:</label>
                    <input type="text"
                           ref="email"
                           onChange={ this.handleEmailChange }
                           placeholder="email"/>

                    <button onClick={ this.register }>Register</button>
                </div>
            </div>
        );
    },

    register(e) {
        e.preventDefault();
        //this.state.username
        //this.state.password
        //this.state.email
    }
});


var LoginForm = React.createClass({

    getInitialState() {
        return {
            username: null,
            password: null,
        }
    },

    componentWillEnter (callback) {
        const el = ReactDOM.findDOMNode(this);
        TweenMax.fromTo(el, 0.5, {y: 0, opacity: 0}, {y: 100, opacity: 1, onComplete: callback});
    },

    componentWillLeave (callback) {
        const el = ReactDOM.findDOMNode(this);
        TweenMax.fromTo(el, 0.5, {y: 100, opacity: 1}, {y: 0, opacity: 0, onComplete: callback});
    },

    handleUsernameChange (evt) {
        this.setState({
            username: evt.target.value
        });
    },

    handlePasswordChange (evt) {
        this.setState({
            password: evt.target.value
        });
    },

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
    },

    login(e) {
        e.preventDefault();
        //this.state.username
        //this.state.password
    }
});

var LoginPage = React.createClass({

    getInitialState() {
        return {
            signInClicked: false,
            signUpClicked: false,
            signInHover: false
        }
    },

    closeForm() {
        this.setState({
            signInClicked: false,
            signUpClicked: false
        })
    },

    signInClicked() {
        if(this.state.signInClicked){
            this.closeForm();
            return;
        }
        this.setState({
            signUpClicked: false,
            signInClicked: true,
            signInHover: true

        })
    },

    signUpClicked() {
        if(this.state.signUpClicked){
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
                        <button onClick={ this.signInClicked } hover={this.state.signInHover}>Sign In</button>
                        <button onClick={ this.signUpClicked }>Sign Up</button>
                    </div>
                </div>
                {/*<div id="title">
                 <h1><a href="./index.html">Welcome to our CHAT</a></h1>
                 </div>*/}

                <TransitionGroup>
                    { this.state.signInClicked ? <LoginForm close={this.closeForm}/> : null}
                    { this.state.signUpClicked ? <RegistrationForm close={this.closeForm}/> : null}
                </TransitionGroup>

            </div>
        )
    }
});

export default LoginPage
