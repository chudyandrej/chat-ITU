import React,{PropTypes} from 'react';
import ChatWindow from '../components/ChatWindow.jsx';
import LeftToolBar from '../components/LeftToolBar.jsx';
import RightToolBar from '../components/RightToolBar.jsx';
import Header from '../components/Header.jsx';


export default class ChatPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chatWindows: []
        }
    }

    openNewChatWindow(data) {
        console.log("opening");
        console.log(data);
        let id = this.state.chatWindows.length;

        let temp = this.state.chatWindows.slice();
        temp.push(<ChatWindow key={id} id={id} close={this.closeChatWindow.bind(this)}/>);
        this.setState({chatWindows: temp});
    }

    closeChatWindow(data) {
        console.log("closing");
        console.log(data);
        //console.log(data);
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


