import OnlineUser from './OnlineUser.jsx';
import React from 'react';
import SkyLight from 'react-skylight';


export default class AddUsersGroupMsg extends React.Component {

    static contextTypes = {
        user: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            users: [],
            usersToAdd: []
        }
    }

    componentWillMount() {
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
                                      add={this.addUser.bind(this)}/>);
            }

            this.setState({users: temp});

        });
    }

    componentDidMount() {
        this.refs.dialogWithCallBacks.show();

        //emit server to get online users
        this.context.user.socket.emit('getUsers', {});
    }

    close() {
        this.props.addUser(false);
    }

    addUser(data) {
        //makes list of users who will be added to a conversation
        let userIDs = [];
        let removeUserFlag = false;

        for (let userID of this.state.usersToAdd) {
            if (userID === data.id) {
                removeUserFlag = true;
            }
            else {
                userIDs.push(userID)
            }
        }
        if (!removeUserFlag) {
            userIDs.push(data.id);
        }
        this.setState({usersToAdd: userIDs});
    }

    submitUsers() {
        this.props.addUser(false, this.state.usersToAdd);
    }


    render() {
        let myBigGreenDialog = {
            backgroundColor: '#708cd8',
            color: '#fffff',
            width: '335px',
            height: '380x',
            top: 0,
            left: 0,
            marginTop: (this.props.windowInfo.y - 20) + 'px',
            marginLeft: (this.props.windowInfo.x - 215) + 'px'
        };

        return (
            <div>
                <SkyLight
                    hideOnOverlayClicked
                    afterClose={this.close.bind(this)}
                    dialogStyles={myBigGreenDialog}
                    ref="dialogWithCallBacks">

                    <div className="panel-body add_users_panel">
                        <div className="list-group modal-users">
                            {this.state.users}
                        </div>
                    </div>

                    <div onClick={this.submitUsers.bind(this)}>
                        <img className="hover-img send-btn"
                             alt="Submit"
                             src={require("../../public/img/checked.png")}/>
                    </div>
                </SkyLight>
            </div>
        );
    }
}