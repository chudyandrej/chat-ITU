import React from 'react';


export default class Message extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sendReceived: this.props.sent ? "sent" : "receive",
            text: ""
        }
    }

    componentWillMount() {
        //find and replace code of smiley for emoji html
        let smileys = {
            ':)': <i className="em em-yum"></i>,
            ':-)': <i className="em em-yum"></i>,
            ';)': <i className="em em-wink"></i>,
            ';-)': <i className="em em-wink"></i>,
            ':D': <i className="em em-laughing"></i>,
            ':-D': <i className="em em-laughing"></i>,
            'lol': <i className="em em-joy"></i>,
            ':(' : <i className="em em-disappointed"></i>,
            ':-(': <i className="em em-disappointed"></i>,
            ':\'(': <i className="em em-cry"></i>,
            ':/' : <i className="em em-confused"></i>,
            '(y)': <i className="em em---1"></i>,
            ':o': <i className="em em-dizzy_face"></i>,
            ':P': <i className="em em-stuck_out_tongue"></i>,
            ':*': <i className="em em-kissing_heart"></i>,
        };
        let text = "";

    }

    render() {
        //just developer's photos :D
        let imgURL = "https://chat-itu.herokuapp.com/" + this.props.userID;

        let avatar = (
            <div className="col-md-2 col-xs-2 avatar">
                <img src={parseInt(this.props.userID) < 4 ? imgURL :  require("../../public/img/avatar.jpg")}
                     className="img-responsive"/>
            </div>
        );

        return (
            <div className={"row msg_container base_" + this.state.sendReceived}>
                {this.props.sent ? null : avatar}
                <div className="col-md-10 col-xs-10">
                    <div className={"messages msg_" + this.state.sendReceived}>
                        <p>{this.props.text}</p>
                        <time>{this.state.time}</time>
                    </div>
                </div>
                {this.props.sent ? avatar : null}
            </div>
        );
    }
}
