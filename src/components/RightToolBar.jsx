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
        this.context.user.socket.on('getUsers', (response)=>{
            let temp = [];
            console.log(response);

            for(let user of response) {

                if (this.context.user.id == user.id) {
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
                {this.state.users}
            </div>
        </div>

        );
    }
}