import React from 'react';

export default class Message extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sentClass: "base_sent",
            receiveClass: "base_receive"
        }
    }

    render() {

        return (
            <div className={"row msg_container " + this.state.sentClass}>
                <div className="col-md-10 col-xs-10">
                    <div className="messages msg_sent">
                        <p>that mongodb thing looks good, huh?
                            tiny master db, and huge document store</p>
                        <time dateTime="2009-11-13T20:00">Timothy • 51 min</time>
                    </div>
                </div>
                <div className="col-md-2 col-xs-2 avatar">
                    <img
                        src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg"
                        className=" img-responsive "/>
                </div>
            </div>
        );
    }
}
