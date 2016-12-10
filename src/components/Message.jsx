import React from 'react';


export default class Message extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sendReceived: this.props.sent ? "sent" : "receive"
        }
    }

    render() {

        let avatar = (
            <div className="col-md-2 col-xs-2 avatar">
                <img src={require("../../public/img/avatar.jpg")}
                     className="img-responsive"/>
            </div>
        );

        return (
            <div className={"row msg_container base_" + this.state.sendReceived}>
                {this.props.sent ? null : avatar}
                <div className="col-md-10 col-xs-10">
                    <div className={"messages msg_" + this.state.sendReceived}>
                        <p>{this.props.text}</p>
                        <time>{this.props.time}</time>
                    </div>
                </div>
                {this.props.sent ? avatar : null}
            </div>
        );
    }
}
