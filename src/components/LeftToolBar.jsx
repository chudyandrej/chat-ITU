import React from 'react';


export default class LeftToolBar extends React.Component {

    static contextTypes = {
        user: React.PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    render() {
        //just developer's photos :D
        let imgURL = "https://chat-itu.herokuapp.com/" + this.context.user.id;

        return (
            <div className="side">
                <div>
                    <img id="profilPhoto" className="img-circle" alt="profilPhoto"
                         src={parseInt(this.context.user.id) < 4 ? imgURL : require("../../public/img/avatar.jpg")}/>
                </div>
                <div>
                    <img id="settings" alt="Settings" src={require("../../public/img/settings.png")}/>
                </div>
                <div>
                    <img id="lock-unlock" alt="Add" src={require("../../public/img/lock.png")}/>
                </div>
                <div>
                    <img id="pen" alt="Pen" src={require("../../public/img/pen.png")}/>
                </div>
            </div>
        );
    }
}