import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';


import LoginPage from './pages/loginPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import Layout from './pages/Layout.jsx'

render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={ChatPage}/>
            <Route path="/chat" component={ChatPage}/>
        </Route>
    </Router>,
    document.getElementById('app')
);
