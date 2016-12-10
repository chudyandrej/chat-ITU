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
        this.context.user.socket.on('getUsers', this._getUsers);
    }

    componentDidMount() {
        console.log(this.context.user.socket);
        this.context.user.socket.emit('getUsers', {});
        this._getUsers();
    }

    _getUsers(response) {
        let temp = [];

        for(let i=0; i < 5; i++) {
            temp.push(<OnlineUser key={i} id={i} username="Andrej Chudy"/>);
        }

        this.setState({users: temp});
    }

    openNewChatWindow(data) {
        this.props.chat(data);
    }

    render() {

        return (
        <div className="rightSide">
            <div id="sidebar-wrapper" className="list-group">
                {this.state.users}
            </div>
        </div>

        );
    }
}