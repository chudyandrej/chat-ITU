import React from 'react';
import moment from 'moment';

import Message from './Message.jsx';


export default class ChatWindow extends React.Component {

    static contextTypes = {
        user: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            initAsGroup: Array.isArray(this.props.to.id),
            text: '',
            id: this.props.id,  //identificator of window
            toWhoInfo: this.props.to, //object of the first user window was initialized with
            //id of users in group conversation, except the first id (when window was created), it is in toWhoInfo
            groupIDs: [],
            messages: []
        };
    }

    componentDidMount() {
        //put cursor to input box
        this.refs.input.focus();

        if (this.props.msg !== null) {
            this.showMessage(this.props.msg, false);
        }

        this.context.user.socket.on('message', (msg) => {

            if (msg.serviceMsg) {
                if (msg.myID == this.context.user.id && msg.id != this.state.id) {
                    //this message is sent to all my windows, so add new receivers only to the right one
                    return;
                }
                let allIDs = this.state.groupIDs.concat(msg.text);
                this.setState({groupIDs: allIDs});
                return;
            }

            if (msg.to.length === 1) {
                //non group conversation  //TODO problem when group message?
                if (this.state.toWhoInfo.id == msg.from.id) {
                    this.showMessage(msg, false);
                }
            }
            else {  //group conversation
                //check if the message is for this window
                if (this.state.id == msg.id) {
                    this.showMessage(msg, false);
                }
            }
        });
    }

    componentDidUpdate() {
        this.scrollDown()
    }

    scrollDown() {
        let element = document.getElementById(this.state.id);
        element.scrollTop += 200;
    }

    showMessage(message, sent) {
        let temp = this.state.messages.slice();
        temp.push(
            <Message key={this.state.messages.length}
                     userID={message.from.id}
                     sent={sent}
                     text={message.text}
                     time={message.time}/>
        );

        this.setState({messages: temp});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.text === "") {
            return;
        }

        let allReceivers = this.state.initAsGroup ? this.state.toWhoInfo.id : [this.state.toWhoInfo.id];
        if (this.state.groupIDs.length > 0) {
            allReceivers = allReceivers.concat(this.state.groupIDs);
        }

        let message = {
            //serviceMsg: false,
            to: allReceivers, //TODO add multiple IDs of multiple people
            from: {id: this.context.user.id, username: this.context.user.username},
            id: this.state.id,
            text: this.state.text,
            time: moment.utc().format('LLL')
        };
        //socket.emit('new message', message);
        this.setState({text: ''});
        this.refs.input.value = "";

        this.showMessage(message, true);
        this.context.user.socket.emit("message", message);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleSubmit(e);
        }
    }

    handleChange(event) {
        this.setState({text: event.target.value});
    }

    addUsers(evt) {
        let to = [];
        if (this.state.initAsGroup) {
            //all of the users is already in toWhoInfo <= hack, not worthy of time == school project
            to = this.state.toWhoInfo.id
        } else {
            to = [this.state.toWhoInfo.id];
            to = to.concat(this.state.groupIDs);
        }
        this.props.addUsers(
            true,
            null,
            {id: this.state.id, to: to, x: evt.clientX, y: evt.clientY}
        );
    }

    closeWindow() {
        let data = {
            id: this.state.id, //window ID
            withUser: this.state.toWhoInfo.id //id of a user I chat with, excludes group conversations
        };
        this.props.close(data);
    }

    render() {
        return (
            <div className=" chat-window " style={{marginLeft: "10px"}}>
                <div className="panel panel-default">
                    <div className="panel-heading top-bar">
                        <div className="col-md-9 col-xs-9">
                            <h3 className="panel-title">
                                <div>
                                    <img alt="Add"
                                         id="chat-window"
                                         src={require("../../public/img/chat-window.png")}/>
                                </div>
                                {this.state.groupIDs.length === 0 ? this.state.toWhoInfo.username : "Group conversation"}
                            </h3>
                        </div>
                        <div className="col-md-3 col-xs-3" style={{textAlign: "right"}}>

                            <div onClick={this.addUsers.bind(this)}>
                                <img alt="Add"
                                     id="addUser-btn"
                                     className="hover-img addUser-btn"
                                     src={require("../../public/img/addUser.png")}/>
                            </div>

                            <div onClick={this.closeWindow.bind(this)}>
                                <img alt="Cancel"
                                     id="cancel-btn"
                                     className="hover-img"
                                     src={require("../../public/img/cancel.png")}/>
                            </div>
                        </div>
                    </div>

                    <div className="panel-body msg_container_base" id={this.state.id}>
                        {this.state.messages}
                    </div>

                    <div className="panel-footer">
                        <div className="input-group">
                            <input id="btn-input"
                                   type="text"
                                   ref="input"
                                   className="form-control input-sm chat_input"
                                   placeholder="Write your message here..."
                                   onKeyPress={this.handleKeyPress.bind(this)}
                                   onChange={this.handleChange.bind(this)}/>
                            <span className="input-group-btn">

                            <div onClick={this.handleSubmit.bind(this)}>
                                <img className="hover-img send-btn"
                                     alt="Send"
                                     src={require("../../public/img/send-message.png")}/>
                            </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
