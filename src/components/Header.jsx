import React from 'react';


export default class Header extends React.Component {

    render() {
        return (
            <div className="header navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navcol-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar">

                    </span></button>
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
                            <li className="active" role="presentation">
                                <a href="#"><i className="glyphicon glyphicon-user"/> My account</a>
                            </li>
                            <li role="presentation">
                                <a href="#"><i className="glyphicon glyphicon-log-out"/> Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
