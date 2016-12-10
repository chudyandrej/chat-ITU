import React from 'react';


export default class OnlineUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,   //user's ID
            username: this.props.username
        }
    }

    openNewChatWindow() {
        this.props.chat({
            id: this.state.id,
            username: this.state.username
        });
    }

    render () {
        return (
            <button type="button"
                    onClick={this.openNewChatWindow.bind(this)}
                    className="list-group-item sidebar-brand">
                <div className="item-image">
                    <img src={require("../../public/img/person-flat.png")}/>
                </div>
                <div className="item-name">
                    <span>{this.state.username}</span>
                </div>
                <div className="item-status">
                    <span></span>
                </div>
            </button>
        );
    }
}