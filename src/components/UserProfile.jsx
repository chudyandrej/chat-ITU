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

    close() {
        this.props.close();
    }

    render() {

        let imgURL = "https://chat-itu.herokuapp.com/" + this.context.user.id;

        return (
            <div>
                <SkyLight
                    hideOnOverlayClicked
                    afterClose={this.close.bind(this)}
                    ref="dialogWithCallBacks"
                    title="User Profile">
                    <div>
                        <h1>{this.context.user.userName}</h1>
                    </div>
                    <img className="img"
                         src={parseInt(this.context.user.id) ? imgURL : require("../../public/img/person-flat.png")}/>
                </SkyLight>
            </div>
        );
    }
}