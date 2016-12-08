import React, {PropTypes} from 'react';
import {Input} from 'react-bootstrap';
import moment from 'moment';
import io from 'socket.io-client';

let socket = io();


export default class MessageField extends React.Component {
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
            this.setState({ text: '', typing: false });
        }
    }

    handleChange(event) {
        this.setState({ text: event.target.value });
    }

    render() {
        return (
            <div style={{
                zIndex: '52',
                left: '21.1rem',
                right: '1rem',
                width: '100%',
                marginBottom: '0.5em'
                }}>
                <input
                    style={{
                        height: '100%',
                        fontSize: '2em'
                    }}
                    value={this.state.text}
                    onChange={this.handleChange.bind(this)}
                    onKeyDown={this.handleSubmit.bind(this)}
                    type="text"
                    name="message"
                    ref="messageField"
                    autoFocus="true"
                    placeholder="Start typing!"
                  />
            </div>
        );
    }
}

/* Commented out for now
MessageField.propTypes = {
    channel: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired
};
*/