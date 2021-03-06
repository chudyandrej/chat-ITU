import React from 'react';
import ReactEmoji from 'react-emoji';


export default class Message extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sendReceived: this.props.sent ? "sent" : "receive",
            text: ""
        }
    }

    render() {
        //just developer's photos :D
        //TODO on 46 line should be "< 4", but for school presentation it was removed
        let imgURL = "https://chat-itu.herokuapp.com/" + this.props.userID;

        let avatar = (
            <div className="col-md-2 col-xs-2 avatar">
                <img src={parseInt(this.props.userID) ? imgURL :  require("../../public/img/avatar.jpg")}
                     className="img-responsive"/>
            </div>
        );

        return (
            <div className={"row msg_container base_" + this.state.sendReceived}>
                {this.props.sent ? null : avatar}
                <div className="col-md-10 col-xs-10">
                    <div className={"messages msg_" + this.state.sendReceived}>
                        <p>{ ReactEmoji.emojify(this.props.text) }</p>
                        <time>{this.props.time}</time>
                    </div>
                </div>
                {this.props.sent ? avatar : null}
            </div>
        );
    }
}
