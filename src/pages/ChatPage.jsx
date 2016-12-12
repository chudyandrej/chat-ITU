import React from 'react';
import AddUsersGroupMsg from '../components/AddUsersGroupMsg.jsx';
import ChatWindow from '../components/ChatWindow.jsx';
import Header from '../components/Header.jsx';
import LeftToolBar from '../components/LeftToolBar.jsx';
import RightToolBar from '../components/RightToolBar.jsx';
import moment from 'moment';


export default class ChatPage extends React.Component {

    static contextTypes = {
        user: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            windowNumber: 0,
            addUsers: false,
            windowInfo: null,
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

            if (msg.to.length === 1) {
                console.log("single conversation");
                //non group conversation
                //if window is already opened, ignore the message,
                //it will be handled by chat window itself
                if (this.state.usersChattingWith.indexOf(String(msg.from.id)) === -1) {
                    console.log("not found user");
                    let data = {
                        id: msg.from.id,
                        username: msg.from.username
                    };
                    this.openNewChatWindow(data, msg);
                }
            }
            else {  //group conversation
                let found = false;
                for (let window of this.state.chatWindows) {
                    if (window.props.id == msg.id) {
                        console.log("found group conversation");
                        found = true;
                    }
                }
                if (!found) { //if window is not opened, open one
                    console.log("opening new group conversation");
                    console.log(msg.to);

                    //hack, exclude my ID, and add sender ID  << school project, no time on details ...
                    let allIDs = [];
                    for(let id of msg.to) {
                        if (id != this.context.user.id) {
                            allIDs.push(id)
                        }
                    }
                    allIDs.push(msg.from.id);

                    let data = {
                        id: allIDs,    //it's array
                        username: "Group conversation"
                    };
                    this.openNewChatWindow(data, msg);
                }
            }
        });
    }

    addUsersGroupMsg(show, data=null, windowInfo=null) {
        this.setState({addUsers: show, windowInfo: windowInfo});

        if (data != null) {
            console.log("data, IDs of users");
            console.log(data);

            let to = this.state.windowInfo.to.slice();
            to.push(this.context.user.id);
            let message = {
                serviceMsg: true,
                myID: this.context.user.id,
                to: to,
                from: {id: this.context.user.id, username: this.context.user.username},
                id: this.state.windowInfo.id,
                text: data,
                time: moment.utc().format('LLL')
            };

            this.context.user.socket.emit("message", message);
            console.log("message sent");
            this.setState({addUsers: false, windowInfo: null});
        }
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
                              to={data}  // name and id of user message is for /
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

        //remove id of user I've been chatting with
        let users = this.state.usersChattingWith.slice();
        users.splice(users.indexOf(data.withUser), 1);

        //close the window
        let temp = this.state.chatWindows.slice();
        for(let window of this.state.chatWindows) {
            if(window.props.id === data.id) {
                temp.splice(temp.indexOf(window), 1);
                break;
            }
        }

        this.setState({chatWindows: temp, usersChattingWith: users});
    }

    render() {

        return (
            <div className="wrapper">
                <Header/>
                <div className="main">
                    <LeftToolBar />
                    <RightToolBar chat={this.openNewChatWindow.bind(this)}/>
                    {this.state.addUsers ? <AddUsersGroupMsg addUser={this.addUsersGroupMsg.bind(this)} windowInfo={this.state.windowInfo}/> : null}
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


