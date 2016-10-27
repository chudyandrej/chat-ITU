import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import Layout from './pages/Layout.jsx'
import PreLoginLayout from './pages/PreLoginLayout.jsx';
import LoginPage from './pages/LoginPage.jsx'
import ChatPage from './pages/ChatPage.jsx';


ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={PreLoginLayout}>
            <IndexRoute component={LoginPage} />
            <Route path="/chat" component={Layout}>
                <IndexRoute component={ChatPage} />
            </Route>
        </Route>
    </Router>,
    document.getElementById('app')
);
