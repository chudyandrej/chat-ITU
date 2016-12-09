import React,{PropTypes} from 'react';
import ChatWindow from '../components/ChatWindow.jsx';
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


        return (
            <div className="wrapper">
                <Header/>
                <div className="main">
                    <LeftToolBar />
                    <RightToolBar chat={this.clickHandler.bind(this)}/>

                    <div className="body container-fluid">
                        <div className="row" id="mainContentWrap">
                            <div className="container-fluid">
                                <ChatWindow />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};


