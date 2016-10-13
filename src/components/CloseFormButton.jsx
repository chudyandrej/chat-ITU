import React from 'react';

var CloseFormButton = React.createClass({
    render(){
        return (
            <div id="exitBtnContainer">
                <button id="exitBtn" onClick={ this.props.close }>X</button>
            </div>
        )
    }
});

export default CloseFormButton;