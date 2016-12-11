import React from 'react';


export default class OnlineUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,   //user's ID
            username: this.props.username,
            rightBar: typeof(this.props.add) === "undefined"
        }
    }

    openNewChatWindow() {
        this.props.chat({
            id: this.state.id,
            username: this.state.username
        });
    }

    addUser() {
        this.props.add({
            id: this.state.id,
            username: this.state.username
        });
    }

    render() {
        //just developers' photos :D
        let imgURL = "https://chat-itu.herokuapp.com/" + this.state.id;

        let onlineStatus = (
            <div className="item-status">
                <span/>
            </div>
        );

        return (
            <button type="button"
                    onClick={this.state.rightBar ? this.openNewChatWindow.bind(this) : this.addUser.bind(this)}
                    className="list-group-item">
                <div className="item-image">
                    <img className="img-circle" src={parseInt(this.state.id) < 4 ? imgURL : require("../../public/img/person-flat.png")}/>
                </div>
                <div className="item-name">
                    <span>{this.state.username}</span>
                </div>
                {this.state.rightBar ? onlineStatus : null}
            </button>
        );
    }
}
