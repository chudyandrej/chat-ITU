import React,{PropTypes} from 'react';
import MessageField from '../components/MessageField.jsx';
//import ChatItem from '../components/ChatItem.jsx';
//import {DropdownButton, MenuItem, Button, Navbar, NavDropdown, Nav, NavItem} from 'react-bootstrap';
import LeftToolBar from '../components/LeftToolBar.jsx';
import RightToolBar from '../components/RightToolBar.jsx';
import Header from '../components/Header.jsx';


export default class ChatPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            test: false
        }
    }

    clickHandler() {
       this.setState({test: true});
    }

    render() {
        let messageStyle = {wordWrap: 'break-word', margin: '0', overflowY: 'auto',
                            padding: '0', paddingBottom: '1em', flexGrow: '1', order: '1'};

        /*let headerStyle = {background: '#FFFFFF', color: 'black', flexGrow: '0',
                           order: '0', fontSize: '2.3em', paddingLeft: '0.2em'};

        let old = (
            <div style={{margin: '0', padding: '0', height: '100%', width: '100%'}}>
                <div className="mainChatPage">
                    <header style={headerStyle}>
                        <div>
                            <h1>Chanel name</h1>
                        </div>
                    </header>
                    <ul style={messageStyle} ref="messagesList">
                        <ChatItem/>
                    </ul>
                    <MessageField />
                </div>
            </div>
        );
        */

        let chat = (
            <div>
                <ul style={messageStyle} ref="messagesList">

                </ul>
                <MessageField />
            </div>
        );

        return (
            <div>
                <div className="left">
                    <LeftToolBar />
                </div>

                <Header/>

                <div className="center">
                    <h1>CHAT PAGE</h1>
                    {this.state.test ? chat : null}
                </div>

                <div className="right">
                    <RightToolBar chat={this.clickHandler.bind(this)}/>
                </div>
            </div>
        )
    }
};


