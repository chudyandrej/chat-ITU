import React from 'react';
import ImageLoader from 'react-imageloader';


export default class RightToolBar extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div id="sidebar-wrapper" className="list-group ">
                <button type="button" className="btn btn-default" style={{ariaLabel: "Left Align"}}>
                    <span className="glyphicon glyphicon-chevron-right" style={{ariaHidden:"true"}}></span>
                </button>
                <button type="button" className="list-group-item sidebar-brand" onClick={this.props.chat}>
                    <div className="item-image">
                        <ImageLoader src={require("../../public/img/person-flat.png")}/>
                    </div>
                    <div className="item-name">
                        <span>Andrej Chudy</span>
                    </div>
                    <div className="item-status">
                        <span></span>
                    </div>
                </button>

                <button type="button" className="list-group-item sidebar-brand">
                    <div className="item-image">
                        <ImageLoader src={require("../../public/img/person-flat.png")}/>
                    </div>
                    <div className="item-name">
                        <span>Andrej Chudy</span>
                    </div>
                    <div className="item-status">
                        <span></span>
                    </div>
                </button>

                <button type="button" className="list-group-item sidebar-brand">
                    <div className="item-image">
                        <ImageLoader src={require("../../public/img/person-flat.png")}/>
                    </div>
                    <div className="item-name">
                        <span>Andrej Chudy</span>
                    </div>
                    <div className="item-status">
                        <span></span>
                    </div>
                </button>
            </div>
        );
    }
}