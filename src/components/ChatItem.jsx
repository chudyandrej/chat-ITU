import React, {Component, PropTypes} from 'react';

export default class ChatItem extends Component {
    handleClick(user) {
        this.props.handleClickOnUser(user);
    }
    render() {
        const message = this.props;
        return (
            <li>
                <span>
                  <b style={{color: '3366ff'}}>{message.username}</b><i style={{color: '#A0A0A0'}}>{message.time}</i>
                </span>
                <div style={{clear: 'both', paddingTop: '0.1em', marginTop: '-1px', paddingBottom: '0.3em'}}>{message.text}</div>
            </li>
        );
    }
}

ChatItem.propTypes = {
    message: PropTypes.object.isRequired
};
