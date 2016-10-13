import React,{Component, PropTypes} from 'react';
import MessageField from '../components/MessageField.jsx';
import ChatItem from '../components/ChatItem.jsx';
import {DropdownButton, MenuItem, Button, Navbar, NavDropdown, Nav, NavItem} from 'react-bootstrap';

export default class ChatPage extends Component {

    render() {
        return (
            <div style={{margin: '0', padding: '0', height: '100%', width: '100%'}}>
                <div className="mainChatPage">
                    <header style={{background: '#FFFFFF', color: 'black', flexGrow: '0', order: '0', fontSize: '2.3em', paddingLeft: '0.2em'}}>
                        <div>
                            <h1>Chanel name</h1>
                        </div>
                    </header>
                    <ul style={{wordWrap: 'break-word', margin: '0', overflowY: 'auto', padding: '0', paddingBottom: '1em', flexGrow: '1', order: '1'}} ref="messagesList">
                        <ChatItem/>
                    </ul>
                    <MessageField/>
                </div>

            </div>
        )
    }
};


