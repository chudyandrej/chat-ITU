import React from 'react';


export default class LeftToolBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="side">
                <div>
                    <img id="profilPhoto" className="img-circle" alt="Logo lifeChat"
                         src={require("../../public/img/images.jpeg")}/>
                </div>
                <div>
                    <img id="settings" alt="Settings" src={require("../../public/img/settings.png")}/>
                </div>
                <div>
                    <img id="contacts" alt="Add" src={require("../../public/img/contacts.png")}/>
                </div>
                <div>
                    <img id="lock-unlock" alt="Add" src={require("../../public/img/lock.png")}/>
                </div>
                <div>
                    <img id="add" alt="Add" src={require("../../public/img/add.png")}/>
                </div>
                <div>
                    <img id="pen" alt="Add" src={require("../../public/img/pen.png")}/>
                </div>
            </div>
        );
    }
}