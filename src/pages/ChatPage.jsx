import React from 'react';
import ChatWindow from '../components/ChatWindow.jsx';
import LeftToolBar from '../components/LeftToolBar.jsx';
import RightToolBar from '../components/RightToolBar.jsx';
import Header from '../components/Header.jsx';


export default class ChatPage extends React.Component {

    static contextTypes = {
        user: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            windowNumber: 0,
            chatWindows: []
        };
    }

    componentDidMount() {
        this.context.user.socket.on('message', (msg)=>{
            console.log("message received");
            console.log(msg);
            
        });
    }

    openNewChatWindow(data) {
        console.log("opening");
        console.log(data);

        let temp = this.state.chatWindows.slice();
        temp.push(<ChatWindow key={this.state.windowNumber}
                              id={Math.random().toString()}  //generate unique hash to address chat windows
                              to={data}  // name and id of user message is for
                              close={this.closeChatWindow.bind(this)}/>);
        this.setState({windowNumber: this.state.windowNumber + 1, chatWindows: temp});
        console.log(temp[0].props.id);
    }

    closeChatWindow(id) {
        console.log("closing");
        console.log(id);
        for(let window of this.state.chatWindows) {
           if(window.props.id === id) {
               console.log("found");
               let temp = this.state.chatWindows.slice();
               let index = temp.indexOf(window);
               temp.splice(index, 1);
               this.setState({chatWindows: temp});
               break;
           }
        }
        //this.state.chatWindows.splice(data, 1);
    }

    render() {

        return (
            <div className="wrapper">
                <Header/>
                <div className="main">
                    <LeftToolBar />
                    <RightToolBar chat={this.openNewChatWindow.bind(this)}/>

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


