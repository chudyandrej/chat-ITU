import React from 'react';


export default class Header extends React.Component {

    static contextTypes = {
        user: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="header navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navcol-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>

                    </div>
                    <div className="collapse navbar-collapse" id="navcol-1">
                        <ul className="nav navbar-nav navbar-left">
                            <li role="presentation">
                                <a className="logo" href="#">
                                    <img alt="Logo lifeChat" src={require("../../public/img/livechat.png")}/>
                                </a>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li role="presentation">
                                <img className="hover-img"
                                     id="user"
                                     src={require("../../public/img/user.png")}/>
                                My account
                            </li>
                            <li role="presentation" onClick={this.context.user.logout}>
                                <img className="hover-img"
                                     id="user"
                                     src={require("../../public/img/log-out.png")}/>
                                    Logout
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
