import React from 'react';
import OnlineUser from './OnlineUser.jsx';


export default class RightToolBar extends React.Component {

    static contextTypes = {
        user: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            users: []
        }
    }

    componentWillMount() {
        //create listener
        if (this.context.user.socket === null) {
            //user did refresh the page => socket is null
            return;
        }
        this.context.user.socket.on('getUsers', (response) => {
            let temp = [];

            for (let user of response) {

                if (this.context.user.id == user.id) {
                    //if it's my id, ignore, I don't wanna be shown in online users list :D
                    continue;
                }
                temp.push(<OnlineUser key={user.id}
                                      id={user.id}
                                      username={user.name}
                                      chat={this.openNewChatWindow.bind(this)}/>);
            }

            this.setState({users: temp});
        });
    }

    componentDidMount() {
        this.context.user.socket.emit('getUsers', {});
    }

    openNewChatWindow(data) {
        this.props.chat(data);
    }

    render() {

        return (
            <div className="rightSide">
                <div id="sidebar-wrapper" className="list-group">
                    <div>
                        <img id="transmitter" alt="Transmitter" src={require("../../public/img/transmitter.png")}/>
                    </div>
                    {this.state.users}
                </div>
            </div>
        );
    }
}