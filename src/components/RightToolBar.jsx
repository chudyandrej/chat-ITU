import React from 'react';


export default class RightToolBar extends React.Component {

    constructor(props) {
        super(props);
    }

    openNewChatWindow(data) {
        console.log("1");
        this.props.chat(data);
    }

    render() {
        console.log(this.props.chat);
        return (
        <div className="rightSide">
            <div id="sidebar-wrapper" className="list-group">
                <button type="button"
                        onClick={this.openNewChatWindow.bind(this, 1)}
                        className="list-group-item sidebar-brand">
                    <div className="item-image">
                        <img src={require("../../public/img/person-flat.png")}/>
                    </div>
                    <div className="item-name">
                        <span>Andrej Chudy</span>
                    </div>
                    <div className="item-status">
                        <span></span>
                    </div>
                </button>

                <button type="button" className="list-group-item sidebar-brand">
                    <div className="item-image">
                        <img src={require("../../public/img/person-flat.png")}/>
                    </div>
                    <div className="item-name">
                        <span>Andrej Chudy</span>
                    </div>
                    <div className="item-status">
                        <span></span>
                    </div>
                </button>

                <button type="button" className="list-group-item sidebar-brand">
                    <div className="item-image">
                        <img src={require("../../public/img/person-flat.png")}/>
                    </div>
                    <div className="item-name">
                        <span>Andrej Chudy</span>
                    </div>
                    <div className="item-status">
                        <span></span>
                    </div>
                </button>
            </div>
        </div>

        );
    }
}