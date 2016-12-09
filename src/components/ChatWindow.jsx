import React, {PropTypes} from 'react';
import {Input} from 'react-bootstrap';
import moment from 'moment';
import io from 'socket.io-client';

import Message from './Message.jsx';

let socket = io();


export default class ChatWindow extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            text: '',
            typing: false
        };
    }

    handleSubmit(event) {
        const text = event.target.value.trim();
        if (event.which === 13) {   //Enter
            event.preventDefault();
            let message = {
                username: null, //TODO
                channel: null,
                text: text,
                time: moment.utc().format('LLL')
            };
            //socket.emit('new message', message);
            console.log("message:");
            console.log(this.state.text);
            console.log(message);
            this.setState({text: '', typing: false});
        }
    }

    handleChange(event) {
        this.setState({text: event.target.value});
    }

    render() {
        return (
            <div className=" chat-window " style={{marginLeft: "10px"}}>
                <div className="panel panel-default">
                    <div className="panel-heading top-bar">
                        <div className="col-md-8 col-xs-8">
                            <h3 className="panel-title">
                                <span className="glyphicon glyphicon-comment"></span>
                                Chat - Miguel
                            </h3>
                        </div>
                        <div className="col-md-4 col-xs-4" style={{textAlign: "right"}}>
                            <a href="#">
                                <span id="minim_chat_window" className="glyphicon glyphicon-minus icon_minim"></span>
                            </a>
                            <a href="#">
                                <span className="glyphicon glyphicon-remove icon_close" data-id="chat_window_1"></span>
                            </a>
                        </div>
                    </div>
                    <div className="panel-body msg_container_base">
                        <Message />
                    </div>

                    <div className="panel-footer">
                        <div className="input-group">
                            <input id="btn-input"
                                   type="text"
                                   className="form-control input-sm chat_input"
                                   placeholder="Write your message here..." />
                            <span className="input-group-btn">
                                <button className="btn btn-primary btn-sm" id="btn-chat">Send</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
