import React from 'react';
import moment from 'moment';
import io from 'socket.io-client';

import Message from './Message.jsx';


export default class ChatWindow extends React.Component {

    static contextTypes = {
        user: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            text: '',
            typing: false, //??
            id: this.props.id,  //identificator of window
            toWhoInfo: this.props.to,
            messages: []
        };
    }

    componentDidMount() {
        //put cursor to input box
        this.refs.input.focus();
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.text === "") {
            return;
        }

        let message = {
            to: [this.state.toWhoInfo.id], //TODO add multiple IDs of multiple people
            from: this.context.user.username,
            hash: this.state.id,
            text: this.state.text,
            time: moment.utc().format('LLL')
        };
        //socket.emit('new message', message);
        console.log("message:");
        console.log(this.state.text);
        console.log(message);
        this.setState({text: ''});
        this.refs.input.value = "";

        let temp = this.state.messages.slice();
        temp.push(
            <Message key={this.state.messages.length}
                     sent={true}
                     text={message.text}
                     time={message.time}/>
        );
        this.setState({messages: temp});

        this.context.user.socket.emit("message", message);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleSubmit(e);
        }
    }

    handleChange(event) {
        this.setState({text: event.target.value});
        //TODO timeout for typing = true ? will we even use typing var?
    }

    closeWindow() {
        this.props.close(this.state.id);
    }

    render() {
        return (
            <div className=" chat-window " style={{marginLeft: "10px"}}>
                <div className="panel panel-default">
                    <div className="panel-heading top-bar">
                        <div className="col-md-8 col-xs-8">
                            <h3 className="panel-title">
                                <span className="glyphicon glyphicon-comment"></span>
                                Chat - {this.state.toWhoInfo.username}
                            </h3>
                        </div>
                        <div className="col-md-4 col-xs-4" style={{textAlign: "right"}}>
                            <span style={{cursor: "pointer"}}
                                  id="minim_chat_window"
                                  className="glyphicon glyphicon-minus icon_minim"/>

                            <span style={{cursor: "pointer"}}
                                  onClick={this.closeWindow.bind(this)}
                                  className="glyphicon glyphicon-remove icon_close"
                                  id="chat_window_1"/>
                        </div>
                    </div>
                    <div className="panel-body msg_container_base">
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
                                <button className="btn btn-primary btn-sm"
                                        id="btn-chat"
                                        onClick={this.handleSubmit.bind(this)}>Send</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
