import React from 'react';
import ReactDOM from 'react-dom';
import TweenMax from 'gsap';


class Form extends React.Component {

    componentWillEnter(callback) {
        const el = ReactDOM.findDOMNode(this);
        TweenMax.fromTo(el, 0.5, {y: 0, opacity: 0}, {y: 100, opacity: 1, onComplete: callback});
    }

    componentWillLeave(callback) {
        const el = ReactDOM.findDOMNode(this);
        TweenMax.fromTo(el, 0.5, {y: 100, opacity: 1}, {y: 0, opacity: 0, onComplete: callback});
    }
}

export default Form;