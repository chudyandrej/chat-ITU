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
        if (this.context.user.socket === null) { return; } //user did refresh the page => socket is null
        this.context.user.socket.on('getUsers', (response) => {
            let temp = [];
            console.log(response);

            for (let user of response) {

                if (this.context.user.id == user.id) {
                    //if it's my id, ignore, I don't wanna be shown in online users list :D
                    continue;
                }
                console.log(user);
                temp.push(<OnlineUser key={user.id}
                                      id={user.id}
                                      username={user.name}
                                      add={this.addUser.bind(this)}/>);
            }

            this.setState({users: temp});
            console.log(temp);
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
            backgroundColor: '#00897B',
            color: '#ffffff',
            width: '400px',
            height: '200px',
            marginTop: '-300px',
            marginLeft: '-35%',
        };

        return (
            <div>
                <SkyLight
                    afterClose={this.close.bind(this)}
                    dialogStyles={myBigGreenDialog}
                    ref="dialogWithCallBacks"
                    title="Add a user">
                    <div className="list-group modal-users">
                        {this.state.users}
                    </div>
                    <button type='button'
                            className='btn btn-primary'
                            onClick={this.submitUsers.bind(this)}>
                        Submit
                    </button>
                </SkyLight>
            </div>
        );
    }
}