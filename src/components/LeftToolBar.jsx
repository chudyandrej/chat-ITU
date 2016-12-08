import React from 'react';

export default class LeftToolBar extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse show">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand navbar-link" href="#"> </a>
                            <button className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navcol-2"></button>
                        </div>
                        <div className="collapse navbar-collapse" id="navcol-2">
                            <ul className="nav navbar-nav"></ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}