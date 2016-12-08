import React from 'react';
import ImageLoader from 'react-imageloader';


export default class Header extends React.Component {

    static contextTypes = {
        user: React.PropTypes.object
    };

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button className="navbar-toggle collapsed" style={{dataToggle:"collapse", dataTarget:"#navcol-1"}}>
                            <span className="sr-only">Toggle navigation</span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="navcol-1">
                        <ul className="nav navbar-nav navbar-left">
                            <li  role="presentation">
                                <a className="logo" href="#">
                                    <ImageLoader src={require("../../public/img/livechat.png")}/>
                                </a>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="active" role="presentation">
                                <a href="#"><i className="glyphicon glyphicon-user"></i> My account</a>
                            </li>
                            <li role="presentation">
                                <a href="#"><i className="glyphicon glyphicon-log-out"></i> Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
