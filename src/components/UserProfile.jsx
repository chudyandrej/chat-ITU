import OnlineUser from './OnlineUser.jsx';
import React from 'react';
import SkyLight from 'react-skylight';


export default class UserProfile extends React.Component {

    static contextTypes = {
        user: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.refs.dialogWithCallBacks.show();
    }

    render() {

        let imgURL = "https://chat-itu.herokuapp.com/" + this.state.id;

        return (
            <div>
                <SkyLight
                    hideOnOverlayClicked ref="simpleDialog"
                    title="User Profile">
                    <div>
                        <h1>{this.context.user.username}</h1>
                    </div>
                    <img className="img" src={parseInt(this.context.user.id) < 4 ? imgURL : require("../../public/img/person-flat.png")}/>
                </SkyLight>
            </div>
        );
    }
}