import React from 'react';
import AddUsersGroupMsg from '../components/AddUsersGroupMsg.jsx';
import ChatWindow from '../components/ChatWindow.jsx';
import Header from '../components/Header.jsx';
import LeftToolBar from '../components/LeftToolBar.jsx';
import RightToolBar from '../components/RightToolBar.jsx';


export default class ChatPage extends React.Component {

    static contextTypes = {
        user: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            windowNumber: 0,
            addUsers: false,
            chatWindows: [],
            //IDs of users, I have opened chat window with
            //group messages are not taken into account
            usersChattingWith: []
        };
    }

    componentDidMount() {
        //listener on new messages
        this.context.user.socket.on('message', (msg) => {
            console.log("message received chat page");
            console.log(msg);

            let found = false;
            for (let window of this.state.chatWindows) {
                if (window.props.id == msg.id) {
                    //if window is already opened, ignore the message,
                    //it will be handled by chat window itself
                    found = true;
                }
            }
            if (!found) { //if window is not opened, open one
                let data = {
                    id: msg.from.id,  //TODO add support of multiple IDs (invitation to group conversation)
                    username: msg.from.username
                };
                this.openNewChatWindow(data, msg);
            }
        });
    }

    addUsersGroupMsg(show) {
        this.setState({addUsers: show});

    }

    openNewChatWindow(data, msg = null) {
        console.log("opening");
        console.log(data);

        if (this.state.usersChattingWith.indexOf(data.id) !== -1) {
            //windows with the user is already opened => ignore request
            return;
        }

        let temp = this.state.chatWindows.slice();
        temp.push(<ChatWindow key={this.state.windowNumber}
            //generate unique hash to address chat windows
                              id={msg === null ? Math.random().toString() : msg.id}
                              to={data}  // name and id of user message is for
                              msg={msg === null ? null : msg}
                              addUsers={this.addUsersGroupMsg.bind(this)}
                              close={this.closeChatWindow.bind(this)}/>);

        //save id of user I've opened a window to chat with him
        let users = this.state.usersChattingWith.slice();
        users.push(data.id);

        this.setState({
            windowNumber: this.state.windowNumber + 1,
            chatWindows: temp,
            usersChattingWith: users
        });
    }

    closeChatWindow(data) {
        console.log("closing");
        console.log(data.id);

        //save id of user I've opened a window to chat with him
        let users = this.state.usersChattingWith.slice();
        users.splice(users.indexOf(data.withUser), 1);

        //close the window
        let temp = this.state.chatWindows.slice();
        temp.splice(temp.indexOf(window), 1);
        this.setState({chatWindows: temp, usersChattingWith: users});

        /*for (let window of this.state.chatWindows) {
            if (window.props.id === data.id) {
                console.log("found");

                break;
            }
        }*/
    }

    render() {

        return (
            <div className="wrapper">
                <Header/>
                <div className="main">
                    <LeftToolBar />
                    <RightToolBar chat={this.openNewChatWindow.bind(this)}/>
                    {this.state.addUsers ? <AddUsersGroupMsg close={this.addUsersGroupMsg.bind(this)}/> : null}
                    <div className="body container-fluid">
                        <div className="row" id="mainContentWrap">
                            <div className="container-fluid">
                                {this.state.chatWindows}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};


